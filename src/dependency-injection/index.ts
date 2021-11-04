import { Container } from 'inversify';
import adapters from './adapters';
import commander from './commander';
import configs from './configs';
import connectors from './connectors';
import thirdParty from './third-party';

const mmtContainer = new Container({
    skipBaseClassChecks: true,
});

configs(mmtContainer);

thirdParty(mmtContainer);

commander(mmtContainer);

connectors(mmtContainer);

adapters(mmtContainer);

export default mmtContainer;
