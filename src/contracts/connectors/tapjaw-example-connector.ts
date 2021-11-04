import { TapjawPayload } from 'tapjaw-importer';

export interface TapjawExampleResponse extends TapjawPayload {
    name: string;
}

export default interface TapjawExampleConnector {
    getNames(): Promise<TapjawExampleResponse[]>;
}
