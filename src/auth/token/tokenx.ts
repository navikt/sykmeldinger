import { Client, errors, GrantBody, Issuer } from 'openid-client';
import { JWK } from 'jose';

import { getServerEnv } from '../../utils/env';
import { logger } from '../../utils/logger';

import tokenCache from './tokenCache';

const serverEnv = getServerEnv();

const OPError = errors.OPError;
const RPError = errors.RPError;

let _issuer: Issuer<Client>;
let _client: Client;

async function issuer(): Promise<Issuer<Client>> {
    if (typeof _issuer === 'undefined') {
        _issuer = await Issuer.discover(serverEnv.TOKEN_X_WELL_KNOWN_URL);
    }
    return _issuer;
}

function jwk(): JWK {
    return JSON.parse(serverEnv.TOKEN_X_PRIVATE_JWK);
}

async function client(): Promise<Client> {
    if (typeof _client === 'undefined') {
        const _jwk = jwk();
        const _issuer = await issuer();
        _client = new _issuer.Client(
            {
                client_id: serverEnv.TOKEN_X_CLIENT_ID,
                token_endpoint_auth_method: 'private_key_jwt',
            },
            { keys: [_jwk] },
        );
    }
    return _client;
}

export async function getToken(subject_token: string, audience: string): Promise<string | undefined> {
    const cacheKey = `${subject_token}-${audience}`;
    const cacheToken: string | undefined = tokenCache.get(cacheKey);
    if (cacheToken) {
        return cacheToken;
    }

    const _client = await client();

    const now = Math.floor(Date.now() / 1000);
    const additionalClaims = {
        clientAssertionPayload: {
            nbf: now,
            aud: _client.issuer.metadata.token_endpoint,
        },
    };

    const grantBody: GrantBody = {
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
        audience,
        subject_token,
    };

    try {
        const grant = await _client.grant(grantBody, additionalClaims);
        tokenCache.set(cacheKey, grant.access_token, (grant.expires_in ?? 65) - 5);
        return grant.access_token;
    } catch (err: unknown) {
        if (!(err instanceof Error)) {
            logger.error('Unknown error from openid-client');
            logger.error(err);
            throw err;
        }

        if (err instanceof OPError || err instanceof RPError) {
            logger.error(
                `Noe gikk galt med token exchange mot TokenX.
                 Feilmelding fra openid-client: (${err}).
                 HTTP Status fra TokenX: (${err.response?.statusCode} ${err.response?.statusMessage})
                 Body fra TokenX: ${JSON.stringify(err.response?.body)}`,
            );
            return;
        }

        logger.error('Unknown error from openid-client');
        throw err;
    }
}
