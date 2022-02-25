import { Account } from 'app/state/account/types'
import { Validator } from 'app/state/staking/types'
import { Transaction, TransactionType } from 'app/state/transaction/types'
import { parseStringValueToInt } from 'app/lib/helpers'
import {
  AccountsApi,
  AccountsRow,
  Configuration,
  OperationsListApi,
  ValidatorRow,
  OperationsRow,
  OperationsRowMethodEnum,
} from 'vendors/oasisscan/index'

export function getOasisscanAPIs(url: string | 'https://api.oasisscan.com/mainnet/') {
  const explorerConfig = new Configuration({
    basePath: url,
  })

  const accounts = new AccountsApi(explorerConfig)
  const operations = new OperationsListApi(explorerConfig)

  async function getAccount(address: string): Promise<Account> {
    const account = await accounts.getAccount({ accountId: address })
    if (account && account.code === 0) {
      return parseAccount(account.data)
    } else {
      throw new Error('Wrong response code') // TODO
    }
  }

  async function getAllValidators(): Promise<Validator[]> {
    const validators = await accounts.getValidatorsList({ pageSize: 500 })
    if (validators && validators.code === 0) {
      return parseValidatorsList(validators.data.list)
    } else {
      throw new Error('Wrong response code') // TODO
    }
  }

  async function getTransactionsList(params: { accountId: string; limit: number }): Promise<Transaction[]> {
    const transactionsList = await operations.getTransactionsList({
      address: params.accountId,
      size: params.limit,
      runtime: false,
    })
    if (transactionsList && transactionsList.code === 0) {
      return parseTransactionsList(transactionsList.data.list)
    } else {
      throw new Error('Wrong response code') // TODO
    }
  }

  return { getAccount, getAllValidators, getTransactionsList }
}

export function parseAccount(account: AccountsRow): Account {
  return {
    address: account.address,
    liquid_balance: parseStringValueToInt(account.available),
  }
}

export function parseValidatorsList(validators: ValidatorRow[]): Validator[] {
  return validators.map(v => {
    return {
      address: v.entity_address,
      name: v.name,
      escrow: parseStringValueToInt(v.escrow),
      current_rate: v.commission,
      status: v.status ? 'active' : 'inactive',
      media: {
        email_address: v.email,
        logotype: v.icon,
        twitter_acc: v.twitter,
        website_link: v.website,
      },
      rank: v.rank,
    } as Validator
  })
}

export const transactionMethodMap: { [k in OperationsRowMethodEnum]: TransactionType } = {
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
  [OperationsRowMethodEnum.BeaconPvssCommit]: TransactionType.BeaconPvssCommit,
  [OperationsRowMethodEnum.BeaconPvssReveal]: TransactionType.BeaconPvssReveal,
}

export function parseTransactionsList(transactionsList: OperationsRow[]): Transaction[] {
  return transactionsList.map(t => {
    const parsed: Transaction = {
      amount: t.amount == null ? undefined : parseStringValueToInt(t.amount),
      fee: t.fee == null ? undefined : parseStringValueToInt(t.fee),
      from: t.from == null ? undefined : t.from,
      hash: t.tx_hash!,
      level: t.height == null ? undefined : t.height,
      status: t.status == null ? undefined : t.status,
      timestamp: t.timestamp == null ? undefined : t.timestamp,
      to: t.to == null ? undefined : t.to,
      type: transactionMethodMap[t.method!],
    }
    return parsed
  })
}
