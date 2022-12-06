import { mapSendSykmeldingValuesToV3Api } from './sendSykmeldingMapping'
import { ArbeidssituasjonType, UriktigeOpplysningerType, YesOrNo } from './graphql/resolver-types.generated'
import arbeidsgivereMock from './graphql/mockData/arbeidsgivereMock'
import { sykmeldingApen } from './graphql/mockData/sykmelding-apen'

const expectedYesNoText = '{"JA":"Ja","NEI":"Nei"}'
const expectedArbeidssituasjonText =
    '{"ANNET":"annet","ARBEIDSLEDIG":"arbeidsledig","ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","PERMITTERT":"permittert"}'

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
                svartekster: expectedYesNoText,
            },
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'ANNET',
                svartekster: expectedArbeidssituasjonText,
            },
            arbeidsgiverOrgnummer: null,
            egenmeldingsperioder: null,
            harBruktEgenmelding: null,
            harForsikring: null,
            riktigNarmesteLeder: null,
            uriktigeOpplysninger: null,
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
                svartekster: expectedYesNoText,
            },
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'ARBEIDSLEDIG',
                svartekster: expectedArbeidssituasjonText,
            },
            arbeidsgiverOrgnummer: null,
            egenmeldingsperioder: null,
            harBruktEgenmelding: null,
            harForsikring: null,
            riktigNarmesteLeder: null,
            uriktigeOpplysninger: null,
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
                svartekster: expectedYesNoText,
            },
            uriktigeOpplysninger: {
                sporsmaltekst: 'Hvilke opplysninger stemmer ikke?',
                svar: ['DIAGNOSE', 'ARBEIDSGIVER'],
                svartekster:
                    '{"ANDRE_OPPLYSNINGER":"Andre opplysninger","ARBEIDSGIVER":"Arbeidsgiver","DIAGNOSE":"Diagnose","PERIODE":"Periode","SYKMELDINGSGRAD_FOR_HOY":"Sykmeldingsgraden er for høy","SYKMELDINGSGRAD_FOR_LAV":"Sykmeldingsgraden er for lav"}',
            },
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'ANNET',
                svartekster: expectedArbeidssituasjonText,
            },
            arbeidsgiverOrgnummer: null,
            egenmeldingsperioder: null,
            harBruktEgenmelding: null,
            harForsikring: null,
            riktigNarmesteLeder: null,
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
                svartekster: expectedYesNoText,
            },
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'ARBEIDSTAKER',
                svartekster: expectedArbeidssituasjonText,
            },
            arbeidsgiverOrgnummer: {
                sporsmaltekst: 'Velg arbeidsgiver',
                svar: '110110110',
                svartekster:
                    '[{"navn":"PONTYPANDY FIRE SERVICE","orgnummer":"110110110"},{"navn":"ANDEBY BRANNSTATION","orgnummer":"110110112"}]',
            },
            riktigNarmesteLeder: {
                sporsmaltekst: 'Er det Station Officer Steele som skal følge deg opp på jobben mens du er syk?',
                svar: 'JA',
                svartekster: expectedYesNoText,
            },
            egenmeldingsperioder: null,
            harBruktEgenmelding: null,
            harForsikring: null,
            uriktigeOpplysninger: null,
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
                svartekster: expectedYesNoText,
            },
            arbeidssituasjon: {
                sporsmaltekst: 'Jeg er sykmeldt som',
                svar: 'FRILANSER',
                svartekster: expectedArbeidssituasjonText,
            },
            harBruktEgenmelding: {
                sporsmaltekst:
                    'Vi har registrert at du ble syk 10. april 2021. Brukte du egenmelding eller noen annen sykmelding før denne datoen?',
                svar: 'JA',
                svartekster: expectedYesNoText,
            },
            egenmeldingsperioder: {
                sporsmaltekst: 'Hvilke dager var du borte fra jobb før 10. april 2021?',
                svar: [
                    { fom: '2021-04-10', tom: '2021-04-11' },
                    { fom: '2021-04-12', tom: '2021-04-13' },
                ],
                svartekster: '"Fom, Tom"',
            },
            harForsikring: {
                sporsmaltekst: 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
                svar: 'JA',
                svartekster: expectedYesNoText,
            },
            arbeidsgiverOrgnummer: null,
            riktigNarmesteLeder: null,
            uriktigeOpplysninger: null,
        })
    })
})
