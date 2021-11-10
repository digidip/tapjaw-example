import { Argument } from 'commander';
import mmtContainer from '../../dependency-injection';
import { ThirdParty } from '../../dependency-injection/types';
import { TapjawCommand, TapjawMetadata } from 'tapjaw-importer';
import BaseCommandFlags from '../../contracts/base-command-flags';

interface HelloOptions extends BaseCommandFlags {
    name: string;
}

@TapjawMetadata.Command.Name('hello')
@TapjawMetadata.Command.Description('A hello demo command')
@TapjawMetadata.Command.Arguments(new Argument('caption', 'A simple caption'))
@TapjawMetadata.Command.Example('$ bin/run tools hello "My super caption" --name="Sasha"')
@TapjawMetadata.Command.Action(async (caption: string, options: HelloOptions): Promise<void> => {
    try {
        // @Note Perform light validation prior to running .run().
        await new Hello(mmtContainer.get<NodeJS.WritableStream>(ThirdParty.StdoutStream)).run(
            { caption } as TapjawCommand.TapjawCommandArgs<string>,
            options
        );
    } catch (error) {
        Hello.getLogger().error(String(error));
    }
})
@TapjawMetadata.Command.Options({
    flags: '-n, --name <string>',
    description: 'Add a name to the message',
})
export default class Hello extends TapjawCommand.TapjawToolCommand<HelloOptions> {
    constructor(private readonly stdout: NodeJS.WritableStream) {
        super();
    }

    async run({ caption }: TapjawCommand.TapjawCommandArgs<string>, { name }: HelloOptions): Promise<void> {
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
