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
import type { EvmAbiParam } from './EvmAbiParam';
import {
    EvmAbiParamFromJSON,
    EvmAbiParamFromJSONTyped,
    EvmAbiParamToJSON,
    EvmAbiParamToJSONTyped,
} from './EvmAbiParam';
import type { RuntimeTransactionEncryptionEnvelope } from './RuntimeTransactionEncryptionEnvelope';
import {
    RuntimeTransactionEncryptionEnvelopeFromJSON,
    RuntimeTransactionEncryptionEnvelopeFromJSONTyped,
    RuntimeTransactionEncryptionEnvelopeToJSON,
    RuntimeTransactionEncryptionEnvelopeToJSONTyped,
} from './RuntimeTransactionEncryptionEnvelope';
import type { TxError } from './TxError';
import {
    TxErrorFromJSON,
    TxErrorFromJSONTyped,
    TxErrorToJSON,
    TxErrorToJSONTyped,
} from './TxError';

/**
 * A runtime transaction.
 * 
 * @export
 * @interface RuntimeTransaction
 */
export interface RuntimeTransaction {
    /**
     * The block round at which this transaction was executed.
     * @type {number}
     * @memberof RuntimeTransaction
     */
    round: number;
    /**
     * The 0-based index of this transaction in the block.
     * @type {number}
     * @memberof RuntimeTransaction
     */
    index: number;
    /**
     * The second-granular consensus time when this tx's block was proposed.
     * @type {Date}
     * @memberof RuntimeTransaction
     */
    timestamp: Date;
    /**
     * The Oasis cryptographic hash of this transaction's encoding.
     * @type {string}
     * @memberof RuntimeTransaction
     */
    hash: string;
    /**
     * The Ethereum cryptographic hash of this transaction's encoding.
     * Absent for non-Ethereum-format transactions.
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    eth_hash?: string;
    /**
     * The Oasis address of this transaction's 0th signer.
     * Unlike Ethereum, Oasis natively supports multiple-signature transactions.
     * However, the great majority of transactions only have a single signer in practice.
     * Retrieving the other signers is currently not supported by this API.
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    sender_0: string;
    /**
     * The Ethereum address of this transaction's 0th signer.
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    sender_0_eth?: string;
    /**
     * The nonce used with this transaction's 0th signer, to prevent replay.
     * @type {number}
     * @memberof RuntimeTransaction
     */
    nonce_0: number;
    /**
     * The fee that this transaction's sender committed to pay to execute
     * it (total ParaTime base units, as a string).
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    fee: string;
    /**
     * The denomination of the fee.
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    fee_symbol: string;
    /**
     * The module of the fee proxy.
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    fee_proxy_module?: string;
    /**
     * the base64-encoded id of the fee proxy.
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    fee_proxy_id?: string;
    /**
     * The maximum gas that this transaction's sender committed to use to
     * execute it.
     * 
     * @type {number}
     * @memberof RuntimeTransaction
     */
    gas_limit: number;
    /**
     * The total gas used by the transaction.
     * @type {number}
     * @memberof RuntimeTransaction
     */
    gas_used: number;
    /**
     * The fee that was charged for the transaction execution (total, native denomination,
     * ParaTime base units, as a string).
     * For EVM transactions this is calculated as `gas_price * gas_used`, where `gas_price = fee / gas_limit`, for compatibility with Ethereum.
     * For other transactions this equals to `fee`.
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    charged_fee: string;
    /**
     * The total byte size of the transaction.
     * @type {number}
     * @memberof RuntimeTransaction
     */
    size: number;
    /**
     * The method that was called. Defined by the runtime. In theory, this could be any string as the runtimes evolve.
     * In practice, Nexus currently expects only the following methods:
     *   - "accounts.Transfer"
     *   - "consensus.Deposit"
     *   - "consensus.Withdraw"
     *   - "consensus.Delegate"
     *   - "consensus.Undelegate"
     *   - "evm.Create"
     *   - "evm.Call"
     * May be null if the transaction was malformed or encrypted.
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    method?: string;
    /**
     * The method call body. May be null if the transaction was malformed.
     * @type {object}
     * @memberof RuntimeTransaction
     */
    body?: object;
    /**
     * Whether this transaction likely represents a native token transfer.
     * This is based on a heuristic, and can change at any time without warning and possibly without updating the documentation.
     * The current heuristic sets this to `true` for:
     *  - Transactions with method "accounts.Transfer". Those are always native token transfers.
     *  - Transactions with method "evm.Call" that have no `data` field in their `body`. Those tend to be transfers, but the runtimes provides no reliable visibility into whether a transfer happened.
     * Note: Other transactions with method "evm.Call", and possibly "evm.Create", may also be (or include) native token transfers. The heuristic will be `false` for those.
     * 
     * @type {boolean}
     * @memberof RuntimeTransaction
     */
    is_likely_native_token_transfer?: boolean;
    /**
     * A reasonable "to" Oasis address associated with this transaction,
     * if applicable. The meaning varies based on the transaction method. Some notable examples:
     *   - For `method = "accounts.Transfer"`, this is the paratime account receiving the funds.
     *   - For `method = "consensus.Deposit"`, this is the paratime account receiving the funds.
     *   - For `method = "consensus.Withdraw"`, this is the consensus (!) account receiving the funds.
     *   - For `method = "consensus.Delegate"`, this is the consensus (!) account receiving the funds.
     *   - For `method = "consensus.Undelegate"`, this is the consensus (!) account to which funds were previously delegated. Note that this corresponds with the `.from` field in the transaction body.
     *   - For `method = "evm.Create"`, this is the address of the newly created smart contract.
     *   - For `method = "evm.Call"`, this is the address of the called smart contract
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    to?: string;
    /**
     * A reasonable "to" Ethereum address associated with this transaction,
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    to_eth?: string;
    /**
     * A reasonable "amount" associated with this transaction, if
     * applicable. The meaning varies based on the transaction method.
     * Usually in native denomination, ParaTime units. As a string.
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    amount?: string;
    /**
     * The denomination of the "amount" associated with this transaction, if applicable.
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    amount_symbol?: string;
    /**
     * The data relevant to the encrypted transaction. Only present for encrypted
     * transactions in confidential EVM runtimes like Sapphire.
     * Note: The term "envelope" in this context refers to the [Oasis-style encryption envelopes](https://github.com/oasisprotocol/oasis-sdk/blob/c36a7ee194abf4ca28fdac0edbefe3843b39bf69/runtime-sdk/src/types/callformat.rs)
     * which differ slightly from [digital envelopes](hhttps://en.wikipedia.org/wiki/Hybrid_cryptosystem#Envelope_encryption).
     * 
     * @type {RuntimeTransactionEncryptionEnvelope}
     * @memberof RuntimeTransaction
     */
    encryption_envelope?: RuntimeTransactionEncryptionEnvelope;
    /**
     * Whether this transaction successfully executed.
     * Can be absent (meaning "unknown") for confidential runtimes.
     * 
     * @type {boolean}
     * @memberof RuntimeTransaction
     */
    success?: boolean;
    /**
     * The name of the smart contract function called by the transaction.
     * Only present for `evm.log` transaction calls to contracts that have been verified.
     * 
     * @type {string}
     * @memberof RuntimeTransaction
     */
    evm_fn_name?: string;
    /**
     * The decoded parameters with which the smart contract function was called.
     * Only present for `evm.log` transaction calls to contracts that have been verified.
     * 
     * @type {Array<EvmAbiParam>}
     * @memberof RuntimeTransaction
     */
    evm_fn_params?: Array<EvmAbiParam>;
    /**
     * Error details of a failed transaction.
     * @type {TxError}
     * @memberof RuntimeTransaction
     */
    error?: TxError;
}

