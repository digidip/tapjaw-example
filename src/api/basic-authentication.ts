import { IncomingMessage } from 'http';
import { Response, Next } from 'restify';
import { InvalidCredentialsError, NotAuthorizedError, UnauthorizedError } from 'restify-errors';

const USER = 'test';
const PASS = 'test';

const checkAuthCredentials = (header?: string) => {
    if (!header) {
        throw new UnauthorizedError('Username and password basic authentication header missing');
    }

    header = header.replace('Basic ', '');
    const token = Buffer.from(header, 'base64').toString();
    if (!token) {
        throw new UnauthorizedError('No username and password provided');
    }

    const [user, pass] = token.split(':');
    if (!user) {
        throw new NotAuthorizedError('No username provided');
    }

    if (!pass) {
        throw new NotAuthorizedError('No password provided');
    }

    if (!(user === USER && pass === PASS)) {
        throw new InvalidCredentialsError('Username and/or password are invalid');
    }
};

export default function (request: IncomingMessage, response: Response, next: Next) {
    try {
        response.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        checkAuthCredentials(request.headers.authorization);
    } catch (err) {
        return next(err);
    }

    return next();
}
