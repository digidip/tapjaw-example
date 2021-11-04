import { createCommand } from 'commander';
import yarnPackage from '../modules/yarn/package';
import apis from './apis';
import filters from './filters';
import stores from './stores';
import tools from './tools';

const program = createCommand();
program.version(yarnPackage.version);

// APIs
apis(program);

filters(program);

stores(program);

tools(program);

export default (): void => {
    program.parse(process.argv);
};
