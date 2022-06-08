import * as oasis from '@oasisprotocol/client'
import { Account } from 'app/state/account/types'
import { DebondingDelegation, Delegation, Validator } from 'app/state/staking/types'
import { Transaction, TransactionType } from 'app/state/transaction/types'
import { parseStringValueToInt } from 'app/lib/helpers'
import {
  AccountsApi,
  AccountsRow,
  Configuration,
  DelegationRow,
  DebondingDelegationRow,
  OperationsListApi,
  RuntimeApi,
  ValidatorRow,
  OperationsRow,
  OperationsRowMethodEnum,
  CtxRowMethodEnum,
} from 'vendors/oasisscan/index'

import { sortByStatus } from './helpers'

export function getOasisscanAPIs(url: string | 'https://api.oasisscan.com/mainnet/') {
  const explorerConfig = new Configuration({
    basePath: url,
  })

  const accounts = new AccountsApi(explorerConfig)
  const operations = new OperationsListApi(explorerConfig)
  const runtime = new RuntimeApi(explorerConfig)

  async function getAccount(address: string): Promise<Account> {
    const account = await accounts.getAccount({ accountId: address })
    if (!account || account.code !== 0) throw new Error('Wrong response code') // TODO
    return parseAccount(account.data)
  }

  async function getAllValidators(): Promise<Validator[]> {
    const validators = await accounts.getValidatorsList({ pageSize: 500 })
    if (!validators || validators.code !== 0) throw new Error('Wrong response code') // TODO
    return parseValidatorsList(validators.data.list)
  }

  async function getTransactionsList(params: { accountId: string; limit: number }): Promise<Transaction[]> {
    const transactionsList = await operations.getTransactionsList({
      address: params.accountId,
      size: params.limit,
      runtime: true,
    })
    if (!transactionsList || transactionsList.code !== 0) throw new Error('Wrong response code') // TODO
    const tmp = await Promise.all(
      transactionsList.data.list.map(async tx => {
        if ('runtimeId' in tx && tx.runtimeId !== undefined) {
          const param = {
            id: tx.runtimeId,
            hash: tx.txHash,
            round: tx.round!, // should be there
          }
          // TODO: improve swagger return type
          const txInfo = await runtime.getRuntimeTransactionInfo(param)
          // plug ParaTime values
          const { amount, method, to, from, ...rest } = tx
          const newTx: Transaction = {
            amount: (txInfo.data as any).ctx.amount,
            from: (txInfo.data as any).ctx.from,
            to: (txInfo.data as any).ctx.to,
            method: (txInfo.data as any).ctx.method,
            runtimeName: (txInfo.data as any).runtimeName,
            runtimeId: (txInfo.data as any).runtimeId,
            round: (txInfo.data as any).round,
            ...rest,
          }
          return newTx
        }
        return tx
      }),
    )
    return parseTransactionsList(tmp)
  }

  async function getDelegations(params: { accountId: string; nic: oasis.client.NodeInternal }): Promise<{
    delegations: Delegation[]
    debonding: DebondingDelegation[]
  }> {
    const delegations = await accounts.getDelegations({ address: params.accountId, size: 500 })
    const debonding = await accounts.getDebondingDelegations({ address: params.accountId, size: 500 })
    if (!delegations || delegations.code !== 0) throw new Error('Wrong response code') // TODO
    if (!debonding || debonding.code !== 0) throw new Error('Wrong response code') // TODO

    return {
      delegations: parseDelegations(delegations.data.list),
      debonding: parseDebonding(debonding.data.list),
    }
  }

  return { accounts, operations, getAccount, getAllValidators, getTransactionsList, getDelegations }
}

export function parseAccount(account: AccountsRow): Account {
  return {
    address: account.address,
    liquid_balance: parseStringValueToInt(account.available),
  }
}

export function parseValidatorsList(validators: ValidatorRow[]): Validator[] {
  return validators
    .map(v => {
      const parsed: Validator = {
        address: v.entityAddress,
        name: v.name ?? undefined,
        nodeAddress: v.nodeAddress,
        escrow: parseStringValueToInt(v.escrow),
        current_rate: v.commission,
        status: v.status ? 'active' : 'inactive',
        media: {
          email_address: v.email ?? undefined,
          logotype: v.icon ?? undefined,
          twitter_acc: v.twitter ?? undefined,
          website_link: v.website ?? undefined,
        },
        rank: v.rank,
      }
      return parsed
    })
    .sort(sortByStatus)
}

