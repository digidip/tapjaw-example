import { TapjawCommand, StdoutIterator } from 'tapjaw-importer';
import ExampleAdapter, { MooMessage } from '../adapters/example-adapter';
import { TapjawCommandArgs, TapjawCommandFlags } from 'tapjaw-importer/lib/contracts/tapjaw-command';
import ExampleHttpConnector from '../connectors/example-http-connector';
import { flags } from '@oclif/command';

export default class Hello extends TapjawCommand {
    static description = 'Example of the Tapjaw Command';
    static examples = [
        '$ example hello\n',
    ];

    static flags = {
        ...TapjawCommand.defaultFlags,
        post: flags.boolean({ char: 'p', description: 'Use POST method in adapter.', default: false }),
    };

    static args = [];

    instance = Hello;
    protected adapter = new ExampleAdapter(new ExampleHttpConnector());
    protected iterator = new StdoutIterator(process.stdout);

    protected getAdapterCallback(args: TapjawCommandArgs, flags: TapjawCommandFlags): CallableFunction {
        const adapter = this.adapter;
        const { post } = flags;

        if (post) {
            return async function* (): AsyncGenerator<MooMessage> {
                yield* adapter.getAnimals(true); // Call the Adapter method using POST.
            };
        }

        return async function* (): AsyncGenerator<MooMessage> {
            yield* adapter.getAnimals(); // Call the Adapter method using GET.
        };
    }
}
