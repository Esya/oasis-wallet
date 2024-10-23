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


import * as runtime from '../runtime';
import {
    ChainBlockInfoResponse,
    ChainBlockInfoResponseFromJSON,
    ChainBlockInfoResponseToJSON,
    ChainBlocksResponse,
    ChainBlocksResponseFromJSON,
    ChainBlocksResponseToJSON,
    ChainMethodsResponse,
    ChainMethodsResponseFromJSON,
    ChainMethodsResponseToJSON,
    ChainProposedBlocksResponse,
    ChainProposedBlocksResponseFromJSON,
    ChainProposedBlocksResponseToJSON,
    ChainSearchResponse,
    ChainSearchResponseFromJSON,
    ChainSearchResponseToJSON,
    ChainTransactionInfoResponse,
    ChainTransactionInfoResponseFromJSON,
    ChainTransactionInfoResponseToJSON,
    ChainTransactionsResponse,
    ChainTransactionsResponseFromJSON,
    ChainTransactionsResponseToJSON,
} from '../models';

export interface ChainBlockInfoHandlerRequest {
    height: string;
}

export interface ChainBlocksHandlerRequest {
    page: number;
    size: number;
}

export interface ChainProposedBlocksHandlerRequest {
    page: number;
    size: number;
    address?: string;
}

export interface ChainSearchHandlerRequest {
    key: string;
}

export interface ChainTransactionInfoHandlerRequest {
    hash: string;
}

export interface ChainTransactionsHandlerRequest {
    runtime: boolean;
    page: number;
    size: number;
    height?: number;
    address?: string;
    method?: string;
}

/**
 * 
 */
export class ChainApi extends runtime.BaseAPI {