/**
 * Check if a given object implements the RuntimeTransaction interface.
 */
export function instanceOfRuntimeTransaction(value: object): value is RuntimeTransaction {
    if (!('round' in value) || value['round'] === undefined) return false;
    if (!('index' in value) || value['index'] === undefined) return false;
    if (!('timestamp' in value) || value['timestamp'] === undefined) return false;
    if (!('hash' in value) || value['hash'] === undefined) return false;
    if (!('sender_0' in value) || value['sender_0'] === undefined) return false;
    if (!('nonce_0' in value) || value['nonce_0'] === undefined) return false;
    if (!('fee' in value) || value['fee'] === undefined) return false;
    if (!('fee_symbol' in value) || value['fee_symbol'] === undefined) return false;
    if (!('gas_limit' in value) || value['gas_limit'] === undefined) return false;
    if (!('gas_used' in value) || value['gas_used'] === undefined) return false;
    if (!('charged_fee' in value) || value['charged_fee'] === undefined) return false;
    if (!('size' in value) || value['size'] === undefined) return false;
    return true;
}

export function RuntimeTransactionFromJSON(json: any): RuntimeTransaction {
    return RuntimeTransactionFromJSONTyped(json, false);
}

export function RuntimeTransactionFromJSONTyped(json: any, ignoreDiscriminator: boolean): RuntimeTransaction {
    if (json == null) {
        return json;
    }
    return {
        
        'round': json['round'],
        'index': json['index'],
        'timestamp': (new Date(json['timestamp'])),
        'hash': json['hash'],
        'eth_hash': json['eth_hash'] == null ? undefined : json['eth_hash'],
        'sender_0': json['sender_0'],
        'sender_0_eth': json['sender_0_eth'] == null ? undefined : json['sender_0_eth'],
        'nonce_0': json['nonce_0'],
        'fee': json['fee'],
        'fee_symbol': json['fee_symbol'],
        'fee_proxy_module': json['fee_proxy_module'] == null ? undefined : json['fee_proxy_module'],
        'fee_proxy_id': json['fee_proxy_id'] == null ? undefined : json['fee_proxy_id'],
        'gas_limit': json['gas_limit'],
        'gas_used': json['gas_used'],
        'charged_fee': json['charged_fee'],
        'size': json['size'],
        'method': json['method'] == null ? undefined : json['method'],
        'body': json['body'] == null ? undefined : json['body'],
        'is_likely_native_token_transfer': json['is_likely_native_token_transfer'] == null ? undefined : json['is_likely_native_token_transfer'],
        'to': json['to'] == null ? undefined : json['to'],
        'to_eth': json['to_eth'] == null ? undefined : json['to_eth'],
        'amount': json['amount'] == null ? undefined : json['amount'],
        'amount_symbol': json['amount_symbol'] == null ? undefined : json['amount_symbol'],
        'encryption_envelope': json['encryption_envelope'] == null ? undefined : RuntimeTransactionEncryptionEnvelopeFromJSON(json['encryption_envelope']),
        'success': json['success'] == null ? undefined : json['success'],
        'evm_fn_name': json['evm_fn_name'] == null ? undefined : json['evm_fn_name'],
        'evm_fn_params': json['evm_fn_params'] == null ? undefined : ((json['evm_fn_params'] as Array<any>).map(EvmAbiParamFromJSON)),
        'error': json['error'] == null ? undefined : TxErrorFromJSON(json['error']),
    };
}

