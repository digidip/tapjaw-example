import { injectable } from 'inversify';
import { TapjawError, TapjawConnector, TapjawMetadata } from 'tapjaw-importer';
import TapjawExampleConnector, { TapjawExampleResponse } from '../contracts/connectors/tapjaw-example-connector';

@TapjawMetadata.Connector.Decode(TapjawConnector.TapjawHttpConnectorCharSet.UTF8)
@TapjawMetadata.Connector.Encode(TapjawConnector.TapjawHttpConnectorCharSet.UTF8)
@TapjawMetadata.Connector.Host('tapjaw.free.beeceptor.com')
@TapjawMetadata.Connector.Protocol(TapjawConnector.TapjawHttpConnectorProtocol.HTTPS)
@injectable()
export default class TapjawExampleHttpConnector
    extends TapjawConnector.TapjawDefaultConnector
    implements TapjawExampleConnector
{
    public async getNames(): Promise<TapjawExampleResponse[]> {
        try {
            const response = (await this.get('/example', {})) as string;
            return JSON.parse(response) as TapjawExampleResponse[];
        } catch (error) {
            throw new TapjawError.TapjawConnectorError(error, this);
        }
    }
}
