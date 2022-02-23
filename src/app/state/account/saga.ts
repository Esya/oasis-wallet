import { PayloadAction } from '@reduxjs/toolkit'
import { addressToPublicKey } from 'app/lib/helpers'
import { all, call, fork, join, put, select, take, takeEvery } from 'typed-redux-saga'

import { accountActions as actions } from '.'
import { getExplorerAPIs, getOasisNic } from '../network/saga'
import { stakingActions } from '../staking'
import { transactionActions } from '../transaction'
import { selectAddress } from '../wallet/selectors'
import { selectAccountAddress } from './selectors'

/**
 * Waits for a LoadAccount action with a specific address,
 * and hydrate the state accordingly
 */
function* loadAccount(action: PayloadAction<string>) {
  const address = action.payload

  yield* put(actions.setLoading(true))
  const nic = yield* call(getOasisNic)
  const publicKey = yield* call(addressToPublicKey, address)
  const { getAccount, operations } = yield* call(getExplorerAPIs)

  yield* all([
    join(
      yield* fork(function* () {
        try {
          const account = yield* call(getAccount, address)
          yield put(actions.accountLoaded(account))
        } catch (e) {
          console.error('get account, continuing without updated account.', e)
          yield put(actions.accountError('' + e))
          return
        }
      }),
    ),
    join(
      yield* fork(function* () {
        let transactions
        try {
          // TODO
          // https://monitor.oasis.dev/data/transactions?account_id=oasis1qq3xrq0urs8qcffhvmhfhz4p0mu7ewc8rscnlwxe&limit=20
          // https://api.oasisscan.com/mainnet/chain/transactions?address=oasis1qq3xrq0urs8qcffhvmhfhz4p0mu7ewc8rscnlwxe&size=20&runtime=true
          transactions = yield* call([operations, operations.getTransactionsList], {
            accountId: address,
            limit: 20,
          })
        } catch (e) {
          console.error('get transactions list failed, continuing without updated list.', e)
          yield put(actions.transactionsError('' + e))
          return
        }
        yield put(actions.transactionsLoaded(transactions))
      }),
    ),
    //@TODO Use this for now instead of oasis-explorer because of the ongoing
    //issue with staking balances being wrong
    call([nic, nic.stakingAccount], { owner: publicKey, height: 0 }),
  ])

  yield* put(actions.setLoading(false))
}

/**
 * When a transaction is done, and it is related to the account we currently have in state
 * refresh the data.
 */
function* refreshAccountOnTransaction() {
  while (true) {
    const { payload } = yield* take(transactionActions.transactionSent)
    const from = yield* select(selectAddress)
    let otherAddress: string

    if (payload.type === 'transfer') {
      otherAddress = payload.to
    } else {
      otherAddress = payload.validator
    }

    const currentAccount = yield* select(selectAccountAddress)
    if (currentAccount === from || currentAccount === otherAddress) {
      // Refresh current account
      yield* put(actions.fetchAccount(currentAccount))
      yield* put(stakingActions.fetchAccount(currentAccount))
    }
  }
}

export function* accountSaga() {
  yield* fork(refreshAccountOnTransaction)
  yield* takeEvery(actions.fetchAccount, loadAccount)
}
