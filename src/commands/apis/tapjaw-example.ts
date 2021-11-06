import { Adapters } from '../../dependency-injection/types';
import mmtContainer from '../../dependency-injection';
import TapjawExampleAdapter from '../../adapters/tapjaw-example-adapter';
import ExampleTapjawMessage from '../../contracts/messages/example-tapjaw-message';
import BaseCommandFlags from '../../contracts/base-command-flags';
import { TapjawAdapterCallback, TapjawCommand, TapjawCommandArgs } from 'tapjaw-importer';
import BaseApiCommand from '../../contracts/base-api-command';
import { Argument } from 'commander';

interface TapjawExampleOptions extends BaseCommandFlags {
    limit: string;
}

@TapjawCommand.Name('tapjaw-example')
@TapjawCommand.Description('TapjawExample API Command')
@TapjawCommand.Example('$ bin/importer apis tapjaw-exampe MyCaption -i uuid')
@TapjawCommand.Arguments(new Argument('caption', 'A simple caption'))
@TapjawCommand.Action(async (caption: string, options: TapjawExampleOptions): Promise<void> => {
    try {
        await new TapjawExample(mmtContainer.get<TapjawExampleAdapter>(Adapters.TapjawExampleAdapter)).run({}, options);
    } catch (error) {
        TapjawExample.getLogger().error(String(error));
    }
})
export default class TapjawExample extends BaseApiCommand {
    constructor(protected readonly adapter: TapjawExampleAdapter) {
        super();
    }

    /**
     * It's essential that this method returns a `async function *(): AsyncGenerator<TapjawMessage> {}` lambda function
     * which wraps the Adapter.method() call and must pipe the yield to the Iterator.
     *
     * @param args TapjawCommandArgs
     * @param flags TapjawCommandFlags
     * @yields AnimalMessage
     */
    protected getAdapterCallback(
        args: TapjawCommandArgs<string>,
        { importId }: TapjawExampleOptions
    ): TapjawAdapterCallback<ExampleTapjawMessage> {
        const adapter = this.adapter;

        return async function* (): AsyncGenerator<ExampleTapjawMessage> {
            yield* adapter.getMessages(importId);
        };
    }
}
