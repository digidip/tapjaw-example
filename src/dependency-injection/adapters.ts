import { Container } from 'inversify';
import TapjawExampleAdapter from '../adapters/tapjaw-example-adapter';
import { Adapters } from './types';

export default (mmtContainer: Container): void => {
    const { TapjawExampleAdapter: TapjawExample } = Adapters;

    mmtContainer.bind<TapjawExampleAdapter>(TapjawExample).to(TapjawExampleAdapter);
};
