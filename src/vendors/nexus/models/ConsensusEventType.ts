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
 * 
 * @export
 */
export const ConsensusEventType = {
    GovernanceProposalExecuted: 'governance.proposal_executed',
    GovernanceProposalFinalized: 'governance.proposal_finalized',
    GovernanceProposalSubmitted: 'governance.proposal_submitted',
    GovernanceVote: 'governance.vote',
    RegistryEntity: 'registry.entity',
    RegistryNodeUnfrozen: 'registry.node_unfrozen',
    RegistryNode: 'registry.node',
    RegistryRuntime: 'registry.runtime',
    RegistryRuntimeSuspended: 'registry.runtime_suspended',
    RoothashExecutionDiscrepancy: 'roothash.execution_discrepancy',
    RoothashExecutorCommitted: 'roothash.executor_committed',
    RoothashFinalized: 'roothash.finalized',
    RoothashMessage: 'roothash.message',
    RoothashInMsgProcessed: 'roothash.in_msg_processed',
    StakingAllowanceChange: 'staking.allowance_change',
    StakingBurn: 'staking.burn',
    StakingEscrowAdd: 'staking.escrow.add',
    StakingEscrowDebondingStart: 'staking.escrow.debonding_start',
    StakingEscrowReclaim: 'staking.escrow.reclaim',
    StakingEscrowTake: 'staking.escrow.take',
    StakingTransfer: 'staking.transfer'
} as const;
export type ConsensusEventType = typeof ConsensusEventType[keyof typeof ConsensusEventType];


export function instanceOfConsensusEventType(value: any): boolean {
    for (const key in ConsensusEventType) {
        if (Object.prototype.hasOwnProperty.call(ConsensusEventType, key)) {
            if (ConsensusEventType[key as keyof typeof ConsensusEventType] === value) {
                return true;
            }
        }
    }
    return false;
}

export function ConsensusEventTypeFromJSON(json: any): ConsensusEventType {
    return ConsensusEventTypeFromJSONTyped(json, false);
}

export function ConsensusEventTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConsensusEventType {
    return json as ConsensusEventType;
}

export function ConsensusEventTypeToJSON(value?: ConsensusEventType | null): any {
    return value as any;
}

export function ConsensusEventTypeToJSONTyped(value: any, ignoreDiscriminator: boolean): ConsensusEventType {
    return value as ConsensusEventType;
}

