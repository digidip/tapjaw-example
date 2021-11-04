import { Container, interfaces } from 'inversify';
import { RateLimitedStdoutIterator } from 'tapjaw-importer';
import { Configs, Iterators, ThirdParty } from './types';

export default (mmtContainer: Container): void => {
    const { RateLimitedStdout } = Iterators;
    const { StdoutStream } = ThirdParty;
    const { RateLimitedStdout: ConfgRateLimitedStdout } = Configs;

    mmtContainer.bind<RateLimitedStdoutIterator>(RateLimitedStdout).toDynamicValue((context: interfaces.Context) => {
        return new RateLimitedStdoutIterator(
            context.container.get<NodeJS.WritableStream>(StdoutStream),
            context.container.get<number>(ConfgRateLimitedStdout.PipedMessagesPerMinute)
        );
    });
};
