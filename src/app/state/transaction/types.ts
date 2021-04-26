import { ErrorPayload } from 'types/errors'

/* --- STATE --- */
export interface TransactionState {
  step?: TransactionStep
  active: boolean
  success: boolean
  error?: ErrorPayload

  /**
   * Used to preview the transaction
   * Later, need to accomodate other transaction types.
   */
  transaction?: SendTransactionPayload
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

export interface SendTransactionPayload {
  /* bech32 Address */
  to: string

  /* Token amount */
  amount: number
}
