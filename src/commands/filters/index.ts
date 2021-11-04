import { Command } from 'commander';
import Match from './match';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (program: Command): void => {
    // Filter registered commands.
    const filters = program.command('filters <filter>');
    filters.description('Execute a filter command');

    Match.register(filters);
};
