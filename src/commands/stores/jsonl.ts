import { Argument, Command } from 'commander';
import { constants } from 'fs';
import { FileHandle, open, writeFile } from 'fs/promises';
import { TapjawCommandArgs, TapjawCommandDefaultFlags, TapjawStoreCommand } from 'tapjaw-importer';
import BaseCommandFlags from '../../contracts/base-command-flags';
import ExampleTapjawMessage from '../../contracts/messages/example-tapjaw-message';
import displayExample from '../../modules/commander/display-example';

interface JsonlOptions extends BaseCommandFlags {
    limit: string;
}

export default class Jsonl extends TapjawStoreCommand<JsonlOptions, ExampleTapjawMessage> {
    static register(program: Command): void {
        program
            .command(`jsonl`)
            .addArgument(new Argument('filePath', 'The path to where the file should be written.'))
            .description('Store JSON messages into a JSONL file.')
            .storeOptionsAsProperties(false)
            .option('-l, --limit', 'Limit the number of messages emitted to STDOUT')
            .on('--help', () => displayExample('$ bin/run stores jsonl /tmp/myfile.jsonl'))
            .action(async (filePath: string, options: JsonlOptions) => {
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
            });
    }

    protected async onStoreMessage(
        message: ExampleTapjawMessage,
        { file }: TapjawCommandArgs<FileHandle>
    ): Promise<void> {
        await file.write(JSON.stringify(message) + '\n', undefined, 'utf-8');
    }
}
