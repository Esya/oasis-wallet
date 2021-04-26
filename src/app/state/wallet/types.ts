export enum WalletType {
  Ledger = 'ledger',
  PrivateKey = 'private_key',
  Mnemonic = 'mnemonic',
}

/**
 * WalletBalance
 *
 * We stock the amounts as strings to work around
 * poor bigint support in JS
 *
 */
export interface WalletBalance {
  available: string
  escrow: string
  debonding: string
  total: string
}

export interface BalanceUpdatePayload {
  walletId: number
  balance: WalletBalance
}

export interface Wallet {
  id: number
  publicKey: string
  address: string
  type: WalletType
  path?: number[]
  privateKey?: string
  balance: WalletBalance
}

/* --- STATE --- */
export interface WalletState {
  isOpen: boolean
  selectedWallet?: number
  wallets: { [id: number]: Wallet }
}
