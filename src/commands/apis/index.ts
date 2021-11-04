import { Command } from 'commander';
import TapjawExample from './tapjaw-example';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (program: Command): void => {
    // API registered commands.
    const apis = program.command('apis <api>');
    apis.description('Execute an API command');

    TapjawExample.register(apis);
};
