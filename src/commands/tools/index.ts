import { Command } from 'commander';
import Hello from './hello';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (program: Command): void => {
    // Tools registered commands.
    const tools = program.command('tools <tool>');
    tools.description('Execute a tool command');

    Hello.register(tools);
};
