export const hentLoginServiceUrl = (): string => {
    if (window.location.href.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://loginservice.nav.no/login';
    }
    // Preprod
    return 'https://loginservice-q.nav.no/login';
}

export const customFetch = (url: string, init?: RequestInit): Promise<any> => {
    return fetch(url, init).then(res => {
        if (res.status === 401) {
            // Store current url in local storage
            window.localStorage.setItem('REDIRECT_ETTER_LOGIN', window.location.href);
            // redirect to loginservice
            window.location.href = `${hentLoginServiceUrl()}?redirect=${window.location.origin}/sykefravaer`;
            throw new Error(res.statusText);
        } else if (res.status >= 400) {
            throw new Error(res.statusText);
        }
        return res.json();
    })
}