import { Command } from 'commander';
import Jsonl from './jsonl';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (program: Command): void => {
    // Store registered commands.
    const stores = program.command('stores <store>');
    stores.description('Execute a store command');

    Jsonl.register(stores);
};
