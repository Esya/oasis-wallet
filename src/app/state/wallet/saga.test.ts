import { nic } from 'app/lib/oasis-client'
import { push } from 'connected-react-router'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { EffectProviders, StaticProvider } from 'redux-saga-test-plan/providers'
import { RootState } from 'types'

import { walletActions } from '.'
import { transactionActions } from '../transaction'
import { getBalance, rootWalletSaga, walletSaga } from './saga'
import { selectAddress } from './selectors'
import { Wallet, WalletState } from './types'

describe('Wallet Sagas', () => {
  const validMnemonic =
    'abuse gown claw final toddler wedding sister parade useful typical spatial skate decrease bulk student manual cloth shove fat car little swamp tag ginger'
  const validPrivateKeyHex =
    '5f48e5a6fb243f5abc13aac7c56449afbc93be90ae38f10a0465bc82db954f17e75624c8d2cd9f062ce0331373a3be50ef0eccc5d257b4e2dea83a05506c7132'
  const matchingAddress = 'oasis1qz0k5q8vjqvu4s4nwxyj406ylnflkc4vrcjghuwk'

  const providers: (EffectProviders | StaticProvider)[] = [
    [matchers.select.selector(selectAddress), matchingAddress],
    [matchers.call.fn(nic.stakingAccount), {}],
  ]

  describe('Root Saga', () => {
    it('Should fork once open', () => {
      return expectSaga(rootWalletSaga)
        .withState({})
        .provide(providers)
        .dispatch(walletActions.openWalletFromMnemonic(validMnemonic))
        .fork(walletSaga)
        .silentRun(50)
    })

    it('Should open from mnemonic', () => {
      return expectSaga(rootWalletSaga)
        .provide(providers)
        .withState({})
        .dispatch(walletActions.openWalletFromMnemonic(validMnemonic))
        .fork(walletSaga)
        .put(push(`/account/${matchingAddress}`))
        .silentRun(50)
    })

    it('Should open from private key', () => {
      return expectSaga(rootWalletSaga)
        .provide(providers)
        .withState({})
        .dispatch(walletActions.openWalletFromPrivateKey(validPrivateKeyHex))
        .fork(walletSaga)
        .select(selectAddress)
        .put(push(`/account/${matchingAddress}`))
        .silentRun(50)
    })

    it('Should open from ledger', () => {
      return expectSaga(rootWalletSaga)
        .provide(providers)
        .withState({})
        .dispatch(
          walletActions.openWalletsFromLedger([
            {
              address: matchingAddress,
              balance: { available: '0', debonding: '0', escrow: '0', total: '0' },
              path: [44, 474, 0, 0, 0],
              publicKey: '00',
              selected: true,
            },
          ]),
        )
        .fork(walletSaga)
        .select(selectAddress)
        .put(push(`/account/${matchingAddress}`))
        .silentRun(50)
    })

    it('Should close the wallet and wait for another open attempt', () => {
      return expectSaga(rootWalletSaga)
        .provide(providers)
        .withState({})
        .dispatch(walletActions.openWalletFromPrivateKey(validPrivateKeyHex))
        .fork(walletSaga)
        .put(push(`/account/${matchingAddress}`))
        .dispatch(walletActions.closeWallet())
        .put(walletActions.walletClosed())
        .take(walletActions.openWalletFromMnemonic)
        .silentRun(50)
    })
  })

  it('Should allow opening multiple wallets', () => {
    return expectSaga(rootWalletSaga)
      .provide(providers)
      .withState({})
      .dispatch(walletActions.openWalletFromPrivateKey(validPrivateKeyHex))
      .put.actionType(walletActions.walletOpened.type)
      .put.actionType(walletActions.walletSelected.type)
      .dispatch(walletActions.openWalletFromMnemonic(validMnemonic))
      .put.actionType(walletActions.walletOpened.type)
      .not.put.actionType(walletActions.walletSelected.type)
      .silentRun(50)
  })

  it('Should refresh balances on matching transaction', () => {
    return expectSaga(rootWalletSaga)
      .provide(providers)
      .provide([[matchers.call.fn(getBalance), {}]])
      .withState({
        wallet: {
          wallets: [{ address: 'sender', publicKey: '00' } as Partial<Wallet>],
        } as Partial<WalletState>,
      } as Partial<RootState>)
      .dispatch(transactionActions.transactionSent({ amount: 1, from: 'sender', to: 'receiver' }))
      .call.fn(getBalance)
      .put.actionType(walletActions.updateBalance.type)
      .silentRun(50)
  })
})
