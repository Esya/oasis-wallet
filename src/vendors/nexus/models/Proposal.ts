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
import type { ProposalState } from './ProposalState';
import {
    ProposalStateFromJSON,
    ProposalStateFromJSONTyped,
    ProposalStateToJSON,
    ProposalStateToJSONTyped,
} from './ProposalState';
import type { ProposalTarget } from './ProposalTarget';
import {
    ProposalTargetFromJSON,
    ProposalTargetFromJSONTyped,
    ProposalTargetToJSON,
    ProposalTargetToJSONTyped,
} from './ProposalTarget';

/**
 * A governance proposal.
 * 
 * @export
 * @interface Proposal
 */
export interface Proposal {
    /**
     * The unique identifier of the proposal.
     * @type {number}
     * @memberof Proposal
     */
    id: number;
    /**
     * The staking address of the proposal submitter.
     * @type {string}
     * @memberof Proposal
     */
    submitter: string;
    /**
     * 
     * @type {ProposalState}
     * @memberof Proposal
     */
    state: ProposalState;
    /**
     * The deposit attached to this proposal.
     * @type {string}
     * @memberof Proposal
     */
    deposit: string;
    /**
     * The (optional) title of the proposal.
     * @type {string}
     * @memberof Proposal
     */
    title?: string;
    /**
     * The (optional) description of the proposal.
     * @type {string}
     * @memberof Proposal
     */
    description?: string;
    /**
     * The name of the upgrade handler.
     * @type {string}
     * @memberof Proposal
     */
    handler?: string;
    /**
     * 
     * @type {ProposalTarget}
     * @memberof Proposal
     */
    target?: ProposalTarget;
    /**
     * The epoch at which the proposed upgrade will happen.
     * @type {number}
     * @memberof Proposal
     */
    epoch?: number;
    /**
     * The proposal to cancel, if this proposal proposes
     * cancelling an existing proposal.
     * 
     * @type {number}
     * @memberof Proposal
     */
    cancels?: number;
    /**
     * The name of the module whose parameters are to be changed
     * by this 'parameters_change' proposal.
     * 
     * @type {string}
     * @memberof Proposal
     */
    parameters_change_module?: string;
    /**
     * The parameters change proposal body. This spec does not encode the many possible types; instead, see [the Go API](https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go) of oasis-core. This object will conform to one of the `ConsensusParameterChanges` types, depending on the `parameters_change_module`.
     * @type {any}
     * @memberof Proposal
     */
    parameters_change?: any | null;
    /**
     * The epoch at which this proposal was created.
     * @type {number}
     * @memberof Proposal
     */
    created_at: number;
    /**
     * The epoch at which voting for this proposal will close.
     * @type {number}
     * @memberof Proposal
     */
    closes_at: number;
    /**
     * The number of invalid votes for this proposal, after tallying.
     * 
     * @type {string}
     * @memberof Proposal
     */
    invalid_votes: string;
}



/**
 * Check if a given object implements the Proposal interface.
 */
export function instanceOfProposal(value: object): value is Proposal {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('submitter' in value) || value['submitter'] === undefined) return false;
    if (!('state' in value) || value['state'] === undefined) return false;
    if (!('deposit' in value) || value['deposit'] === undefined) return false;
    if (!('created_at' in value) || value['created_at'] === undefined) return false;
    if (!('closes_at' in value) || value['closes_at'] === undefined) return false;
    if (!('invalid_votes' in value) || value['invalid_votes'] === undefined) return false;
    return true;
}

export function ProposalFromJSON(json: any): Proposal {
    return ProposalFromJSONTyped(json, false);
}

export function ProposalFromJSONTyped(json: any, ignoreDiscriminator: boolean): Proposal {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'submitter': json['submitter'],
        'state': ProposalStateFromJSON(json['state']),
        'deposit': json['deposit'],
        'title': json['title'] == null ? undefined : json['title'],
        'description': json['description'] == null ? undefined : json['description'],
        'handler': json['handler'] == null ? undefined : json['handler'],
        'target': json['target'] == null ? undefined : ProposalTargetFromJSON(json['target']),
        'epoch': json['epoch'] == null ? undefined : json['epoch'],
        'cancels': json['cancels'] == null ? undefined : json['cancels'],
        'parameters_change_module': json['parameters_change_module'] == null ? undefined : json['parameters_change_module'],
        'parameters_change': json['parameters_change'] == null ? undefined : json['parameters_change'],
        'created_at': json['created_at'],
        'closes_at': json['closes_at'],
        'invalid_votes': json['invalid_votes'],
    };
}

export function ProposalToJSON(json: any): Proposal {
    return ProposalToJSONTyped(json, false);
}

export function ProposalToJSONTyped(value?: Proposal | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'submitter': value['submitter'],
        'state': ProposalStateToJSON(value['state']),
        'deposit': value['deposit'],
        'title': value['title'],
        'description': value['description'],
        'handler': value['handler'],
        'target': ProposalTargetToJSON(value['target']),
        'epoch': value['epoch'],
        'cancels': value['cancels'],
        'parameters_change_module': value['parameters_change_module'],
        'parameters_change': value['parameters_change'],
        'created_at': value['created_at'],
        'closes_at': value['closes_at'],
        'invalid_votes': value['invalid_votes'],
    };
}

