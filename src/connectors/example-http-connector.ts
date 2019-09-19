import { TapjawHttpConnector } from 'tapjaw-importer';
import { TapjawConnectorResponse } from 'tapjaw-importer/lib/contracts/tapjaw-connector';
import TapjawAuthenticationWrapper from 'tapjaw-importer/lib/contracts/tapjaw-authentication-wrapper';

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

/**
 * A basic HTTP connector implementation of the example-api.ts webserver.
 */
export default class ExampleHttpConnector extends TapjawHttpConnector {
    /**
     * Disable gzip usage
     */
    enableGzip = false;

    /**
     * Disable any decoding of the API response.
     */
    useDecoding = undefined;

    /**
     * Disable any encoding on ExampleResponse.
     */
    useEncoding = undefined;

    constructor(security?: TapjawAuthenticationWrapper) {
        /**
         * Setup the TapjawHttpConnector's basic requirements.
         *
         * (host, port, https)
         */
        super('127.0.0.1', 2019, false, security);
    }

    /**
     * An example of a GET request to the API /animals endpoint.
     */
    public async getAnimals(useSecurePath = false): Promise<ExampleResponse> {
        return new Promise(async (resolve, reject) => {
            // tslint:disable no-console
            console.log(`get Animals${useSecurePath ? ' (secure call)' : ''}`);

            const result = await this.get(useSecurePath ? '/secure-animals' : '/animals', {}).catch(reject) as string;
            if (result) {
                resolve(JSON.parse(result) as ExampleResponse); // JSON decode raw response into an object of ExampleResponse.
            } else {
                reject('No results');
            }
        });
    }

    /**
     * An example of a POST request to the API /animals endpoint.
     */
    public async postAnimals(): Promise<ExampleResponse> {
        return new Promise(async (resolve, reject) => {
            // tslint:disable no-console
            console.log('post Animals');

            const result = await this.post('/animals', {}, { sample: 'show' }).catch(reject) as string;
            if (result) {
                resolve(JSON.parse(result) as ExampleResponse); // JSON decode raw response into an object of ExampleResponse.
            } else {
                reject('No results');
            }
        });
    }
}
