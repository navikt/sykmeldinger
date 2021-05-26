// extends this type when adding more environment variables
type EnvironmentKeys =
    | 'RUNTIME_ENVIRONMENT'
    | 'SYKMELDINGER_BACKEND_PROXY_ROOT'
    | 'FLEX_GATEWAY_ROOT'
    | 'DITT_NAV_ROOT'
    | 'SYKMELDINGER_ROOT'
    | 'SYKEFRAVAER_ROOT'
    | 'LOGIN_SERVICE_URL'
    | 'LOGIN_SERVICE_REDIRECT_URL'
    | 'SYKEPENGESOKNAD_URL'
    | 'AMPLITUDE_ENABLED';

interface Window {
    _env_?: Record<EnvironmentKeys, string | undefined>;
}
