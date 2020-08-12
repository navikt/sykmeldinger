export const getEnvSykmeldingerRoot = () => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.REACT_APP_SYKMELDINGER_ROOT;
    }

    return '/';
};

export const getEnvSykefravaerRoot = () => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.REACT_APP_SYKEFRAVAER_ROOT;
    }

    return '/';
};
