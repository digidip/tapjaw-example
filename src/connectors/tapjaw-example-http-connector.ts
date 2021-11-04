import { injectable } from 'inversify';
import { ConnectorError, TapjawHttpConnector } from 'tapjaw-importer';
import TapjawExampleConnector, { TapjawExampleResponse } from '../contracts/connectors/tapjaw-example-connector';

@injectable()
export default class TapjawExmpleHttpConnector extends TapjawHttpConnector implements TapjawExampleConnector {
    enableGzip = false;
    useDecoding?: string | undefined;
    useEncoding?: string | undefined;

    constructor() {
        super('tapjaw.free.beeceptor.com', undefined, true);
    }

    public async getNames(): Promise<TapjawExampleResponse[]> {
        try {
            const response = (await this.get('/example', {})) as string;
            return JSON.parse(response) as TapjawExampleResponse[];
        } catch (error) {
            throw new ConnectorError(error, this);
        }
    }
}
