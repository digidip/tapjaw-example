/**
 * The specification of each Animal entity in the ExampleResponse.data array.
 */
export type AnimalObject = { type: string; };

/**
 * The specification of the Example Response.
 */
export interface ExampleResponse {
    data: AnimalObject[];
}

export default interface ExampleConnector {
    getAnimals(useSecurePath: boolean): Promise<ExampleResponse>;
    postAnimals(): Promise<ExampleResponse>;
}
