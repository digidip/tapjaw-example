import './index';
import { DotEnvConfig } from 'tapjaw-importer';

class AppConfig extends DotEnvConfig {
    constructor() {
        super('MMT Application Config', 'APP_');
    }
}

export default new AppConfig();
