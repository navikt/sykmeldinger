import { describe, expect, it } from 'vitest'

import { Blad, ArbeidssituasjonType, LottOgHyre, StatusEvent, UriktigeOpplysningerType, YesOrNo } from 'queries'

import { mapSendSykmeldingValuesToV3Api } from './sendSykmeldingMapping'
import { defaultArbeidsgivere, SykmeldingBuilder } from './graphql/mock-db/data-creators'
import { Sykmelding } from './api-models/sykmelding/Sykmelding'
import { Brukerinformasjon } from './api-models/Brukerinformasjon'
import { ErUtenforVentetid } from './api-models/ErUtenforVentetid'

describe('sendSykmeldingMapping', () => {
    const brukerinformasjon: Brukerinformasjon = {
        arbeidsgivere: defaultArbeidsgivere.slice(0, 2),
    }
    const erUtenforVentetid: ErUtenforVentetid = { erUtenforVentetid: false, oppfolgingsdato: '2021-04-10' }

    const sykmeldingApen = (): Sykmelding =>
        new SykmeldingBuilder().status(StatusEvent.APEN).enkelPeriode({ offset: 0, days: 7 }).build()

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
            fisker: null,
            arbeidsledig: null,
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
            fisker: null,
            arbeidsledig: null,
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
            fisker: null,
            arbeidsledig: null,
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
            fisker: null,
            arbeidsledig: null,
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
                arbeidsgivere: [{ ...defaultArbeidsgivere[0], aktivtArbeidsforhold: false, naermesteLeder: null }],
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
            fisker: null,
            arbeidsledig: null,
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
                    'Vi har registrert at du ble syk 10. april 2021. Brukte du egenmelding eller papirsykmelding før denne datoen?',
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
            fisker: null,
            arbeidsledig: null,
        })
    })

    describe('fisker', () => {
        it('should map a fisker with blad A+Lott (næringsdrivende w/insurance) with egenmeldingsperioder and forsikring correctly', () => {
            const sykmelding = sykmeldingApen()
            const mappedResult = mapSendSykmeldingValuesToV3Api(
                {
                    erOpplysningeneRiktige: YesOrNo.YES,
                    arbeidssituasjon: ArbeidssituasjonType.FISKER,
                    fisker: {
                        blad: Blad.A,
                        lottOgHyre: LottOgHyre.LOTT,
                    },
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
                    svar: 'FISKER',
                },
                harBruktEgenmelding: {
                    sporsmaltekst:
                        'Vi har registrert at du ble syk 10. april 2021. Brukte du egenmelding eller papirsykmelding før denne datoen?',
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
                fisker: {
                    blad: {
                        sporsmaltekst: 'Velg blad',
                        svar: 'A',
                    },
                    lottOgHyre: {
                        sporsmaltekst: 'Mottar du lott eller er du på hyre?',
                        svar: 'LOTT',
                    },
                },
                arbeidsgiverOrgnummer: null,
                riktigNarmesteLeder: null,
                uriktigeOpplysninger: null,
                harBruktEgenmeldingsdager: null,
                egenmeldingsdager: null,
                arbeidsledig: null,
            })
        })

        it('should map a fisker with blad A+Hyre (arbeidstaker)', () => {
            const sykmelding = sykmeldingApen()
            const mappedResult = mapSendSykmeldingValuesToV3Api(
                {
                    erOpplysningeneRiktige: YesOrNo.YES,
                    arbeidssituasjon: ArbeidssituasjonType.FISKER,
                    fisker: {
                        blad: Blad.A,
                        lottOgHyre: LottOgHyre.HYRE,
                    },
                    arbeidsgiverOrgnummer: '110110110',
                    riktigNarmesteLeder: YesOrNo.YES,
                    harEgenmeldingsdager: YesOrNo.YES,
                    egenmeldingsdager: ['2021-04-10', '2021-04-11'],
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
                    svar: 'FISKER',
                },
                fisker: {
                    blad: {
                        sporsmaltekst: 'Velg blad',
                        svar: 'A',
                    },
                    lottOgHyre: {
                        sporsmaltekst: 'Mottar du lott eller er du på hyre?',
                        svar: 'HYRE',
                    },
                },
                arbeidsgiverOrgnummer: {
                    sporsmaltekst: 'Velg arbeidsgiver',
                    svar: '110110110',
                },
                riktigNarmesteLeder: {
                    sporsmaltekst: 'Er det Station Officer Steele som skal følge deg opp på jobben mens du er syk?',
                    svar: 'JA',
                },
                harBruktEgenmeldingsdager: {
                    sporsmaltekst: 'Brukte du egenmelding hos Pontypandy Fire Service',
                    svar: 'JA',
                },
                egenmeldingsdager: {
                    sporsmaltekst: 'Velg dagene du brukte egenmelding',
                    svar: ['2021-04-10', '2021-04-11'],
                },
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                uriktigeOpplysninger: null,
                arbeidsledig: null,
            })
        })
    })

    describe('Arbeidsledig', () => {
        it('should map a arbeidsledig correctly', () => {
            const sykmelding = sykmeldingApen()
            const mappedResult = mapSendSykmeldingValuesToV3Api(
                {
                    erOpplysningeneRiktige: YesOrNo.YES,
                    arbeidssituasjon: ArbeidssituasjonType.ARBEIDSLEDIG,
                    arbeidsledig: {
                        arbeidsledigFraOrgnummer: '121212121',
                    },
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
                arbeidsledig: {
                    arbeidsledigFraOrgnummer: {
                        sporsmaltekst: 'Hvilken arbeidsgiver har du blitt arbeidsledig fra?',
                        svar: '121212121',
                    },
                },
                fisker: null,
                arbeidsgiverOrgnummer: null,
                riktigNarmesteLeder: null,
                harBruktEgenmeldingsdager: null,
                egenmeldingsdager: null,
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                uriktigeOpplysninger: null,
            })
        })

        it('should map a arbeidsledig without tidligere arbeidsgiver correctly', () => {
            const sykmelding = sykmeldingApen()
            const mappedResult = mapSendSykmeldingValuesToV3Api(
                {
                    erOpplysningeneRiktige: YesOrNo.YES,
                    arbeidssituasjon: ArbeidssituasjonType.ARBEIDSLEDIG,
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
                arbeidsledig: null,
                fisker: null,
                arbeidsgiverOrgnummer: null,
                riktigNarmesteLeder: null,
                harBruktEgenmeldingsdager: null,
                egenmeldingsdager: null,
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                uriktigeOpplysninger: null,
            })
        })
    })
})
