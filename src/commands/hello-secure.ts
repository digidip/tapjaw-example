import { TapjawCommand, StdoutIterator, TapjawApplyAuthorizationHttpHeaderWrapper, TapjawBasicAuthenticator } from 'tapjaw-importer';
import ExampleAdapter, { AnimalMessage } from '../adapters/example-adapter';
import { TapjawCommandArgs, TapjawCommandFlags } from 'tapjaw-importer/lib/contracts/tapjaw-command';
import ExampleHttpConnector from '../connectors/example-http-connector';
import { TapjawAdapterCallback } from 'tapjaw-importer/lib/contracts/tapjaw-adapter';

export default class HelloSecure extends TapjawCommand {
    /**
     * Description of the command
     */
    static description = 'Example of the Tapjaw Command (Using basic authentication, user/pass: "test")';

    /**
     * Examples of the usage
     */
    static examples = [
        `$ bin/run hello-secure test test
$ bin/run hello-secure test test --limit=1
`,
    ];

    /**
     * The --flags available in this command, you must always implement:
     * `...TapjawCommand.defaultFlags` to get the default flags.
     */
    static flags = {
        ...TapjawCommand.defaultFlags,
    };

    /**
     * The arguments used by this command
     */
    static args = [
        {
            name: 'username',
            required: true,
            description: 'The HTTP basic authentication username.'
        },
        {
            name: 'password',
            required: true,
            description: 'The HTTP basic authentication password.'
        }
    ];

    /**
     * Provide the current class to instance so OCLIF can determine which arguments and flags exist
     * against the hello command.
     */
    instance = HelloSecure;

    /**
     * Provide an iterator on how to output the TapjawMessages which are yielded from the Adapter.
     */
    protected iterator = new StdoutIterator(process.stdout);

    /**
     * It's essential that this method returns a `async function *(): AsyncGenerator<TapjawMessage> {}` lambda function
     * which wraps the Adapter.method() call and must pipe the yield to the Iterator.
     *
     * @param args TapjawCommandArgs
     * @param flags TapjawCommandFlags
     * @yields AnimalMessage
     */
    protected getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): TapjawAdapterCallback {
        const { username, password } = args;
        const adapter = new ExampleAdapter(
            new ExampleHttpConnector(
                new TapjawApplyAuthorizationHttpHeaderWrapper(
                    new TapjawBasicAuthenticator(username, password)
                )
            )
        );
        const { post } = flags;

        // Call the Adapter method using GET.
        return async function* (): AsyncGenerator<AnimalMessage> {
            /**
             * Pipe generator yield to Iterator
             */
            yield* adapter.getSecureAnimals();
        };
    }
}
