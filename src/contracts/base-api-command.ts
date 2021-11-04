import { RateLimitedStdoutIterator, TapjawApiCommand } from 'tapjaw-importer';
import commander from 'commander';
import mmtContainer from '../dependency-injection';
import { Iterators } from '../dependency-injection/types';

export default abstract class BaseApiCommand extends TapjawApiCommand {
    constructor() {
        super(mmtContainer.get<RateLimitedStdoutIterator>(Iterators.RateLimitedStdout));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static register(program: commander.Command): void {
        throw new Error('static register() method not overloaded.');
    }
}
