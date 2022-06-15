import { byteLength } from 'next/dist/server/api-utils/web';

import { getPublicEnv } from './env';
import { logger } from './logger';

const publicEnv = getPublicEnv();

const loginServiceUrl = `${publicEnv.LOGIN_SERVICE_URL}?redirect=${publicEnv.LOGIN_SERVICE_REDIRECT_URL}`;

/**
 * Make a GET request for the specified resource
 * Redirects to Login Service if request contains a 401 response.
 * @param {string} url - The endpoint to call
 * @param {(data: unknown) => Promise<T>} callback - The function to call after res.json()
 * @return {Promise<T>} The data
 */
export async function authenticatedGet<T>(
    url: string,
    callback: (data: unknown, response: Response) => Promise<T>,
): Promise<T> {
    const myMiniTraceId = Math.random().toString(16).slice(2);
    const res = await fetch(url, { credentials: 'include' });

    if (res.ok) {
        const contentType: string | null = res.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            const errorMessage = `${myMiniTraceId}: Response for "${url}" was OK, but is not 'application/json', but was '${
                contentType ?? 'null'
            }' instead`;
            logger.error(errorMessage);
            throw new Error(errorMessage);
        }

        const resultAsText = await res.text();
        logger.info(
            `${myMiniTraceId}: Successfully fetched data, content-length is ${res.headers.get(
                'content-length',
            )}, body byte length is ${byteLength(resultAsText)}`,
        );
        try {
            return await callback(JSON.parse(resultAsText), res);
        } catch (error: unknown) {
            let cause: Error | undefined = undefined;
            if (error instanceof Error) {
                // TODO temporary, ignore promise on purpose
                fireAndforgetBucketDebug(resultAsText);
                logger.warn(
                    `${myMiniTraceId}: Error occured in fetch try-catch for '${url}'. Content type is ${res.headers.get(
                        'content-type',
                    )}. Content length is ${res.headers.get('content-length')}`,
                );
                logger.error(error);
                cause = error;
            } else {
                logger.error(`${myMiniTraceId}: Unknown error type: ${typeof error}`);
                logger.error(error);
            }

            throw new Error(
                'Beklager! En uventet feil har oppstått. Sannsynligvis jobber vi med saken allerede, men ta kontakt med oss hvis det ikke har løst seg til i morgen.',
                { cause },
            );
        }
    }

    if (res.status === 401) {
        window.location.href = loginServiceUrl;
        logger.info(`Session expired for request to ${url}`);
        throw new Error('Sesjonen er utløpt. Vi videresender deg til innloggingssiden.');
    }

    const textResponse = await res.text();
    logger.error(`Request to ${url} resulted in statuscode: ${res.status} with message: ${textResponse}`);
    if (res.status === 400) {
        throw new Error(textResponse);
    }

    throw new Error('Vi har problemer med baksystemene for øyeblikket. Vennligst prøv igjen senere.');
}

/**
 * TODO temporary
 */
async function fireAndforgetBucketDebug(resultAsText: string): Promise<void> {
    await fetch(`${publicEnv.publicPath ?? ''}/api/buck-it`, {
        method: 'POST',
        body: resultAsText,
    });
}

/**
 * Make a POST request to the specified endpoint
 * Redirects to Login Service if request contains a 401 response.
 * @param {string} url - The endpoint to call
 * @param {T | undefined} body - The body to send with the request
 * @return {string} The response from the http request parsed as text
 */
export async function authenticatedPost<T>(url: string, body?: T): Promise<string> {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const textResponse = await res.text();
    if (res.ok) {
        return textResponse;
    }
    if (res.status === 401) {
        window.location.href = loginServiceUrl;
        logger.warn(`Session expired for request to ${url}`);
        throw new Error('Sesjonen er utløpt. Vi videresender deg til innloggingssiden.');
    }
    logger.error(`Request to ${url} resulted in statuscode: ${res.status} with message: ${textResponse}`);
    if (res.status === 400) {
        throw new Error(textResponse);
    }
    throw new Error('Vi har problemer med baksystemene for øyeblikket. Vennligst prøv igjen senere.');
}
