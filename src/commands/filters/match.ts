import { Argument, Command } from 'commander';
import { TapjawCommandArgs, TapjawCommandFlags, TapjawFilterCommand, TapjawMessage } from 'tapjaw-importer';
import displayExample from '../../modules/commander/display-example';

interface MatchOptions extends TapjawCommandFlags<string | boolean> {
    limit: string;
    start: boolean;
    end: boolean;
}

export default class Match extends TapjawFilterCommand<MatchOptions, TapjawMessage> {
    static register(program: Command): void {
        program
            .command(`match`)
            .addArgument(new Argument('property', 'The TapjawMessage property to match (jsonpath)'))
            .addArgument(new Argument('matches', 'The property value that should be matched'))
            .description('Filter only messages where a property matches a specified value.')
            .storeOptionsAsProperties(false)
            .option('-l, --limit', 'Limit the number of messages emitted to STDOUT')
            .option('-s, --start', 'Only match the start of the propery value', false)
            .option('-s, --end', 'Only match the end of the propery value', false)
            .on('--help', () => displayExample('$ bin/run filter match signature 1234567890 --start'))
            .action(async (property: string, matches: string, options: MatchOptions) => {
                try {
                    await new Match(process.stdin, process.stdout, false).run(
                        {
                            property,
                            matches,
                        },
                        options
                    );
                } catch (error) {
                    Match.getLogger().error(String(error));
                }
            });
    }

    protected async onMessageFilter(
        message: TapjawMessage,
        { property, matches }: TapjawCommandArgs<string>,
        { start, end }: MatchOptions
    ): Promise<TapjawMessage | null> {
        if (property in message) {
            const value = String(message[property as keyof TapjawMessage]);

            if (start && value.startsWith(matches)) {
                return Promise.resolve(message);
            } else if (end && value.endsWith(matches)) {
                return Promise.resolve(message);
            }

            if (!start && !end && value.includes(matches)) {
                return Promise.resolve(message);
            }
        }

        return Promise.resolve(null);
    }
}
