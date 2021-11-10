import './index';
import { TapjawConfig } from 'tapjaw-importer';

class AppConfig extends TapjawConfig.DotEnvConfig {
    constructor() {
        super('MMT Application Config', 'APP_');
    }
}

export default new AppConfig();
