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
import type { ValidatorListAllOfValidators } from './ValidatorListAllOfValidators';
import {
    ValidatorListAllOfValidatorsFromJSON,
    ValidatorListAllOfValidatorsFromJSONTyped,
    ValidatorListAllOfValidatorsToJSON,
    ValidatorListAllOfValidatorsToJSONTyped,
} from './ValidatorListAllOfValidators';
import type { ValidatorAggStats } from './ValidatorAggStats';
import {
    ValidatorAggStatsFromJSON,
    ValidatorAggStatsFromJSONTyped,
    ValidatorAggStatsToJSON,
    ValidatorAggStatsToJSONTyped,
} from './ValidatorAggStats';

/**
 * 
 * @export
 * @interface ValidatorList
 */
export interface ValidatorList {
    /**
     * The total number of records that match the query, i.e. the number of records
     * the query would return with limit=infinity.
     * 
     * @type {number}
     * @memberof ValidatorList
     */
    total_count: number;
    /**
     * Whether total_count is clipped for performance reasons.
     * @type {boolean}
     * @memberof ValidatorList
     */
    is_total_count_clipped: boolean;
    /**
     * 
     * @type {Array<ValidatorListAllOfValidators>}
     * @memberof ValidatorList
     */
    validators: Array<ValidatorListAllOfValidators>;
    /**
     * Summary statistics across all consensus validators.
     * @type {ValidatorAggStats}
     * @memberof ValidatorList
     */
    stats: ValidatorAggStats;
}

/**
 * Check if a given object implements the ValidatorList interface.
 */
export function instanceOfValidatorList(value: object): value is ValidatorList {
    if (!('total_count' in value) || value['total_count'] === undefined) return false;
    if (!('is_total_count_clipped' in value) || value['is_total_count_clipped'] === undefined) return false;
    if (!('validators' in value) || value['validators'] === undefined) return false;
    if (!('stats' in value) || value['stats'] === undefined) return false;
    return true;
}

export function ValidatorListFromJSON(json: any): ValidatorList {
    return ValidatorListFromJSONTyped(json, false);
}

export function ValidatorListFromJSONTyped(json: any, ignoreDiscriminator: boolean): ValidatorList {
    if (json == null) {
        return json;
    }
    return {
        
        'total_count': json['total_count'],
        'is_total_count_clipped': json['is_total_count_clipped'],
        'validators': ((json['validators'] as Array<any>).map(ValidatorListAllOfValidatorsFromJSON)),
        'stats': ValidatorAggStatsFromJSON(json['stats']),
    };
}

export function ValidatorListToJSON(json: any): ValidatorList {
    return ValidatorListToJSONTyped(json, false);
}

export function ValidatorListToJSONTyped(value?: ValidatorList | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'total_count': value['total_count'],
        'is_total_count_clipped': value['is_total_count_clipped'],
        'validators': ((value['validators'] as Array<any>).map(ValidatorListAllOfValidatorsToJSON)),
        'stats': ValidatorAggStatsToJSON(value['stats']),
    };
}

