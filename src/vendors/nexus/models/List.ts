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
 * @interface List
 */
export interface List {
    /**
     * The total number of records that match the query, i.e. the number of records
     * the query would return with limit=infinity.
     * 
     * @type {number}
     * @memberof List
     */
    total_count: number;
    /**
     * Whether total_count is clipped for performance reasons.
     * @type {boolean}
     * @memberof List
     */
    is_total_count_clipped: boolean;
}

/**
 * Check if a given object implements the List interface.
 */
export function instanceOfList(value: object): value is List {
    if (!('total_count' in value) || value['total_count'] === undefined) return false;
    if (!('is_total_count_clipped' in value) || value['is_total_count_clipped'] === undefined) return false;
    return true;
}

export function ListFromJSON(json: any): List {
    return ListFromJSONTyped(json, false);
}

export function ListFromJSONTyped(json: any, ignoreDiscriminator: boolean): List {
    if (json == null) {
        return json;
    }
    return {
        
        'total_count': json['total_count'],
        'is_total_count_clipped': json['is_total_count_clipped'],
    };
}

export function ListToJSON(json: any): List {
    return ListToJSONTyped(json, false);
}

export function ListToJSONTyped(value?: List | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'total_count': value['total_count'],
        'is_total_count_clipped': value['is_total_count_clipped'],
    };
}

