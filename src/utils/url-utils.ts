export const getUrlTilDittSykefravaer = (): string => {
    return '/';
};

export const getUrlTilSykmeldinger = (): string => {
    return '/sykmeldinger';
};

export const getUrlTilSykmelding = (sykmeldingId: string): string => {
    return `/sykmeldinger/${sykmeldingId}/`;
};

export const getUrlTilTidslinje = (): string => {
    return '/tidslinje';
};

export const erHerokuApp = () => {
    const url = window?.location?.href ? window.location.href : '';

    return url.indexOf('herokuapp') > -1;
};

export const getSykefravaerUrl = (): string => {
    return erHerokuApp() ? 'https://sykefravaer.herokuapp.com' : '';
};
