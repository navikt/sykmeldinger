export async function authenticatedGet<T>(url: string, cb: (data: unknown) => T | Promise<T>): Promise<T> {
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

export async function authenticatedPost<T>(url: string, body?: T): Promise<string> {
    return fetch(url, { method: 'POST', credentials: 'include', body: body ? JSON.stringify(body) : undefined }).then(
        (res) => {
            if (res.status === 401) {
                const loginServiceUrl = `${window._env_?.LOGIN_SERVICE_URL}?redirect=${window._env_?.LOGIN_SERVICE_REDIRECT_URL}`;
                window.location.href = loginServiceUrl;
            }
            return res.text();
        },
    );
}
