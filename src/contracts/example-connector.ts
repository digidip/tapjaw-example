import { TapjawConnectorResponse } from 'tapjaw-importer/lib/contracts/tapjaw-connector';

/**
 * The specification of each Animal entity in the ExampleResponse.data array.
 */
export type AnimalObject = { type: string; };

/**
 * The specification of the Example Response.
 */
export interface ExampleResponse extends TapjawConnectorResponse {
    data: AnimalObject[];
}

export default interface ExampleConnector {
    getAnimals(useSecurePath: boolean): Promise<ExampleResponse>;
    postAnimals(): Promise<ExampleResponse>;
}
