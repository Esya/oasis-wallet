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


/**
 * The state of the proposal.
 * @export
 */
export const ProposalState = {
    Active: 'active',
    Passed: 'passed',
    Failed: 'failed',
    Rejected: 'rejected'
} as const;
export type ProposalState = typeof ProposalState[keyof typeof ProposalState];


export function instanceOfProposalState(value: any): boolean {
    for (const key in ProposalState) {
        if (Object.prototype.hasOwnProperty.call(ProposalState, key)) {
            if (ProposalState[key as keyof typeof ProposalState] === value) {
                return true;
            }
        }
    }
    return false;
}

export function ProposalStateFromJSON(json: any): ProposalState {
    return ProposalStateFromJSONTyped(json, false);
}

export function ProposalStateFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProposalState {
    return json as ProposalState;
}

export function ProposalStateToJSON(value?: ProposalState | null): any {
    return value as any;
}

export function ProposalStateToJSONTyped(value: any, ignoreDiscriminator: boolean): ProposalState {
    return value as ProposalState;
}

