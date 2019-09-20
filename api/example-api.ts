import { createServer, Server, plugins } from 'restify';
import basicAuthentication from './basic-authentication';

const restServer: Server = createServer({
    name: 'digidip example API',
    version: 'Dev',
    dtrace: false,
});
const payload = {
    data: [
        {
            type: 'Dog',
        },
        {
            type: 'Cat',
        },
        {
            type: 'Narwhal',
        },
        {
            type: 'Komodo Dragon',
        },
        {
            type: 'Wasp',
        },
        {
            type: 'Ladybird',
        }
    ]
};

restServer.use(plugins.bodyParser({ mapParams: false }));
restServer.get(
    {
        path: '/animals',
        name: 'List of animals'
    },
    (req, res, next) => {
        console.log('GET /animals called');
        res.json(payload);
        res.end();
        next();
    }
);

restServer.get(
    {
        path: '/secure-animals',
        name: 'List of animals'
    },
    basicAuthentication,
    (req, res, next) => {
        console.log('GET /secure-animals called');
        res.json(payload);
        res.end();
        next();
    }
);

restServer.post(
    {
        path: '/animals',
        name: 'List of animals'
    },
    async (req, res, next) => {
        console.log(req.body, req.headers);
        console.log('POST /animals called');

        if (Boolean(req.body && req.body.sample && req.body.sample === 'show') === false) {
            res.statusCode = 404;
            res.json({
                error: 'argument "sample" missing.'
            });
            res.end();
            return next();
        }

        res.json(payload);
        res.end();
        next();
    }
);

restServer.listen(2019, '127.0.0.1',
    () => {
        console.log(`Example API, listening on ${restServer.url}`);
    }
);
