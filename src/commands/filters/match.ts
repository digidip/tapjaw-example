import { Argument } from 'commander';
import { TapjawCommand, TapjawMessage, TapjawMetadata } from 'tapjaw-importer';
import jp from 'jsonpath';

interface MatchOptions extends TapjawCommand.TapjawCommandFlags<string | boolean> {
    limit: string;
    start: boolean;
    end: boolean;
}

@TapjawMetadata.Command.Name('match')
@TapjawMetadata.Command.Description('Filter only messages where a property matches a specified value.')
@TapjawMetadata.Command.Example('$ bin/run filter match signature 1234567890 --start')
@TapjawMetadata.Command.Arguments(
    new Argument('<property>', 'Property name of the TapjawMessage to compare against (jsonpath)'),
    new Argument('<matches>', 'The property value that should be matched')
)
@TapjawMetadata.Command.Options(
    {
        flags: '-s, --start',
        defaultValue: false,
        description: 'Only match the start of the propery value',
    },
    {
        flags: '-s, --end',
        defaultValue: false,
        description: 'Only match the end of the propery value',
    }
)
@TapjawMetadata.Command.Action(async (property: string, matches: string, options: MatchOptions) => {
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
})
export default class Match extends TapjawCommand.TapjawFilterCommand<MatchOptions, TapjawMessage.DefaultMessage> {
    protected async onMessageFilter(
        message: TapjawMessage.DefaultMessage,
        { property, matches }: TapjawCommand.TapjawCommandArgs<string>,
        { start, end }: MatchOptions
    ): Promise<TapjawMessage.DefaultMessage | null> {
        const result = jp.query(message, property);

        if (Array.isArray(result) && result.length > 0) {
            const value = result.shift() as string;
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
