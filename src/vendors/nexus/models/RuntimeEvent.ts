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
import type { EvmEventToken } from './EvmEventToken';
import {
    EvmEventTokenFromJSON,
    EvmEventTokenFromJSONTyped,
    EvmEventTokenToJSON,
    EvmEventTokenToJSONTyped,
} from './EvmEventToken';
import type { RuntimeEventType } from './RuntimeEventType';
import {
    RuntimeEventTypeFromJSON,
    RuntimeEventTypeFromJSONTyped,
    RuntimeEventTypeToJSON,
    RuntimeEventTypeToJSONTyped,
} from './RuntimeEventType';

/**
 * An event emitted by the runtime layer
 * @export
 * @interface RuntimeEvent
 */
export interface RuntimeEvent {
    /**
     * The block height at which this event was generated.
     * @type {number}
     * @memberof RuntimeEvent
     */
    round: number;
    /**
     * 0-based index of this event's originating transaction within its block.
     * Absent if the event did not originate from a transaction.
     * 
     * @type {number}
     * @memberof RuntimeEvent
     */
    tx_index?: number;
    /**
     * Hash of this event's originating transaction.
     * Absent if the event did not originate from a transaction.
     * 
     * @type {string}
     * @memberof RuntimeEvent
     */
    tx_hash?: string;
    /**
     * Ethereum trasnsaction hash of this event's originating transaction.
     * Absent if the event did not originate from an EVM transaction.
     * 
     * @type {string}
     * @memberof RuntimeEvent
     */
    eth_tx_hash?: string;
    /**
     * The second-granular consensus time of this event's block.
     * 
     * @type {Date}
     * @memberof RuntimeEvent
     */
    timestamp: Date;
    /**
     * The type of the event.
     * @type {RuntimeEventType}
     * @memberof RuntimeEvent
     */
    type: RuntimeEventType;
    /**
     * The decoded event contents, possibly augmented with additional address info.
     * This spec does not encode the many possible types; instead, see [the Go API](https://pkg.go.dev/github.com/oasisprotocol/oasis-sdk/client-sdk/go/modules).
     * This object will conform to one of the `*Event` types two levels down
     * the hierarchy (e.g. `MintEvent` from `accounts > Event > MintEvent`),
     * OR `evm > Event`. For object fields that specify an oasis-style address, Nexus
     * will add a field specifying the corresponding Ethereum address, if known. Currently,
     * the only such possible fields are `from_eth`, `to_eth`, and `owner_eth`.
     * 
     * @type {object}
     * @memberof RuntimeEvent
     */
    body: object;
    /**
     * If the event type is `evm.log`, this field describes the human-readable type of
     * evm event, e.g. `Transfer`.
     * Absent if the event type is not `evm.log`.
     * 
     * @type {string}
     * @memberof RuntimeEvent
     */
    evm_log_name?: string;
    /**
     * The decoded `evm.log` event data.
     * Absent if the event type is not `evm.log`.
     * 
     * @type {Array<EvmAbiParam>}
     * @memberof RuntimeEvent
     */
    evm_log_params?: Array<EvmAbiParam>;
    /**
     * 
     * @type {EvmEventToken}
     * @memberof RuntimeEvent
     */
    evm_token?: EvmEventToken;
}



/**
 * Check if a given object implements the RuntimeEvent interface.
 */
export function instanceOfRuntimeEvent(value: object): value is RuntimeEvent {
    if (!('round' in value) || value['round'] === undefined) return false;
    if (!('timestamp' in value) || value['timestamp'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('body' in value) || value['body'] === undefined) return false;
    return true;
}

export function RuntimeEventFromJSON(json: any): RuntimeEvent {
    return RuntimeEventFromJSONTyped(json, false);
}

export function RuntimeEventFromJSONTyped(json: any, ignoreDiscriminator: boolean): RuntimeEvent {
    if (json == null) {
        return json;
    }
    return {
        
        'round': json['round'],
        'tx_index': json['tx_index'] == null ? undefined : json['tx_index'],
        'tx_hash': json['tx_hash'] == null ? undefined : json['tx_hash'],
        'eth_tx_hash': json['eth_tx_hash'] == null ? undefined : json['eth_tx_hash'],
        'timestamp': (new Date(json['timestamp'])),
        'type': RuntimeEventTypeFromJSON(json['type']),
        'body': json['body'],
        'evm_log_name': json['evm_log_name'] == null ? undefined : json['evm_log_name'],
        'evm_log_params': json['evm_log_params'] == null ? undefined : ((json['evm_log_params'] as Array<any>).map(EvmAbiParamFromJSON)),
        'evm_token': json['evm_token'] == null ? undefined : EvmEventTokenFromJSON(json['evm_token']),
    };
}

export function RuntimeEventToJSON(json: any): RuntimeEvent {
    return RuntimeEventToJSONTyped(json, false);
}

export function RuntimeEventToJSONTyped(value?: RuntimeEvent | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'round': value['round'],
        'tx_index': value['tx_index'],
        'tx_hash': value['tx_hash'],
        'eth_tx_hash': value['eth_tx_hash'],
        'timestamp': ((value['timestamp']).toISOString()),
        'type': RuntimeEventTypeToJSON(value['type']),
        'body': value['body'],
        'evm_log_name': value['evm_log_name'],
        'evm_log_params': value['evm_log_params'] == null ? undefined : ((value['evm_log_params'] as Array<any>).map(EvmAbiParamToJSON)),
        'evm_token': EvmEventTokenToJSON(value['evm_token']),
    };
}

