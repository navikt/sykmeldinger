import { SykmeldingFragment } from '../fetching/graphql.generated'

export type UtenlandskSykmelding = Omit<SykmeldingFragment, 'utenlandskSykmelding'> & {
    readonly utenlandskSykmelding: NonNullable<SykmeldingFragment['utenlandskSykmelding']>
}

export function isUtenlandsk(sykmelding: SykmeldingFragment): sykmelding is UtenlandskSykmelding {
    return sykmelding.utenlandskSykmelding !== null
}
