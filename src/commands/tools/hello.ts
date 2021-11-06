import { Argument } from 'commander';
import mmtContainer from '../../dependency-injection';
import { ThirdParty } from '../../dependency-injection/types';
import { TapjawCommand, TapjawCommandArgs, TapjawToolCommand } from 'tapjaw-importer';
import BaseCommandFlags from '../../contracts/base-command-flags';

interface HelloOptions extends BaseCommandFlags {
    name: string;
}

@TapjawCommand.Name('hello')
@TapjawCommand.Description('A hello demo command')
@TapjawCommand.Arguments(new Argument('caption', 'A simple caption'))
@TapjawCommand.Example('$ bin/run tools hello "My super caption" --name="Sasha"')
@TapjawCommand.Action(async (caption: string, options: HelloOptions) => {
    try {
        // @Note Perform light validation prior to running .run().
        await new Hello(mmtContainer.get<NodeJS.WritableStream>(ThirdParty.StdoutStream)).run(
            { caption } as TapjawCommandArgs<string>,
            options
        );
    } catch (error) {
        Hello.getLogger().error(String(error));
    }
})
@TapjawCommand.Options({
    flags: '-n, --name <string>',
    description: 'Add a name to the message',
})
export default class Hello extends TapjawToolCommand<HelloOptions> {
    constructor(private readonly stdout: NodeJS.WritableStream) {
        super();
    }

    async run({ caption }: TapjawCommandArgs<string>, { name }: HelloOptions): Promise<void> {
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
