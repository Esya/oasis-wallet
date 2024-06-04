import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, delay, fork, join, put, select, take, takeLatest } from 'typed-redux-saga'
import { WalletError, WalletErrors } from 'types/errors'

import { accountActions } from '.'
import { getExplorerAPIs, getOasisNic } from '../network/saga'
import { takeLatestCancelable } from '../takeLatestCancelable'
import { stakingActions } from '../staking'
import { fetchAccount as stakingFetchAccount } from '../staking/saga'
import { refreshAccount as walletRefreshAccount } from '../wallet/saga'
import { transactionActions } from '../transaction'
import { selectAddress } from '../wallet/selectors'
import { selectAccountAddress, selectAccount } from './selectors'
import { getAccountBalanceWithFallback } from '../../lib/getAccountBalanceWithFallback'
import { walletActions } from '../wallet'
import { selectSelectedNetwork } from '../network/selectors'
import { OasisTransaction } from '../../lib/transaction'
import { getSigner } from '../transaction/saga'
import { Signer } from '@oasisprotocol/client/dist/signature'

const ACCOUNT_REFETCHING_INTERVAL = process.env.REACT_APP_E2E_TEST ? 5 * 1000 : 30 * 1000
const TRANSACTIONS_LIMIT = 20

export function* fetchAccount(action: PayloadAction<string>) {
  const address = action.payload

  yield* put(accountActions.setLoading(true))
  const { getTransactionsList } = yield* call(getExplorerAPIs)

  yield* all([
    join(
      yield* fork(function* () {
        try {
          const account = yield* call(getAccountBalanceWithFallback, address)
          yield* put(accountActions.accountLoaded(account))
          yield* put(walletActions.updateBalance({ address: account.address, balance: account }))
        } catch (apiError: any) {
          if (apiError instanceof WalletError) {
            yield* put(accountActions.accountError({ code: apiError.type, message: apiError.message }))
          } else {
            yield* put(
              accountActions.accountError({
                code: WalletErrors.UnknownError,
                message: apiError.message,
              }),
            )
          }
        }
      }),
    ),
    join(
      yield* fork(function* () {
        try {
          const { transactions, total } = yield* call(getTransactionsList, {
            accountId: address,
            limit: TRANSACTIONS_LIMIT,
          })
          const networkType = yield* select(selectSelectedNetwork)
          yield* put(accountActions.transactionsLoaded({ networkType, transactions, total }))
        } catch (e: any) {
          console.error('get transactions list failed, continuing without updated list.', e)
          if (e instanceof WalletError) {
            yield* put(accountActions.transactionsError({ code: e.type, message: e.message }))
          } else {
            yield* put(
              accountActions.transactionsError({ code: WalletErrors.UnknownError, message: e.message }),
            )
          }
        }
      }),
    ),
    join(
      yield* fork(function* () {
        try {
          const nic = yield* call(getOasisNic)
          const signer = yield* getSigner()
          const nonce = yield* call(OasisTransaction.getNonce, nic, signer as Signer)

          yield* put(accountActions.setNonce(nonce.toString()))
        } catch (e: any) {
          console.error('setNonce', e)
          // Silently fail
          yield* put(accountActions.setNonce('0'))
        }
      }),
    ),
  ])

  yield* put(accountActions.setLoading(false))
}

/**
 * When a transaction is done, and it is related to the account we currently have in state
 * refresh the data.
 */
export function* refreshAccountOnTransaction() {
  while (true) {
    const { payload } = yield* take(transactionActions.transactionSent)
    const otherAddress = payload.type === 'transfer' ? payload.to : payload.validator
    yield* call(refreshAccount, otherAddress)
  }
}

export function* refreshAccountOnParaTimeTransaction() {
  while (true) {
    const { payload } = yield* take(transactionActions.paraTimeTransactionSent)

    yield* call(refreshAccount, payload)
  }
}

function* refreshAccount(address: string) {
  const from = yield* select(selectAddress)
  const currentAccount = yield* select(selectAccountAddress)
  if (currentAccount === from || currentAccount === address) {
    yield* put(accountActions.fetchAccount(currentAccount))
    yield* put(stakingActions.fetchAccount(currentAccount))
  }
}

export function* fetchingOnAccountPage() {
  yield* takeLatestCancelable({
    startOnAction: accountActions.openAccountPage,
    cancelOnAction: accountActions.closeAccountPage,
    task: function* (startAction) {
      const address = startAction.payload
      try {
        // Note: tasks triggered by `put` can't get canceled by closeAccountPage.
        yield* put(accountActions.fetchAccount(address))
        yield* put(stakingActions.fetchAccount(address))
        yield* take(accountActions.accountLoaded)

        // Continuously refresh balance. If balance changes then fetch transactions and staking too.
        while (true) {
          yield* delay(ACCOUNT_REFETCHING_INTERVAL)
          if (document.hidden) continue

          let refreshedAccount
          try {
            const { getAccount } = yield* call(getExplorerAPIs)
            refreshedAccount = yield* call(getAccount, address)
          } catch (apiError: any) {
            console.error('refetching account failed, continuing without updated account.', apiError)
            continue // Ignore error when refetching, and don't fallback to more expensive gRPC
          }

          const staleBalances = yield* select(selectAccount)
          if (
            staleBalances.available !== refreshedAccount.available ||
            staleBalances.delegations !== refreshedAccount.delegations ||
            staleBalances.debonding !== refreshedAccount.debonding
          ) {
            yield* call(fetchAccount, startAction)
            yield* call(stakingFetchAccount, startAction)
            yield* call(walletRefreshAccount, address)
          }
        }
      } finally {
        yield* put(accountActions.clearAccount())
      }
    },
  })
}

export function* accountSaga() {
  yield* fork(fetchingOnAccountPage)
  yield* fork(refreshAccountOnTransaction)
  yield* fork(refreshAccountOnParaTimeTransaction)
  yield* takeLatest(accountActions.fetchAccount, fetchAccount)
}
