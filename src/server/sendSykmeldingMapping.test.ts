import { mapSendSykmeldingValuesToV3Api } from './sendSykmeldingMapping'
import { ArbeidssituasjonType, UriktigeOpplysningerType, YesOrNo } from './graphql/resolver-types.generated'
import arbeidsgivereMock from './graphql/mockData/arbeidsgivereMock'
import { sykmeldingApen } from './graphql/mockData/sykmelding-apen'

describe('sendSykmeldingMapping', () => {
    const brukerinformasjon = { strengtFortroligAdresse: false, arbeidsgivere: arbeidsgivereMock }
    const erUtenforVentetid = { erUtenforVentetid: false, oppfolgingsdato: '2021-04-10' }

    it('should map a bare minimum result correctly', () => {
        const sykmelding = sykmeldingApen()
        const mappedResult = mapSendSykmeldingValuesToV3Api(
            {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.ANNET,
            },
            sykmelding,
            brukerinformasjon,
            erUtenforVentetid,
        )

        expect(mappedResult).toEqual({
            erOpplysningeneRiktige: {
                sporsmaltekst: 'Stemmer opplysningene?',
                svar: 'JA',
            },
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'ANNET',
            },
            arbeidsgiverOrgnummer: null,
            egenmeldingsperioder: null,
            harBruktEgenmelding: null,
            harForsikring: null,
            riktigNarmesteLeder: null,
            uriktigeOpplysninger: null,
            harBruktEgenmeldingsdager: null,
            egenmeldingsdager: null,
        })
    })

    it('should map PERMITTERT to ARBEIDSLEDIG', () => {
        const sykmelding = sykmeldingApen()
        const mappedResult = mapSendSykmeldingValuesToV3Api(
            {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.PERMITTERT,
            },
            sykmelding,
            brukerinformasjon,
            erUtenforVentetid,
        )

        expect(mappedResult).toEqual({
            erOpplysningeneRiktige: {
                sporsmaltekst: 'Stemmer opplysningene?',
                svar: 'JA',
            },
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'ARBEIDSLEDIG',
            },
            arbeidsgiverOrgnummer: null,
            egenmeldingsperioder: null,
            harBruktEgenmelding: null,
            harForsikring: null,
            riktigNarmesteLeder: null,
            uriktigeOpplysninger: null,
            harBruktEgenmeldingsdager: null,
            egenmeldingsdager: null,
        })
    })

    it('should map uriktigeOpplysninger correctly', () => {
        const sykmelding = sykmeldingApen()
        const mappedResult = mapSendSykmeldingValuesToV3Api(
            {
                erOpplysningeneRiktige: YesOrNo.NO,
                uriktigeOpplysninger: [UriktigeOpplysningerType.DIAGNOSE, UriktigeOpplysningerType.ARBEIDSGIVER],
                arbeidssituasjon: ArbeidssituasjonType.ANNET,
            },
            sykmelding,
            brukerinformasjon,
            erUtenforVentetid,
        )

        expect(mappedResult).toEqual({
            erOpplysningeneRiktige: {
                sporsmaltekst: 'Stemmer opplysningene?',
                svar: 'NEI',
            },
            uriktigeOpplysninger: {
                sporsmaltekst: 'Hvilke opplysninger stemmer ikke?',
                svar: ['DIAGNOSE', 'ARBEIDSGIVER'],
            },
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'ANNET',
            },
            arbeidsgiverOrgnummer: null,
            egenmeldingsperioder: null,
            harBruktEgenmelding: null,
            harForsikring: null,
            riktigNarmesteLeder: null,
            harBruktEgenmeldingsdager: null,
            egenmeldingsdager: null,
        })
    })

    it('should map a normal arbeidssituasjon result correctly', () => {
        const sykmelding = sykmeldingApen()
        const mappedResult = mapSendSykmeldingValuesToV3Api(
            {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '110110110',
                riktigNarmesteLeder: YesOrNo.YES,
            },
            sykmelding,
            brukerinformasjon,
            erUtenforVentetid,
        )

        expect(mappedResult).toEqual({
            erOpplysningeneRiktige: {
                sporsmaltekst: 'Stemmer opplysningene?',
                svar: 'JA',
            },
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'ARBEIDSTAKER',
            },
            arbeidsgiverOrgnummer: {
                sporsmaltekst: 'Velg arbeidsgiver',
                svar: '110110110',
            },
            riktigNarmesteLeder: {
                sporsmaltekst: 'Er det Station Officer Steele som skal følge deg opp på jobben mens du er syk?',
                svar: 'JA',
            },
            egenmeldingsperioder: null,
            harBruktEgenmelding: null,
            harForsikring: null,
            uriktigeOpplysninger: null,
            harBruktEgenmeldingsdager: null,
            egenmeldingsdager: null,
        })
    })

    it('should map a arbeidssituasjon with inactive arbeidsgiver result correctly', () => {
        const sykmelding = sykmeldingApen()
        const mappedResult = mapSendSykmeldingValuesToV3Api(
            {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '110110110',
            },
            sykmelding,
            {
                ...brukerinformasjon,
                arbeidsgivere: [{ ...arbeidsgivereMock[0], aktivtArbeidsforhold: false, naermesteLeder: null }],
            },
            erUtenforVentetid,
        )

        expect(mappedResult).toEqual({
            erOpplysningeneRiktige: {
                sporsmaltekst: 'Stemmer opplysningene?',
                svar: 'JA',
            },
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'ARBEIDSTAKER',
            },
            arbeidsgiverOrgnummer: {
                sporsmaltekst: 'Velg arbeidsgiver',
                svar: '110110110',
            },
            riktigNarmesteLeder: null,
            egenmeldingsperioder: null,
            harBruktEgenmelding: null,
            harForsikring: null,
            uriktigeOpplysninger: null,
            harBruktEgenmeldingsdager: null,
            egenmeldingsdager: null,
        })
    })

    it('should map a frilanser with egenmeldingsperioder and forsikring correctly', () => {
        const sykmelding = sykmeldingApen()
        const mappedResult = mapSendSykmeldingValuesToV3Api(
            {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.FRILANSER,
                harBruktEgenmelding: YesOrNo.YES,
                egenmeldingsperioder: [
                    { fom: '2021-04-10', tom: '2021-04-11' },
                    { fom: '2021-04-12', tom: '2021-04-13' },
                ],
                harForsikring: YesOrNo.YES,
            },
            sykmelding,
            brukerinformasjon,
            erUtenforVentetid,
        )

        expect(mappedResult).toEqual({
            erOpplysningeneRiktige: {
                sporsmaltekst: 'Stemmer opplysningene?',
                svar: 'JA',
            },
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'FRILANSER',
            },
            harBruktEgenmelding: {
                sporsmaltekst:
                    'Vi har registrert at du ble syk 10. april 2021. Brukte du egenmelding eller noen annen sykmelding før denne datoen?',
                svar: 'JA',
            },
            egenmeldingsperioder: {
                sporsmaltekst: 'Hvilke dager var du borte fra jobb før 10. april 2021?',
                svar: [
                    { fom: '2021-04-10', tom: '2021-04-11' },
                    { fom: '2021-04-12', tom: '2021-04-13' },
                ],
            },
            harForsikring: {
                sporsmaltekst: 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
                svar: 'JA',
            },
            arbeidsgiverOrgnummer: null,
            riktigNarmesteLeder: null,
            uriktigeOpplysninger: null,
            harBruktEgenmeldingsdager: null,
            egenmeldingsdager: null,
        })
    })
})
