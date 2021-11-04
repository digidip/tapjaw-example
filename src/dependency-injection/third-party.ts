import { Container } from 'inversify';
import { ThirdParty } from './types';

export default (mmtContainer: Container): void => {
    const { StdoutStream } = ThirdParty;

    mmtContainer.bind<NodeJS.WritableStream>(StdoutStream).toConstantValue(process.stdout);
};
