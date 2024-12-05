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
 * A decoded parameter of an event or error emitted from an EVM runtime.
 * Values of EVM type `int128`, `uint128`, `int256`, `uint256`, `fixed`, and `ufixed` are represented as strings.
 * Values of EVM type `address` and `address payable` are represented as lowercase hex strings with a "0x" prefix.
 * Values of EVM type `bytes` and `bytes<N>` are represented as base64 strings.
 * Values of other EVM types (integer types, strings, arrays, etc.) are represented as their JSON counterpart.
 * 
 * @export
 * @interface EvmAbiParam
 */
export interface EvmAbiParam {
    /**
     * The parameter name.
     * @type {string}
     * @memberof EvmAbiParam
     */
    name: string;
    /**
     * The solidity type of the parameter.
     * @type {string}
     * @memberof EvmAbiParam
     */
    evm_type: string;
    /**
     * The parameter value.
     * @type {any}
     * @memberof EvmAbiParam
     */
    value: any | null;
}

/**
 * Check if a given object implements the EvmAbiParam interface.
 */
export function instanceOfEvmAbiParam(value: object): value is EvmAbiParam {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('evm_type' in value) || value['evm_type'] === undefined) return false;
    if (!('value' in value) || value['value'] === undefined) return false;
    return true;
}

export function EvmAbiParamFromJSON(json: any): EvmAbiParam {
    return EvmAbiParamFromJSONTyped(json, false);
}

export function EvmAbiParamFromJSONTyped(json: any, ignoreDiscriminator: boolean): EvmAbiParam {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'evm_type': json['evm_type'],
        'value': json['value'],
    };
}

export function EvmAbiParamToJSON(json: any): EvmAbiParam {
    return EvmAbiParamToJSONTyped(json, false);
}

export function EvmAbiParamToJSONTyped(value?: EvmAbiParam | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'evm_type': value['evm_type'],
        'value': value['value'],
    };
}

