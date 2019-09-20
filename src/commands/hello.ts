import { TapjawCommand } from 'tapjaw-importer';
import ExampleAdapter, { AnimalMessage } from '../adapters/example-adapter';
import { TapjawCommandArgs, TapjawCommandFlags } from 'tapjaw-importer/lib/contracts/tapjaw-command';
import ExampleHttpConnector from '../connectors/example-http-connector';
import { flags } from '@oclif/command';
import { TapjawAdapterCallback } from 'tapjaw-importer/lib/contracts/tapjaw-adapter';

export default class Hello extends TapjawCommand {
    /**
     * Description of the command
     */
    static description = 'Example of the Tapjaw Command';

    /**
     * Examples of the usage
     */
    static examples = [
        `$ bin/run hello
$ bin/run hello --limit=1
$ bin/run hello --post
`,
    ];

    /**
     * The --flags available in this command, you must always implement:
     * `...TapjawCommand.defaultFlags` to get the default flags.
     */
    static flags = {
        ...TapjawCommand.defaultFlags,
        post: flags.boolean({ char: 'p', description: 'Use POST method in adapter.', default: false }),
    };

    /**
     * The arguments used by this command
     */
    static args = [];

    /**
     * Provide the current class to instance so OCLIF can determine which arguments and flags exist
     * against the hello command.
     */
    instance = Hello;

    /**
     * Provide your Adapter implementation which is to be used with this command.
     */
    protected adapter = new ExampleAdapter(new ExampleHttpConnector());

    /**
     * It's essential that this method returns a `async function *(): AsyncGenerator<TapjawMessage> {}` lambda function
     * which wraps the Adapter.method() call and must pipe the yield to the Iterator.
     *
     * @param args TapjawCommandArgs
     * @param flags TapjawCommandFlags
     * @yields AnimalMessage
     */
    protected getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): TapjawAdapterCallback {
        const adapter = this.adapter;
        const { post } = flags;

        if (post) {
            // Call the Adapter method using POST.
            return async function* (): AsyncGenerator<AnimalMessage> {
                /**
                 * Pipe generator yield to Iterator
                 */
                yield* adapter.getAnimals(true);
            };
        }

        // Call the Adapter method using GET.
        return async function* (): AsyncGenerator<AnimalMessage> {
            /**
             * Pipe generator yield to Iterator
             */
            yield* adapter.getAnimals();
        };
    }
}
