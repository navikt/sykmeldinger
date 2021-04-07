/**
 * Class with utility functions for working with fetch.
 * Redirects to Login Service if any request contains a 401 response.
 */
class Fetch {
    /**
     * Make a GET request for the specified resource
     * Redirects to Login Service if request contains a 401 response.
     * @param {string} url - The endpoint to call
     * @param {(data: unknown) => T | Promise<T>} cb - The function to call after res.json()
     * @return {Promise<T>} The data
     */
    static async authenticatedGet<T>(url: string, cb: (data: unknown) => T | Promise<T>): Promise<T> {
        return fetch(url, { credentials: 'include' })
            .then((res) => {
                if (res.status === 401) {
                    const loginServiceUrl = `${window._env_?.LOGIN_SERVICE_URL}?redirect=${window._env_?.LOGIN_SERVICE_REDIRECT_URL}`;
                    window.location.href = loginServiceUrl;
                }
                return res.json();
            })
            .then(cb);
    }

    /**
     * Make a POST request to the specified endpoint
     * Redirects to Login Service if request contains a 401 response.
     * @param {string} url - The endpoint to call
     * @param {T | undefined} body - The body to send with the request
     * @return {string} The response from the http request parsed as text
     */
    static async authenticatedPost<T>(url: string, body?: T): Promise<string> {
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: body ? JSON.stringify(body) : undefined,
        }).then((res) => {
            if (res.status === 401) {
                const loginServiceUrl = `${window._env_?.LOGIN_SERVICE_URL}?redirect=${window._env_?.LOGIN_SERVICE_REDIRECT_URL}`;
                window.location.href = loginServiceUrl;
            }
            return res.text();
        });
    }
}

export default Fetch;