export function RuntimeTransactionToJSON(json: any): RuntimeTransaction {
    return RuntimeTransactionToJSONTyped(json, false);
}

export function RuntimeTransactionToJSONTyped(value?: RuntimeTransaction | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'round': value['round'],
        'index': value['index'],
        'timestamp': ((value['timestamp']).toISOString()),
        'hash': value['hash'],
        'eth_hash': value['eth_hash'],
        'sender_0': value['sender_0'],
        'sender_0_eth': value['sender_0_eth'],
        'nonce_0': value['nonce_0'],
        'fee': value['fee'],
        'fee_symbol': value['fee_symbol'],
        'fee_proxy_module': value['fee_proxy_module'],
        'fee_proxy_id': value['fee_proxy_id'],
        'gas_limit': value['gas_limit'],
        'gas_used': value['gas_used'],
        'charged_fee': value['charged_fee'],
        'size': value['size'],
        'method': value['method'],
        'body': value['body'],
        'is_likely_native_token_transfer': value['is_likely_native_token_transfer'],
        'to': value['to'],
        'to_eth': value['to_eth'],
        'amount': value['amount'],
        'amount_symbol': value['amount_symbol'],
        'encryption_envelope': RuntimeTransactionEncryptionEnvelopeToJSON(value['encryption_envelope']),
        'success': value['success'],
        'evm_fn_name': value['evm_fn_name'],
        'evm_fn_params': value['evm_fn_params'] == null ? undefined : ((value['evm_fn_params'] as Array<any>).map(EvmAbiParamToJSON)),
        'error': TxErrorToJSON(value['error']),
    };
}

