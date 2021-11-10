import { TapjawMessage } from 'tapjaw-importer';

export interface TapjawExampleResponse extends TapjawMessage.TapjawPayload {
    name: string;
}

export default interface TapjawExampleConnector {
    getNames(): Promise<TapjawExampleResponse[]>;
}
