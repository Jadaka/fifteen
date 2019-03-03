import { RequestHandler } from 'express';

import jwt from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';
import jwksRsa from 'jwks-rsa';

import { AUTH0_API_IDENTIFIER } from '../config';

const checkToken: RequestHandler = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://obber.auth0.com/.well-known/jwks.json',
  }),
  audience: AUTH0_API_IDENTIFIER,
  issuer: 'https://obber.auth0.com/',
  algorithms: ['RS256'],
});

const checkFullScopes: RequestHandler = jwtAuthz(['read:all', 'write:all']);

export {
  checkToken,
  checkFullScopes,
};
