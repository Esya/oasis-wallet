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
/**
 * 
 * @export
 * @interface ProposalOption
 */
export interface ProposalOption {
    /**
     * 
     * @type {string}
     * @memberof ProposalOption
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ProposalOption
     */
    amount: string;
    /**
     * 
     * @type {number}
     * @memberof ProposalOption
     */
    percent: number;
}

export function ProposalOptionFromJSON(json: any): ProposalOption {
    return ProposalOptionFromJSONTyped(json, false);
}

export function ProposalOptionFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProposalOption {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'amount': json['amount'],
        'percent': json['percent'],
    };
}

export function ProposalOptionToJSON(value?: ProposalOption | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'amount': value.amount,
        'percent': value.percent,
    };
}


