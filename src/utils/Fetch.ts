/**
 * Class with utility functions for working with fetch.
 * Redirects to Login Service if any request contains a 401 response.
 */
class Fetch {
    static loginServiceUrl = `${window._env_?.LOGIN_SERVICE_URL}?redirect=${window._env_?.LOGIN_SERVICE_REDIRECT_URL}`;

    /**
     * Make a GET request for the specified resource
     * Redirects to Login Service if request contains a 401 response.
     * @param {string} url - The endpoint to call
     * @param {(data: unknown) => T | Promise<T>} cb - The function to call after res.json()
     * @return {Promise<T>} The data
     */
    static async authenticatedGet<T>(url: string, cb: (data: unknown) => T | Promise<T>): Promise<T> {
        const res = await fetch(url, { credentials: 'include' });
        if (res.ok) {
            return cb(await res.json());
        }
        if (res.status === 401) {
            window.location.href = this.loginServiceUrl;
        }
        if (res.status >= 400 && res.status < 500) {
            throw new Error(await res.text());
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
    static async authenticatedPost<T>(url: string, body?: T): Promise<string> {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            return res.text();
        }
        if (res.status === 401) {
            window.location.href = this.loginServiceUrl;
        }
        if (res.status >= 400 && res.status < 500) {
            throw new Error(await res.text());
        }
        throw new Error('Vi har problemer med baksystemene for øyeblikket. Vennligst prøv igjen senere.');
    }
}

export default Fetch;
