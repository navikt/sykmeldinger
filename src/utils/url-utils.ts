export const getUrlTilSykmeldinger = (): string => {
    return '/';
};

export const getUrlTilSykmelding = (sykmeldingId: string): string => {
    return `/sykmelding/${sykmeldingId}/`;
};

export const erHerokuApp = () => {
    const url = window && window.location && window.location.href ? window.location.href : '';

    return url.indexOf('herokuapp') > -1;
};

export const getSykefravaerUrl = (): string => {
    return erHerokuApp() ? 'https://sykefravaer.herokuapp.com' : '';
};