export const transactionMethodMap: { [k in OperationsRowMethodEnum | CtxRowMethodEnum]: TransactionType } = {
  [OperationsRowMethodEnum.StakingTransfer]: TransactionType.StakingTransfer,
  [OperationsRowMethodEnum.StakingAddEscrow]: TransactionType.StakingAddEscrow,
  [OperationsRowMethodEnum.StakingReclaimEscrow]: TransactionType.StakingReclaimEscrow,
  [OperationsRowMethodEnum.StakingAllow]: TransactionType.StakingAllow,
  [OperationsRowMethodEnum.StakingAmendCommissionSchedule]: TransactionType.StakingAmendCommissionSchedule,
  [OperationsRowMethodEnum.RoothashExecutorCommit]: TransactionType.RoothashExecutorCommit,
  [OperationsRowMethodEnum.RoothashExecutorProposerTimeout]: TransactionType.RoothashExecutorProposerTimeout,
  [OperationsRowMethodEnum.RegistryRegisterEntity]: TransactionType.RegistryRegisterEntity,
  [OperationsRowMethodEnum.RegistryRegisterNode]: TransactionType.RegistryRegisterNode,
  [OperationsRowMethodEnum.RegistryRegisterRuntime]: TransactionType.RegistryRegisterRuntime,
  [OperationsRowMethodEnum.GovernanceCastVote]: TransactionType.GovernanceCastVote,
  [OperationsRowMethodEnum.GovernanceSubmitProposal]: TransactionType.GovernanceSubmitProposal,
  [OperationsRowMethodEnum.BeaconPvssCommit]: TransactionType.BeaconPvssCommit,
  [OperationsRowMethodEnum.BeaconPvssReveal]: TransactionType.BeaconPvssReveal,
  [OperationsRowMethodEnum.BeaconVrfProve]: TransactionType.BeaconVrfProve,
  [CtxRowMethodEnum.ConsensusDeposit]: TransactionType.ConsensusDeposit,
  [CtxRowMethodEnum.ConsensusWithdraw]: TransactionType.ConsensusWithdraw,
  [CtxRowMethodEnum.ConsensusAccountsParameters]: TransactionType.ConsensusAccountsParameters,
  [CtxRowMethodEnum.ConsensusBalance]: TransactionType.ConsensusBalance,
  [CtxRowMethodEnum.ConsensusAccount]: TransactionType.ConsensusAccount,
}

export function parseTransactionsList(transactionsList: OperationsRow[]): Transaction[] {
  return transactionsList.map(t => {
    const parsed: Transaction = {
      amount: t.amount == null ? undefined : parseStringValueToInt(t.amount),
      fee: parseStringValueToInt(t.fee),
      from: t.from,
      hash: t.txHash,
      level: t.height,
      status: t.status,
      timestamp: t.timestamp,
      to: t.to ?? undefined,
      type: transactionMethodMap[t.method],
      method: t.method,
      runtimeName: t.runtimeName,
      runtimeId: t.runtimeId,
      round: t.round,
    }
    return parsed
  })
}

export function parseDelegations(delegations: DelegationRow[]): Delegation[] {
  return delegations.map(delegation => {
    const parsed: Delegation = {
      amount: parseStringValueToInt(delegation.amount).toString(),
      shares: parseStringValueToInt(delegation.shares).toString(),
      validatorAddress: delegation.validatorAddress,
    }
    return parsed
  })
}
export function parseDebonding(debonding: DebondingDelegationRow[]): DebondingDelegation[] {
  return debonding.map(debonding => {
    // TODO: use amount field, or share price when it is available. Until then,
    // using price=1 is inaccurate if debonding pool gets slashed.
    const sharePrice = 1
    const parsed: DebondingDelegation = {
      amount: (parseStringValueToInt(debonding.shares) * sharePrice).toString(),
      shares: parseStringValueToInt(debonding.shares).toString(),
      validatorAddress: debonding.validatorAddress,
      epoch: debonding.debondEnd,
    }
    return parsed
  })
}
