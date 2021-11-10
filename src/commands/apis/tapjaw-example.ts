import { Adapters } from '../../dependency-injection/types';
import mmtContainer from '../../dependency-injection';
import TapjawExampleAdapter from '../../adapters/tapjaw-example-adapter';
import ExampleTapjawMessage from '../../contracts/messages/example-tapjaw-message';
import BaseCommandFlags from '../../contracts/base-command-flags';
import { TapjawCommand, TapjawContract, TapjawMetadata } from 'tapjaw-importer'; // TapjawAdapterCallback, TapjawCommandArgs,
import BaseApiCommand from '../../contracts/base-api-command';

interface TapjawExampleOptions extends BaseCommandFlags {
    limit: string;
}

@TapjawMetadata.Command.Name('tapjaw-example')
@TapjawMetadata.Command.Description('TapjawExample API Command')
@TapjawMetadata.Command.Example('$ bin/importer apis tapjaw-example MyCaption -i uuid')
@TapjawMetadata.Command.Action(async (options: TapjawExampleOptions): Promise<void> => {
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
        args: TapjawCommand.TapjawCommandArgs<string>,
        { importId }: TapjawExampleOptions
    ): TapjawContract.TapjawAdapterCallback<ExampleTapjawMessage> {
        const adapter = this.adapter;

        return async function* (): AsyncGenerator<ExampleTapjawMessage> {
            yield* adapter.getMessages(importId);
        };
    }
}
