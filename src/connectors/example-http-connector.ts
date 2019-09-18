import { TapjawHttpConnector } from 'tapjaw-importer';
import { TapjawConnectorResponse } from 'tapjaw-importer/lib/contracts/tapjaw-connector';

export type AnimalObject = { type: string; };

export interface ExampleResponse extends TapjawConnectorResponse {
    data: AnimalObject[];
}

export default class ExampleHttpConnector extends TapjawHttpConnector {
    enableGzip = false;
    useDecoding = undefined;
    useEncoding = undefined;

    constructor() {
        super('127.0.0.1', 2019, false);
    }

    public async getAnimals(): Promise<ExampleResponse> {
        return new Promise(async (resolve, reject) => {
            // tslint:disable no-console
            console.log('get Animals');

            const result = await this.get('/animals', {}).catch(reject) as string;
            if (result) {
                resolve(JSON.parse(result) as ExampleResponse);
            } else {
                reject('No results');
            }
        });
    }

    public async postAnimals(): Promise<ExampleResponse> {
        return new Promise(async (resolve, reject) => {
            // tslint:disable no-console
            console.log('post Animals');

            const result = await this.post('/animals', {}, { sample: 'show' }).catch(reject) as string;
            if (result) {
                resolve(JSON.parse(result) as ExampleResponse);
            } else {
                reject('No results');
            }
        });
    }
}
