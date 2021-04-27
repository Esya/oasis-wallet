import { PayloadAction } from '@reduxjs/toolkit'
import { HDKey } from 'app/lib/hdkey'
import {
  hex2uint,
  publicKeyToAddress,
  shortPublicKey,
  stringBigint2uint,
  uint2bigintString,
  uint2hex,
} from 'app/lib/helpers'
import { nic } from 'app/lib/oasis-client'
import { mnemonicToSeedSync } from 'bip39'
import { push } from 'connected-react-router'
import nacl from 'tweetnacl'
import { call, fork, put, select, take, takeEvery, takeLatest } from 'typed-redux-saga'

import { walletActions as actions, walletActions } from '.'
import { LedgerAccount } from '../ledger/types'
import { transactionActions } from '../transaction'
import { sendTransaction } from '../transaction/saga'
import { selectAddress, selectWallets } from './selectors'
import { WalletBalance, WalletType } from './types'

// Ensure a unique walletId per opened wallet
// Maybe we should switch to something like uuid later
let walletId = 0

export function* getBalance(publicKey: Uint8Array) {
  const short = yield* call(shortPublicKey, publicKey)
  const account = yield* call([nic, nic.stakingAccount], {
    height: 0,
    owner: short,
  })

  const zero = stringBigint2uint('0')

  const balance: Partial<WalletBalance> = {
    available: uint2bigintString(account.general?.balance || zero),
    debonding: uint2bigintString(account.escrow?.debonding?.balance || zero),
    escrow: uint2bigintString(account.escrow?.active?.balance || zero),
  }

  const total = BigInt(balance.available) + BigInt(balance.debonding) + BigInt(balance.escrow)

  return { ...balance, total: total.toString() } as WalletBalance
}

/**
 * Take multiple ledger accounts that we want to open
 */
export function* openWalletsFromLedger({ payload: accounts }: PayloadAction<LedgerAccount[]>) {
  for (const account of accounts) {
    yield* put(
      actions.walletOpened({
        id: walletId++,
        address: account.address,
        publicKey: account.publicKey,
        type: WalletType.Ledger,
        balance: account.balance,
        path: account.path,
      }),
    )
  }
}

export function* openWalletFromPrivateKey({ payload: privateKey }: PayloadAction<string>) {
  const type = WalletType.PrivateKey
  const publicKeyBytes = nacl.sign.keyPair.fromSecretKey(hex2uint(privateKey)).publicKey
  const walletAddress = yield* call(publicKeyToAddress, publicKeyBytes)
  const publicKey = uint2hex(publicKeyBytes)
  const balance = yield* getBalance(publicKeyBytes)

  yield* put(
    actions.walletOpened({
      id: walletId++,
      address: walletAddress,
      publicKey,
      privateKey,
      type: type!,
      balance,
    }),
  )
}

export function* openWalletFromMnemonic({ payload: mnemonic }: PayloadAction<string>) {
  const seed = mnemonicToSeedSync(mnemonic).slice(0, 32)
  const hdkey = HDKey.fromSeed(seed).derivePath("44'/474'/0'/0'/0'")
  const privateKey = uint2hex(hdkey.secret)
  const type = WalletType.Mnemonic
  const publicKeyBytes = hdkey.public()
  const publicKey = uint2hex(publicKeyBytes)

  const walletAddress = yield* call(publicKeyToAddress, publicKeyBytes!)
  const balance = yield* getBalance(publicKeyBytes)

  yield* put(
    actions.walletOpened({
      id: walletId++,
      address: walletAddress,
      publicKey,
      privateKey,
      type: type!,
      balance,
    }),
  )
}

/**
 * Open wallet from a mnemonic or private key
 */
export function* openWallet() {
  yield* takeEvery(walletActions.openWalletFromPrivateKey, openWalletFromPrivateKey)
  yield* takeEvery(walletActions.openWalletFromMnemonic, openWalletFromMnemonic)
  yield* takeEvery(walletActions.openWalletsFromLedger, openWalletsFromLedger)
}

export function* closeWallet() {
  yield* put(actions.walletClosed())
}

export function* selectWallet({ payload: index }: PayloadAction<number>) {
  yield* put(walletActions.walletSelected(index))
}

/**
 * When a wallet is opened, select it and go to the matching account
 */
export function* selectOpenedWallets() {
  while (true) {
    const wallet = yield* take(walletActions.walletOpened)
    yield* put(walletActions.selectWallet(wallet.payload.id))
    yield* take(walletActions.walletSelected)
    const address = yield* select(selectAddress)
    yield* put(push(`/account/${address}`))
  }
}

/**
 * When a transaction is done, and it is related to the account we currently have in state
 * refresh the data.
 */
function* reloadBalanceOnTransaction() {
  while (true) {
    const { payload } = yield* take(transactionActions.transactionSent)

    const from = payload.from
    const to = payload.to

    const wallets = yield* select(selectWallets)
    const matchingWallets = Object.values(wallets).filter(w => w.address === to || w.address === from)
    for (const wallet of matchingWallets) {
      const balance = yield* call(getBalance, hex2uint(wallet.publicKey))
      yield* put(
        walletActions.updateBalance({
          walletId: wallet.id,
          balance,
        }),
      )
    }
  }
}
/**
 * Opened wallet saga that
 *
 * - Refreshes every Xs
 * - Sends transactions
 * - Stakes
 * - Signs messages
 * - Verifies signatures
 * - etc...
 */
export function* walletSaga() {
  yield* takeEvery(transactionActions.sendTransaction, sendTransaction)
}

export function* rootWalletSaga() {
  // Wait for an openWallet action (Mnemonic or PrivateKey)
  yield* fork(openWallet)
  yield* fork(selectOpenedWallets)

  // Reload balance of matching wallets when a transaction occurs
  yield* fork(reloadBalanceOnTransaction)

  // Allow switching between wallets
  yield* takeLatest(walletActions.selectWallet, selectWallet)

  // Start the wallet saga in parallel
  yield* fork(walletSaga)

  // Listen to closeWallet
  yield* takeEvery(actions.closeWallet, closeWallet)
}