    /**
     */
    async chainBlockInfoHandlerRaw(requestParameters: ChainBlockInfoHandlerRequest): Promise<runtime.ApiResponse<ChainBlockInfoResponse>> {
        if (requestParameters.height === null || requestParameters.height === undefined) {
            throw new runtime.RequiredError('height','Required parameter requestParameters.height was null or undefined when calling chainBlockInfoHandler.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/chain/block/{height}`.replace(`{${"height"}}`, encodeURIComponent(String(requestParameters.height))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainBlockInfoResponseFromJSON(jsonValue));
    }

    /**
     */
    async chainBlockInfoHandler(requestParameters: ChainBlockInfoHandlerRequest): Promise<ChainBlockInfoResponse> {
        const response = await this.chainBlockInfoHandlerRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async chainBlocksHandlerRaw(requestParameters: ChainBlocksHandlerRequest): Promise<runtime.ApiResponse<ChainBlocksResponse>> {
        if (requestParameters.page === null || requestParameters.page === undefined) {
            throw new runtime.RequiredError('page','Required parameter requestParameters.page was null or undefined when calling chainBlocksHandler.');
        }

        if (requestParameters.size === null || requestParameters.size === undefined) {
            throw new runtime.RequiredError('size','Required parameter requestParameters.size was null or undefined when calling chainBlocksHandler.');
        }

        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/chain/blocks`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainBlocksResponseFromJSON(jsonValue));
    }

    /**
     */
    async chainBlocksHandler(requestParameters: ChainBlocksHandlerRequest): Promise<ChainBlocksResponse> {
        const response = await this.chainBlocksHandlerRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async chainMethodsHandlerRaw(): Promise<runtime.ApiResponse<ChainMethodsResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/chain/methods`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainMethodsResponseFromJSON(jsonValue));
    }

    /**
     */
    async chainMethodsHandler(): Promise<ChainMethodsResponse> {
        const response = await this.chainMethodsHandlerRaw();
        return await response.value();
    }

    /**
     */
    async chainProposedBlocksHandlerRaw(requestParameters: ChainProposedBlocksHandlerRequest): Promise<runtime.ApiResponse<ChainProposedBlocksResponse>> {
        if (requestParameters.page === null || requestParameters.page === undefined) {
            throw new runtime.RequiredError('page','Required parameter requestParameters.page was null or undefined when calling chainProposedBlocksHandler.');
        }

        if (requestParameters.size === null || requestParameters.size === undefined) {
            throw new runtime.RequiredError('size','Required parameter requestParameters.size was null or undefined when calling chainProposedBlocksHandler.');
        }

        const queryParameters: any = {};

        if (requestParameters.address !== undefined) {
            queryParameters['address'] = requestParameters.address;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/chain/proposedblocks`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainProposedBlocksResponseFromJSON(jsonValue));
    }

    /**
     */
    async chainProposedBlocksHandler(requestParameters: ChainProposedBlocksHandlerRequest): Promise<ChainProposedBlocksResponse> {
        const response = await this.chainProposedBlocksHandlerRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async chainSearchHandlerRaw(requestParameters: ChainSearchHandlerRequest): Promise<runtime.ApiResponse<ChainSearchResponse>> {
        if (requestParameters.key === null || requestParameters.key === undefined) {
            throw new runtime.RequiredError('key','Required parameter requestParameters.key was null or undefined when calling chainSearchHandler.');
        }

        const queryParameters: any = {};

        if (requestParameters.key !== undefined) {
            queryParameters['key'] = requestParameters.key;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/chain/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainSearchResponseFromJSON(jsonValue));
    }

    /**
     */
    async chainSearchHandler(requestParameters: ChainSearchHandlerRequest): Promise<ChainSearchResponse> {
        const response = await this.chainSearchHandlerRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async chainTransactionInfoHandlerRaw(requestParameters: ChainTransactionInfoHandlerRequest): Promise<runtime.ApiResponse<ChainTransactionInfoResponse>> {
        if (requestParameters.hash === null || requestParameters.hash === undefined) {
            throw new runtime.RequiredError('hash','Required parameter requestParameters.hash was null or undefined when calling chainTransactionInfoHandler.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/chain/transaction/{hash}`.replace(`{${"hash"}}`, encodeURIComponent(String(requestParameters.hash))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainTransactionInfoResponseFromJSON(jsonValue));
    }

    /**
     */
    async chainTransactionInfoHandler(requestParameters: ChainTransactionInfoHandlerRequest): Promise<ChainTransactionInfoResponse> {
        const response = await this.chainTransactionInfoHandlerRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async chainTransactionsHandlerRaw(requestParameters: ChainTransactionsHandlerRequest): Promise<runtime.ApiResponse<ChainTransactionsResponse>> {
        if (requestParameters.runtime === null || requestParameters.runtime === undefined) {
            throw new runtime.RequiredError('runtime','Required parameter requestParameters.runtime was null or undefined when calling chainTransactionsHandler.');
        }

        if (requestParameters.page === null || requestParameters.page === undefined) {
            throw new runtime.RequiredError('page','Required parameter requestParameters.page was null or undefined when calling chainTransactionsHandler.');
        }

        if (requestParameters.size === null || requestParameters.size === undefined) {
            throw new runtime.RequiredError('size','Required parameter requestParameters.size was null or undefined when calling chainTransactionsHandler.');
        }

        const queryParameters: any = {};

        if (requestParameters.height !== undefined) {
            queryParameters['height'] = requestParameters.height;
        }

        if (requestParameters.address !== undefined) {
            queryParameters['address'] = requestParameters.address;
        }

        if (requestParameters.method !== undefined) {
            queryParameters['method'] = requestParameters.method;
        }

        if (requestParameters.runtime !== undefined) {
            queryParameters['runtime'] = requestParameters.runtime;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/chain/transactions`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainTransactionsResponseFromJSON(jsonValue));
    }

    /**
     */
    async chainTransactionsHandler(requestParameters: ChainTransactionsHandlerRequest): Promise<ChainTransactionsResponse> {
        const response = await this.chainTransactionsHandlerRaw(requestParameters);
        return await response.value();
    }

}