import { Container } from 'inversify';
import { Configs } from './types';

export default (mmtContainer: Container): void => {
    const { RateLimitedStdout } = Configs;

    mmtContainer.bind<number>(RateLimitedStdout.PipedMessagesPerMinute).toConstantValue(3500);
};
