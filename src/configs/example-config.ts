import { DotEnvConfig } from 'tapjaw-importer';

class ExampleConfig extends DotEnvConfig {
    constructor() {
        super('Example Config', 'EXAMPLE_');
    }
}

export default new ExampleConfig();
