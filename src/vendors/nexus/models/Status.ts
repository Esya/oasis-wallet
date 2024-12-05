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
 * 
 * @export
 * @interface Status
 */
export interface Status {
    /**
     * The height of the most recent indexed block. Compare with latest_node_block to measure
     * how far behind Nexus is from the chain.
     * 
     * @type {number}
     * @memberof Status
     */
    latest_block: number;
    /**
     * The height of the most recently produced block on-chain as seen by Nexus.
     * @type {number}
     * @memberof Status
     */
    latest_node_block: number;
    /**
     * The RFC 3339 formatted consensus time of when the most recently indexed block was produced.
     * @type {Date}
     * @memberof Status
     */
    latest_block_time: Date;
    /**
     * The number of milliseconds since Nexus processed the latest block.
     * @type {number}
     * @memberof Status
     */
    latest_update_age_ms: number;
}

/**
 * Check if a given object implements the Status interface.
 */
export function instanceOfStatus(value: object): value is Status {
    if (!('latest_block' in value) || value['latest_block'] === undefined) return false;
    if (!('latest_node_block' in value) || value['latest_node_block'] === undefined) return false;
    if (!('latest_block_time' in value) || value['latest_block_time'] === undefined) return false;
    if (!('latest_update_age_ms' in value) || value['latest_update_age_ms'] === undefined) return false;
    return true;
}

export function StatusFromJSON(json: any): Status {
    return StatusFromJSONTyped(json, false);
}

export function StatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): Status {
    if (json == null) {
        return json;
    }
    return {
        
        'latest_block': json['latest_block'],
        'latest_node_block': json['latest_node_block'],
        'latest_block_time': (new Date(json['latest_block_time'])),
        'latest_update_age_ms': json['latest_update_age_ms'],
    };
}

export function StatusToJSON(json: any): Status {
    return StatusToJSONTyped(json, false);
}

export function StatusToJSONTyped(value?: Status | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'latest_block': value['latest_block'],
        'latest_node_block': value['latest_node_block'],
        'latest_block_time': ((value['latest_block_time']).toISOString()),
        'latest_update_age_ms': value['latest_update_age_ms'],
    };
}

