import { TapjawCommand, TapjawIterator } from 'tapjaw-importer';
import mmtContainer from '../dependency-injection';
import { Iterators } from '../dependency-injection/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionArgs = any[];

export type CommandAction = (...args: ActionArgs) => void | Promise<void>;

export default abstract class BaseApiCommand extends TapjawCommand.TapjawApiCommand {
    constructor() {
        super(mmtContainer.get<TapjawIterator.RateLimitedStdoutIterator>(Iterators.RateLimitedStdout));
    }
}
