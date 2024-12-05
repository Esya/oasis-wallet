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
/**
 * A consensus block.
 * 
 * @export
 * @interface Block
 */
export interface Block {
    /**
     * The block height.
     * @type {number}
     * @memberof Block
     */
    height: number;
    /**
     * The block header hash.
     * @type {string}
     * @memberof Block
     */
    hash: string;
    /**
     * The second-granular consensus time.
     * @type {string}
     * @memberof Block
     */
    timestamp: string;
    /**
     * Number of transactions in the block.
     * @type {number}
     * @memberof Block
     */
    num_transactions: number;
    /**
     * The gas limit for the block. A gas limit 0 means that the max block gas was unlimited.
     * Blocks from Cobalt, Damask, and early Eden had no gas limit as their sizes were only
     * restricted by byte size until an upgrade during Eden introduced a gas limit.
     * 
     * @type {string}
     * @memberof Block
     */
    gas_limit: string;
    /**
     * The size limit for the block in bytes.
     * 
     * @type {string}
     * @memberof Block
     */
    size_limit?: string;
    /**
     * The epoch number of the epoch in which the block was produced.
     * @type {number}
     * @memberof Block
     */
    epoch: number;
    /**
     * The Merkle root of the state tree after applying the block.
     * @type {string}
     * @memberof Block
     */
    state_root: string;
}

/**
 * Check if a given object implements the Block interface.
 */
export function instanceOfBlock(value: object): value is Block {
    if (!('height' in value) || value['height'] === undefined) return false;
    if (!('hash' in value) || value['hash'] === undefined) return false;
    if (!('timestamp' in value) || value['timestamp'] === undefined) return false;
    if (!('num_transactions' in value) || value['num_transactions'] === undefined) return false;
    if (!('gas_limit' in value) || value['gas_limit'] === undefined) return false;
    if (!('epoch' in value) || value['epoch'] === undefined) return false;
    if (!('state_root' in value) || value['state_root'] === undefined) return false;
    return true;
}

export function BlockFromJSON(json: any): Block {
    return BlockFromJSONTyped(json, false);
}

export function BlockFromJSONTyped(json: any, ignoreDiscriminator: boolean): Block {
    if (json == null) {
        return json;
    }
    return {
        
        'height': json['height'],
        'hash': json['hash'],
        'timestamp': json['timestamp'],
        'num_transactions': json['num_transactions'],
        'gas_limit': json['gas_limit'],
        'size_limit': json['size_limit'] == null ? undefined : json['size_limit'],
        'epoch': json['epoch'],
        'state_root': json['state_root'],
    };
}

export function BlockToJSON(json: any): Block {
    return BlockToJSONTyped(json, false);
}

export function BlockToJSONTyped(value?: Block | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'height': value['height'],
        'hash': value['hash'],
        'timestamp': value['timestamp'],
        'num_transactions': value['num_transactions'],
        'gas_limit': value['gas_limit'],
        'size_limit': value['size_limit'],
        'epoch': value['epoch'],
        'state_root': value['state_root'],
    };
}

