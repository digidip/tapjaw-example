import { Container } from 'inversify';
import TapjawExampleHttpConnector from '../connectors/tapjaw-example-http-connector';
import TapjawExampleConnector from '../contracts/connectors/tapjaw-example-connector';
import { Connectors } from './types';

export default (mmtContainer: Container): void => {
    const { TapjawExampleConnector } = Connectors;

    mmtContainer.bind<TapjawExampleConnector>(TapjawExampleConnector).to(TapjawExampleHttpConnector);
};
