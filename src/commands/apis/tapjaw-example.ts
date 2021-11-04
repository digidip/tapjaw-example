import { TapjawAdapterCallback } from 'tapjaw-importer/lib/contracts/tapjaw-adapter';
import { TapjawCommandArgs } from 'tapjaw-importer/lib/contracts/tapjaw-command';
import commander from 'commander';
import displayExample from '../../modules/commander/display-example';
import { Adapters } from '../../dependency-injection/types';
import mmtContainer from '../../dependency-injection';
import TapjawExampleAdapter from '../../adapters/tapjaw-example-adapter';
import ExampleTapjawMessage from '../../contracts/messages/example-tapjaw-message';
import TapjawApiCommand from 'tapjaw-importer/lib/contracts/commands/tapjaw-api-command';
import BaseCommandFlags from '../../contracts/base-command-flags';

interface TapjawExampleOptions extends BaseCommandFlags {
    limit: string;
}

export default class TapjawExample extends TapjawApiCommand {
    constructor(protected readonly adapter: TapjawExampleAdapter) {
        super();
    }

    public static register(program: commander.Command): void {
        program
            .command(`tapjaw-example`)
            .description('TapjawExample API Command')
            .storeOptionsAsProperties(false)
            .requiredOption('-i, --import-id <importId>', 'The unique Import ID')
            .option('-l, --limit', 'Limit the number of messages emitted to STDOUT')
            .on('--help', () => displayExample('$ bin/importer apis TapjawExample AW AWDE 2020-01-01 2020-01-30'))
            .action(async (options: TapjawExampleOptions) => {
                try {
                    await new TapjawExample(mmtContainer.get<TapjawExampleAdapter>(Adapters.TapjawExampleAdapter)).run(
                        {},
                        options
                    );
                } catch (error) {
                    TapjawExample.getLogger().error(String(error));
                }
            });
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
