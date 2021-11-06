import { Argument, Command } from 'commander';
import mmtContainer from '../../dependency-injection';
import { ThirdParty } from '../../dependency-injection/types';
import displayExample from '../../modules/commander/display-example';
import { TapjawCommandArgs, TapjawToolCommand } from 'tapjaw-importer';
import BaseCommandFlags from '../../contracts/base-command-flags';

interface NonReflectHelloOptions extends BaseCommandFlags {
    name: string;
}

export default class NonReflectHello extends TapjawToolCommand<NonReflectHelloOptions> {
    constructor(private readonly stdout: NodeJS.WritableStream) {
        super();
    }

    public static register(program: Command): void {
        program
            .command('non-reflect-hello')
            .description('A NonReflectHello demo command')
            .addArgument(new Argument('caption', 'A simple caption'))
            .storeOptionsAsProperties(false)
            .option('-n, --name <string>', 'Add a name to the message')
            .on('--help', displayExample('$ bin/run tools non-reflect-hello "My super caption" --name="Sasha"'))
            .action(async (caption: string, options: NonReflectHelloOptions) => {
                try {
                    // @Note Perform light validation prior to running .run().
                    await new NonReflectHello(mmtContainer.get<NodeJS.WritableStream>(ThirdParty.StdoutStream)).run(
                        { caption } as TapjawCommandArgs<string>,
                        options
                    );
                } catch (error) {
                    NonReflectHello.getLogger().error(String(error));
                }
            });
    }

    async run({ caption }: TapjawCommandArgs<string>, { name }: NonReflectHelloOptions): Promise<void> {
        // @Note Perform more indepth, possibly context specific validation of in coming
        //       arguments and options.
        this.stdout.write('Hello World...');

        if (name) {
            this.stdout.write(`${name} has something to say: `);
        }

        this.stdout.write(caption + '\n');

        return Promise.resolve();
    }
}
