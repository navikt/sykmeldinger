import '@testing-library/jest-dom';

window._env_ = {
    RUNTIME_ENVIRONMENT: 'test',
    DITT_NAV_ROOT: '/dittnav',
    SYKEFRAVAER_ROOT: '/sykefravaer',
    SYKMELDINGER_ROOT: '/syk/sykmeldinger',
    SYKEPENGESOKNAD_URL: '/sykepengesoknad',
    LOGIN_SERVICE_URL: '',
    LOGIN_SERVICE_REDIRECT_URL: '',
    AMPLITUDE_ENABLED: 'false',
    SYKMELDINGER_BACKEND_PROXY_ROOT: 'http://localhost',
    FLEX_GATEWAY_ROOT: '/flex-gateway',
};
