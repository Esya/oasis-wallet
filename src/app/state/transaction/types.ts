import { ErrorPayload } from 'types/errors'

export interface Transaction {
  amount?: number
  escrow_amount?: number
  fee?: number
  from?: string
  gas_price?: number
  hash?: string
  level?: number
  nonce?: number
  reclaim_escrow_amount?: number
  status?: string
  timestamp?: number
  to?: string
  type?: string
}

/* --- STATE --- */
export interface TransactionState {
  step?: TransactionStep
  active: boolean
  success: boolean
  error?: ErrorPayload
  preview?: TransactionPreview
}

export type TransactionType = 'transfer' | 'addEscrow' | 'reclaimEscrow'
export type TransactionPayload = TransferPayload | AddEscrowPayload | ReclaimEscrowPayload

export interface TransactionPreview {
  transaction: TransactionPayload
  fee?: string
  gas?: string
}

/**
 * Flow for a transaction to be sent.
 */
export enum TransactionStep {
  Building = 'building',
  Preview = 'preview',
  Signing = 'signing',
  Submitting = 'submitting',
  Sent = 'sent',
}

export interface TransactionSent {
  from: string
  to: string
  amount: number
}

export interface TransferPayload {
  type: 'transfer'

  /* bech32 Address */
  to: string

  /* Token amount */
  amount: number
}

export interface AddEscrowPayload {
  type: 'addEscrow'

  /* bech32 Address */
  validator: string

  /* Token amount */
  amount: number
}

export interface ReclaimEscrowPayload {
  type: 'reclaimEscrow'

  /* bech32 Address */
  validator: string

  /* Shares to be reclaimed */
  shares: number

  /* Amount to be reclaimed */
  amount: number
}
