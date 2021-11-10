import { Argument } from 'commander';
import { constants } from 'fs';
import { FileHandle, open } from 'fs/promises';
import { TapjawCommand, TapjawMetadata } from 'tapjaw-importer';
import BaseCommandFlags from '../../contracts/base-command-flags';
import ExampleTapjawMessage from '../../contracts/messages/example-tapjaw-message';

interface JsonlOptions extends BaseCommandFlags {
    limit: string;
}

@TapjawMetadata.Command.Name('jsonl')
@TapjawMetadata.Command.Description('Store JSON messages into a JSONL file.')
@TapjawMetadata.Command.Example('$ bin/run stores jsonl /tmp/myfile.jsonl')
@TapjawMetadata.Command.Arguments(new Argument('filePath', 'The path to where the file should be written.'))
@TapjawMetadata.Command.Action(async (filePath: string, options: JsonlOptions) => {
    let fp: FileHandle | null = null;

    try {
        fp = await open(filePath, constants.O_CREAT | constants.O_WRONLY);

        await new Jsonl(process.stdin, false).run(
            {
                file: fp,
            },
            options
        );
    } catch (error) {
        Jsonl.getLogger().error(String(error));
    } finally {
        if (fp) {
            await fp.close();
        }
    }
})
export default class Jsonl extends TapjawCommand.TapjawStoreCommand<JsonlOptions, ExampleTapjawMessage> {
    protected async onStoreMessage(
        message: ExampleTapjawMessage,
        { file }: TapjawCommand.TapjawCommandArgs<FileHandle>
    ): Promise<void> {
        await file.write(JSON.stringify(message) + '\n', undefined, 'utf-8');
    }
}
