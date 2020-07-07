import dayjs from 'dayjs';

export const soknadFremtidig = {
    id: 'FREMTIDIG',
    sykmeldingId: 'SENDT',
    status: 'FREMTIDIG',
    fom: dayjs(new Date())
        .date(new Date().getDate() + 10)
        .format('YYYY-MM-DD'),
    tom: dayjs(new Date())
        .date(new Date().getDate() + 20)
        .format('YYYY-MM-DD'),
};

export const soknadNy = {
    id: 'NY',
    sykmeldingId: 'SENDT',
    status: 'NY',
    fom: dayjs(new Date()).date(new Date().getDate()).format('YYYY-MM-DD'),
    tom: dayjs(new Date())
        .date(new Date().getDate() + 10)
        .format('YYYY-MM-DD'),
};

export const soknadSendt = {
    id: 'SENDT',
    sykmeldingId: 'SENDT',
    status: 'SENDT',
    fom: dayjs(new Date())
        .date(new Date().getDate() - 20)
        .format('YYYY-MM-DD'),
    tom: dayjs(new Date())
        .date(new Date().getDate() - 10)
        .format('YYYY-MM-DD'),
};
