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
import type { EvmTokenType } from './EvmTokenType';
import {
    EvmTokenTypeFromJSON,
    EvmTokenTypeFromJSONTyped,
    EvmTokenTypeToJSON,
    EvmTokenTypeToJSONTyped,
} from './EvmTokenType';

/**
 * Balance of an account for a specific runtime and EVM token.
 * @export
 * @interface RuntimeEvmBalance
 */
export interface RuntimeEvmBalance {
    /**
     * Number of tokens held, in base units.
     * @type {string}
     * @memberof RuntimeEvmBalance
     */
    balance: string;
    /**
     * The Oasis address of this token's contract.
     * @type {string}
     * @memberof RuntimeEvmBalance
     */
    token_contract_addr: string;
    /**
     * The EVM address of this token's contract.
     * @type {string}
     * @memberof RuntimeEvmBalance
     */
    token_contract_addr_eth: string;
    /**
     * The token ticker symbol. Not guaranteed to be unique across distinct EVM tokens.
     * @type {string}
     * @memberof RuntimeEvmBalance
     */
    token_symbol?: string;
    /**
     * The name of the token. Not guaranteed to be unique across distinct EVM tokens.
     * @type {string}
     * @memberof RuntimeEvmBalance
     */
    token_name?: string;
    /**
     * 
     * @type {EvmTokenType}
     * @memberof RuntimeEvmBalance
     */
    token_type: EvmTokenType;
    /**
     * The number of decimals of precision for this token.
     * @type {number}
     * @memberof RuntimeEvmBalance
     */
    token_decimals: number;
}



/**
 * Check if a given object implements the RuntimeEvmBalance interface.
 */
export function instanceOfRuntimeEvmBalance(value: object): value is RuntimeEvmBalance {
    if (!('balance' in value) || value['balance'] === undefined) return false;
    if (!('token_contract_addr' in value) || value['token_contract_addr'] === undefined) return false;
    if (!('token_contract_addr_eth' in value) || value['token_contract_addr_eth'] === undefined) return false;
    if (!('token_type' in value) || value['token_type'] === undefined) return false;
    if (!('token_decimals' in value) || value['token_decimals'] === undefined) return false;
    return true;
}

export function RuntimeEvmBalanceFromJSON(json: any): RuntimeEvmBalance {
    return RuntimeEvmBalanceFromJSONTyped(json, false);
}

export function RuntimeEvmBalanceFromJSONTyped(json: any, ignoreDiscriminator: boolean): RuntimeEvmBalance {
    if (json == null) {
        return json;
    }
    return {
        
        'balance': json['balance'],
        'token_contract_addr': json['token_contract_addr'],
        'token_contract_addr_eth': json['token_contract_addr_eth'],
        'token_symbol': json['token_symbol'] == null ? undefined : json['token_symbol'],
        'token_name': json['token_name'] == null ? undefined : json['token_name'],
        'token_type': EvmTokenTypeFromJSON(json['token_type']),
        'token_decimals': json['token_decimals'],
    };
}

export function RuntimeEvmBalanceToJSON(json: any): RuntimeEvmBalance {
    return RuntimeEvmBalanceToJSONTyped(json, false);
}

export function RuntimeEvmBalanceToJSONTyped(value?: RuntimeEvmBalance | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'balance': value['balance'],
        'token_contract_addr': value['token_contract_addr'],
        'token_contract_addr_eth': value['token_contract_addr_eth'],
        'token_symbol': value['token_symbol'],
        'token_name': value['token_name'],
        'token_type': EvmTokenTypeToJSON(value['token_type']),
        'token_decimals': value['token_decimals'],
    };
}

