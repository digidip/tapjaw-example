import { Container, interfaces } from 'inversify';
import { TapjawIterator } from 'tapjaw-importer';
import { Configs, Iterators, ThirdParty } from './types';

export default (mmtContainer: Container): void => {
    const { RateLimitedStdout } = Iterators;
    const { StdoutStream } = ThirdParty;
    const { RateLimitedStdout: ConfgRateLimitedStdout } = Configs;

    mmtContainer
        .bind<TapjawIterator.RateLimitedStdoutIterator>(RateLimitedStdout)
        .toDynamicValue((context: interfaces.Context) => {
            return new TapjawIterator.RateLimitedStdoutIterator(
                context.container.get<NodeJS.WritableStream>(StdoutStream),
                context.container.get<number>(ConfgRateLimitedStdout.PipedMessagesPerMinute)
            );
        });
};
