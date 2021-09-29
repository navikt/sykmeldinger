import env from './env';
import { logger } from './logger';

const loginServiceUrl = `${env.LOGIN_SERVICE_URL}?redirect=${env.LOGIN_SERVICE_REDIRECT_URL}`;

/**
 * Make a GET request for the specified resource
 * Redirects to Login Service if request contains a 401 response.
 * @param {string} url - The endpoint to call
 * @param {(data: unknown) => Promise<T>} cb - The function to call after res.json()
 * @return {Promise<T>} The data
 */
export async function authenticatedGet<T>(
    url: string,
    cb: (data: unknown, response: Response) => Promise<T>,
): Promise<T> {
    const res = await fetch(url, { credentials: 'include' });

    if (res.ok) {
        try {
            return await cb(await res.json(), res);
        } catch (error) {
            if (error instanceof TypeError) {
                logger.error({
                    message: `${error.name}: ${error.message}`,
                    stack: error.stack,
                });
            } else {
                logger.error({
                    ...error,
                    message: error.message ?? `Error without message occurred in GET request to ${url}`,
                });
            }
            throw new Error(
                'Beklager! En uventet feil har oppstått. Sannsynligvis jobber vi med saken allerede, men ta kontakt med oss hvis det ikke har løst seg til i morgen.',
            );
        }
    }
    if (res.status === 401) {
        window.location.href = loginServiceUrl;
        logger.warn(`Session expired for request to ${url}`);
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
