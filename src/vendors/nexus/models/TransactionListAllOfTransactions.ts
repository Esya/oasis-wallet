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
import type { ConsensusTxMethod } from './ConsensusTxMethod';
import {
    ConsensusTxMethodFromJSON,
    ConsensusTxMethodFromJSONTyped,
    ConsensusTxMethodToJSON,
    ConsensusTxMethodToJSONTyped,
} from './ConsensusTxMethod';
import type { TxError } from './TxError';
import {
    TxErrorFromJSON,
    TxErrorFromJSONTyped,
    TxErrorToJSON,
    TxErrorToJSONTyped,
} from './TxError';

/**
 * 
 * @export
 * @interface TransactionListAllOfTransactions
 */
export interface TransactionListAllOfTransactions {
    /**
     * The block height at which this transaction was executed.
     * @type {number}
     * @memberof TransactionListAllOfTransactions
     */
    block: number;
    /**
     * 0-based index of this transaction in its block
     * @type {number}
     * @memberof TransactionListAllOfTransactions
     */
    index: number;
    /**
     * The second-granular consensus time of this tx's block, i.e. roughly when the
     * [block was proposed](https://github.com/tendermint/tendermint/blob/v0.34.x/spec/core/data_structures.md#header).
     * 
     * @type {string}
     * @memberof TransactionListAllOfTransactions
     */
    timestamp: string;
    /**
     * The cryptographic hash of this transaction's encoding.
     * @type {string}
     * @memberof TransactionListAllOfTransactions
     */
    hash: string;
    /**
     * The address of who sent this transaction.
     * @type {string}
     * @memberof TransactionListAllOfTransactions
     */
    sender: string;
    /**
     * The nonce used with this transaction, to prevent replay.
     * @type {number}
     * @memberof TransactionListAllOfTransactions
     */
    nonce: number;
    /**
     * The fee that this transaction's sender committed
     * to pay to execute it.
     * 
     * @type {string}
     * @memberof TransactionListAllOfTransactions
     */
    fee: string;
    /**
     * The maximum gas that a transaction can use.
     * 
     * @type {string}
     * @memberof TransactionListAllOfTransactions
     */
    gas_limit: string;
    /**
     * The method that was called.
     * @type {ConsensusTxMethod}
     * @memberof TransactionListAllOfTransactions
     */
    method: ConsensusTxMethod;
    /**
     * The method call body. This spec does not encode the many possible types; instead, see [the Go API](https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go) of oasis-core. This object will conform to one of the types passed to variable instantiations using `NewMethodName` two levels down the hierarchy, e.g. `MethodTransfer` from `oasis-core/go/staking/api` seen [here](https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go@v0.2300.10/staking/api#pkg-variables).
     * @type {object}
     * @memberof TransactionListAllOfTransactions
     */
    body: object;
    /**
     * Whether this transaction successfully executed.
     * @type {boolean}
     * @memberof TransactionListAllOfTransactions
     */
    success: boolean;
    /**
     * Error details of a failed transaction.
     * @type {TxError}
     * @memberof TransactionListAllOfTransactions
     */
    error?: TxError;
}



/**
 * Check if a given object implements the TransactionListAllOfTransactions interface.
 */
export function instanceOfTransactionListAllOfTransactions(value: object): value is TransactionListAllOfTransactions {
    if (!('block' in value) || value['block'] === undefined) return false;
    if (!('index' in value) || value['index'] === undefined) return false;
    if (!('timestamp' in value) || value['timestamp'] === undefined) return false;
    if (!('hash' in value) || value['hash'] === undefined) return false;
    if (!('sender' in value) || value['sender'] === undefined) return false;
    if (!('nonce' in value) || value['nonce'] === undefined) return false;
    if (!('fee' in value) || value['fee'] === undefined) return false;
    if (!('gas_limit' in value) || value['gas_limit'] === undefined) return false;
    if (!('method' in value) || value['method'] === undefined) return false;
    if (!('body' in value) || value['body'] === undefined) return false;
    if (!('success' in value) || value['success'] === undefined) return false;
    return true;
}

export function TransactionListAllOfTransactionsFromJSON(json: any): TransactionListAllOfTransactions {
    return TransactionListAllOfTransactionsFromJSONTyped(json, false);
}

export function TransactionListAllOfTransactionsFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionListAllOfTransactions {
    if (json == null) {
        return json;
    }
    return {
        
        'block': json['block'],
        'index': json['index'],
        'timestamp': json['timestamp'],
        'hash': json['hash'],
        'sender': json['sender'],
        'nonce': json['nonce'],
        'fee': json['fee'],
        'gas_limit': json['gas_limit'],
        'method': ConsensusTxMethodFromJSON(json['method']),
        'body': json['body'],
        'success': json['success'],
        'error': json['error'] == null ? undefined : TxErrorFromJSON(json['error']),
    };
}

export function TransactionListAllOfTransactionsToJSON(json: any): TransactionListAllOfTransactions {
    return TransactionListAllOfTransactionsToJSONTyped(json, false);
}

export function TransactionListAllOfTransactionsToJSONTyped(value?: TransactionListAllOfTransactions | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'block': value['block'],
        'index': value['index'],
        'timestamp': value['timestamp'],
        'hash': value['hash'],
        'sender': value['sender'],
        'nonce': value['nonce'],
        'fee': value['fee'],
        'gas_limit': value['gas_limit'],
        'method': ConsensusTxMethodToJSON(value['method']),
        'body': value['body'],
        'success': value['success'],
        'error': TxErrorToJSON(value['error']),
    };
}

