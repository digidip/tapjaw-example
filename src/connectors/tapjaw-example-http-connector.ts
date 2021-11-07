import { injectable } from 'inversify';
import { ConnectorError, TapjawDefaultConnector, TapjawMetadata } from 'tapjaw-importer';
import {
    TapjawHttpConnectorCharSet,
    TapjawHttpConnectorProtocol,
} from 'tapjaw-importer/lib/connectors/tapjaw-http-connector';
import TapjawExampleConnector, { TapjawExampleResponse } from '../contracts/connectors/tapjaw-example-connector';

@TapjawMetadata.Connector.Decode(TapjawHttpConnectorCharSet.UTF8)
@TapjawMetadata.Connector.Encode(TapjawHttpConnectorCharSet.UTF8)
@TapjawMetadata.Connector.Host('tapjaw.free.beeceptor.com')
@TapjawMetadata.Connector.Protocol(TapjawHttpConnectorProtocol.HTTPS)
@injectable()
export default class TapjawExampleHttpConnector extends TapjawDefaultConnector implements TapjawExampleConnector {
    public async getNames(): Promise<TapjawExampleResponse[]> {
        try {
            const response = (await this.get('/example', {})) as string;
            return JSON.parse(response) as TapjawExampleResponse[];
        } catch (error) {
            throw new ConnectorError(error, this);
        }
    }
}
