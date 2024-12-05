/* tslint:disable */
/* eslint-disable */
/**
 * Oasis Nexus API V1
 * An API for accessing indexed data from the Oasis Network.  <!-- Acts as a separator after search in sidebar --> # Endpoints 
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Allowance } from './Allowance';
import {
    AllowanceFromJSON,
    AllowanceFromJSONTyped,
    AllowanceToJSON,
    AllowanceToJSONTyped,
} from './Allowance';
import type { AccountStats } from './AccountStats';
import {
    AccountStatsFromJSON,
    AccountStatsFromJSONTyped,
    AccountStatsToJSON,
    AccountStatsToJSONTyped,
} from './AccountStats';

/**
 * 
 * @export
 * @interface AccountListAllOfAccounts
 */
export interface AccountListAllOfAccounts {
    /**
     * The staking address for this account.
     * @type {string}
     * @memberof AccountListAllOfAccounts
     */
    address: string;
    /**
     * The expected nonce for the next transaction (= last used nonce + 1)
     * @type {number}
     * @memberof AccountListAllOfAccounts
     */
    nonce: number;
    /**
     * The available balance, in base units.
     * @type {string}
     * @memberof AccountListAllOfAccounts
     */
    available: string;
    /**
     * The active escrow balance, in base units.
     * @type {string}
     * @memberof AccountListAllOfAccounts
     */
    escrow: string;
    /**
     * The debonding escrow balance, in base units.
     * @type {string}
     * @memberof AccountListAllOfAccounts
     */
    debonding: string;
    /**
     * The balance of this accounts' (outgoing) delegations, in base units.
     * @type {string}
     * @memberof AccountListAllOfAccounts
     */
    delegations_balance: string;
    /**
     * The balance of this accounts' (outgoing) debonding delegations, in base units.
     * @type {string}
     * @memberof AccountListAllOfAccounts
     */
    debonding_delegations_balance: string;
    /**
     * The second-granular consensus time of the block in which this account was first active.
     * Dates before Cobalt (2021-04-28) are approximate.
     * 
     * @type {Date}
     * @memberof AccountListAllOfAccounts
     */
    first_activity?: Date;
    /**
     * The allowances made by this account.
     * This field is omitted when listing multiple accounts.
     * 
     * @type {Array<Allowance>}
     * @memberof AccountListAllOfAccounts
     */
    allowances: Array<Allowance>;
    /**
     * 
     * @type {AccountStats}
     * @memberof AccountListAllOfAccounts
     */
    stats: AccountStats;
}

/**
 * Check if a given object implements the AccountListAllOfAccounts interface.
 */
export function instanceOfAccountListAllOfAccounts(value: object): value is AccountListAllOfAccounts {
    if (!('address' in value) || value['address'] === undefined) return false;
    if (!('nonce' in value) || value['nonce'] === undefined) return false;
    if (!('available' in value) || value['available'] === undefined) return false;
    if (!('escrow' in value) || value['escrow'] === undefined) return false;
    if (!('debonding' in value) || value['debonding'] === undefined) return false;
    if (!('delegations_balance' in value) || value['delegations_balance'] === undefined) return false;
    if (!('debonding_delegations_balance' in value) || value['debonding_delegations_balance'] === undefined) return false;
    if (!('allowances' in value) || value['allowances'] === undefined) return false;
    if (!('stats' in value) || value['stats'] === undefined) return false;
    return true;
}

export function AccountListAllOfAccountsFromJSON(json: any): AccountListAllOfAccounts {
    return AccountListAllOfAccountsFromJSONTyped(json, false);
}

export function AccountListAllOfAccountsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountListAllOfAccounts {
    if (json == null) {
        return json;
    }
    return {
        
        'address': json['address'],
        'nonce': json['nonce'],
        'available': json['available'],
        'escrow': json['escrow'],
        'debonding': json['debonding'],
        'delegations_balance': json['delegations_balance'],
        'debonding_delegations_balance': json['debonding_delegations_balance'],
        'first_activity': json['first_activity'] == null ? undefined : (new Date(json['first_activity'])),
        'allowances': ((json['allowances'] as Array<any>).map(AllowanceFromJSON)),
        'stats': AccountStatsFromJSON(json['stats']),
    };
}

export function AccountListAllOfAccountsToJSON(json: any): AccountListAllOfAccounts {
    return AccountListAllOfAccountsToJSONTyped(json, false);
}

export function AccountListAllOfAccountsToJSONTyped(value?: AccountListAllOfAccounts | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'address': value['address'],
        'nonce': value['nonce'],
        'available': value['available'],
        'escrow': value['escrow'],
        'debonding': value['debonding'],
        'delegations_balance': value['delegations_balance'],
        'debonding_delegations_balance': value['debonding_delegations_balance'],
        'first_activity': value['first_activity'] == null ? undefined : ((value['first_activity']).toISOString()),
        'allowances': ((value['allowances'] as Array<any>).map(AllowanceToJSON)),
        'stats': AccountStatsToJSON(value['stats']),
    };
}

