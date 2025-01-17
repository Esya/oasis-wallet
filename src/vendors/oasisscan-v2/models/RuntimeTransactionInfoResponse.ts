/* tslint:disable */
/* eslint-disable */
/**
 * 
 * This api document example is the Mainnet document, and the Testnet base URL is api.oasisscan.com/v2/testnet
 *
 * The version of the OpenAPI document: 
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    RuntimeTransactionConsensusTx,
    RuntimeTransactionConsensusTxFromJSON,
    RuntimeTransactionConsensusTxFromJSONTyped,
    RuntimeTransactionConsensusTxToJSON,
    RuntimeTransactionEvmTx,
    RuntimeTransactionEvmTxFromJSON,
    RuntimeTransactionEvmTxFromJSONTyped,
    RuntimeTransactionEvmTxToJSON,
} from './';

/**
 * 
 * @export
 * @interface RuntimeTransactionInfoResponse
 */
export interface RuntimeTransactionInfoResponse {
    /**
     * 
     * @type {string}
     * @memberof RuntimeTransactionInfoResponse
     */
    runtimeId: string;
    /**
     * 
     * @type {string}
     * @memberof RuntimeTransactionInfoResponse
     */
    runtimeName: string;
    /**
     * 
     * @type {string}
     * @memberof RuntimeTransactionInfoResponse
     */
    txHash: string;
    /**
     * 
     * @type {number}
     * @memberof RuntimeTransactionInfoResponse
     */
    round: number;
    /**
     * 
     * @type {boolean}
     * @memberof RuntimeTransactionInfoResponse
     */
    result: boolean;
    /**
     * 
     * @type {string}
     * @memberof RuntimeTransactionInfoResponse
     */
    message: string;
    /**
     * 
     * @type {number}
     * @memberof RuntimeTransactionInfoResponse
     */
    timestamp: number;
    /**
     * 
     * @type {string}
     * @memberof RuntimeTransactionInfoResponse
     */
    type: string;
    /**
     * 
     * @type {RuntimeTransactionConsensusTx}
     * @memberof RuntimeTransactionInfoResponse
     */
    ctx: RuntimeTransactionConsensusTx;
    /**
     * 
     * @type {RuntimeTransactionEvmTx}
     * @memberof RuntimeTransactionInfoResponse
     */
    etx: RuntimeTransactionEvmTx;
    /**
     * 
     * @type {object}
     * @memberof RuntimeTransactionInfoResponse
     */
    events: object;
}

export function RuntimeTransactionInfoResponseFromJSON(json: any): RuntimeTransactionInfoResponse {
    return RuntimeTransactionInfoResponseFromJSONTyped(json, false);
}

export function RuntimeTransactionInfoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RuntimeTransactionInfoResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'runtimeId': json['runtimeId'],
        'runtimeName': json['runtimeName'],
        'txHash': json['txHash'],
        'round': json['round'],
        'result': json['result'],
        'message': json['message'],
        'timestamp': json['timestamp'],
        'type': json['type'],
        'ctx': RuntimeTransactionConsensusTxFromJSON(json['ctx']),
        'etx': RuntimeTransactionEvmTxFromJSON(json['etx']),
        'events': json['events'],
    };
}

export function RuntimeTransactionInfoResponseToJSON(value?: RuntimeTransactionInfoResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'runtimeId': value.runtimeId,
        'runtimeName': value.runtimeName,
        'txHash': value.txHash,
        'round': value.round,
        'result': value.result,
        'message': value.message,
        'timestamp': value.timestamp,
        'type': value.type,
        'ctx': RuntimeTransactionConsensusTxToJSON(value.ctx),
        'etx': RuntimeTransactionEvmTxToJSON(value.etx),
        'events': value.events,
    };
}


