import { describe, expect, it } from 'vitest'

import { ArbeidssituasjonType, UriktigeOpplysningerType } from 'queries'

import { FormValues } from '../components/SendSykmelding/SendSykmeldingForm'
import { SendSykmeldingValues, YesOrNo } from '../server/graphql/resolver-types.generated'

import { mapToSendSykmeldingValues } from './toSendSykmeldingUtils'
import { toDate } from './dateUtils'

describe('toSendSykmeldingUtils', () => {
    describe('ARBEIDSTAKER', () => {
        it('should map sykmelding for arbeidstaker with egenmeldingsdager', () => {
            const formValues: FormValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                uriktigeOpplysninger: null,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '12345',
                riktigNarmesteLeder: YesOrNo.YES,
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                egenmeldingsdager: [
                    {
                        harPerioder: YesOrNo.YES,
                        datoer: [toDate('2023-09-05'), toDate('2023-09-06')],
                        hasClickedVidere: true,
                    },
                    {
                        harPerioder: YesOrNo.YES,
                        datoer: [toDate('2023-08-23')],
                        hasClickedVidere: true,
                    },
                    {
                        harPerioder: YesOrNo.NO,
                        datoer: [],
                        hasClickedVidere: null,
                    },
                ],
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '12345',
                riktigNarmesteLeder: YesOrNo.YES,
                egenmeldingsdager: ['2023-09-05', '2023-09-06', '2023-08-23'],
                harEgenmeldingsdager: YesOrNo.YES,
            }

            expect(mapToValues).toEqual(expectValues)
        })

        it('should map sykmelding for arbeidstaker without egenmeldingsdager (was never asked)', () => {
            const formValues: FormValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                uriktigeOpplysninger: null,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '12345',
                riktigNarmesteLeder: YesOrNo.YES,
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                egenmeldingsdager: null,
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '12345',
                riktigNarmesteLeder: YesOrNo.YES,
            }

            expect(mapToValues).toEqual(expectValues)
        })

        it('should map sykmelding for arbeidstaker without egenmeldingsdager', () => {
            const formValues: FormValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                uriktigeOpplysninger: null,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '12345',
                riktigNarmesteLeder: YesOrNo.YES,
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                egenmeldingsdager: [
                    {
                        harPerioder: YesOrNo.NO,
                        datoer: null,
                        hasClickedVidere: true,
                    },
                ],
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '12345',
                riktigNarmesteLeder: YesOrNo.YES,
                harEgenmeldingsdager: YesOrNo.NO,
            }

            expect(mapToValues).toEqual(expectValues)
        })

        it('should map sykmelding for arbeidstaker without egenmeldingsdager, even if list has egenmeldingsdager', () => {
            const formValues: FormValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                uriktigeOpplysninger: null,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '12345',
                riktigNarmesteLeder: YesOrNo.YES,
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                egenmeldingsdager: [
                    {
                        harPerioder: YesOrNo.NO,
                        datoer: null,
                        hasClickedVidere: true,
                    },
                    {
                        harPerioder: YesOrNo.YES,
                        datoer: [toDate('2023-09-05'), toDate('2023-09-06')],
                        hasClickedVidere: true,
                    },
                ],
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '12345',
                riktigNarmesteLeder: YesOrNo.YES,
                harEgenmeldingsdager: YesOrNo.NO,
            }

            expect(mapToValues).toEqual(expectValues)
        })

        it('should map sykmelding for arbeidstaker with uriktigeOpplysninger', () => {
            const formValues = {
                erOpplysningeneRiktige: YesOrNo.NO,
                uriktigeOpplysninger: [
                    UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_HOY,
                    UriktigeOpplysningerType.DIAGNOSE,
                ],
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '67890',
                riktigNarmesteLeder: YesOrNo.NO,
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                egenmeldingsdager: null,
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.NO,
                uriktigeOpplysninger: [
                    UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_HOY,
                    UriktigeOpplysningerType.DIAGNOSE,
                ],
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                arbeidsgiverOrgnummer: '67890',
                riktigNarmesteLeder: YesOrNo.NO,
            }

            expect(mapToValues).toEqual(expectValues)
        })
    })

    describe('FRILANSER, NAERINGSDRIVENDE ', () => {
        it('should map sykmelding for frilanser with egenmeldingsperioder', () => {
            const formValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                uriktigeOpplysninger: null,
                arbeidssituasjon: ArbeidssituasjonType.FRILANSER,
                arbeidsgiverOrgnummer: null,
                riktigNarmesteLeder: null,
                harBruktEgenmelding: YesOrNo.YES,
                egenmeldingsperioder: [{ fom: toDate('2023-03-09'), tom: toDate('2023-03-12') }],
                harForsikring: YesOrNo.YES,
                egenmeldingsdager: null,
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.FRILANSER,
                harBruktEgenmelding: YesOrNo.YES,
                egenmeldingsperioder: [
                    {
                        fom: '2023-03-09',
                        tom: '2023-03-12',
                    },
                ],
                harForsikring: YesOrNo.YES,
            }

            expect(mapToValues).toEqual(expectValues)
        })

        it('should map sykmelding for frilanser without egenmeldingsperioder', () => {
            const formValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                uriktigeOpplysninger: null,
                arbeidssituasjon: ArbeidssituasjonType.FRILANSER,
                arbeidsgiverOrgnummer: null,
                riktigNarmesteLeder: null,
                harBruktEgenmelding: YesOrNo.NO,
                egenmeldingsperioder: [{ fom: null, tom: null }],
                harForsikring: YesOrNo.NO,
                egenmeldingsdager: null,
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.FRILANSER,
                harBruktEgenmelding: YesOrNo.NO,
                harForsikring: YesOrNo.NO,
            }

            expect(mapToValues).toEqual(expectValues)
        })

        it('should map sykmelding for frilanser without egenmeldingsperioder where first yes then no', () => {
            const formValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                uriktigeOpplysninger: null,
                arbeidssituasjon: ArbeidssituasjonType.FRILANSER,
                arbeidsgiverOrgnummer: null,
                riktigNarmesteLeder: null,
                harBruktEgenmelding: YesOrNo.NO,
                egenmeldingsperioder: [
                    { fom: toDate('2023-03-09'), tom: toDate('2023-03-12') },
                    { fom: null, tom: null },
                ],
                harForsikring: YesOrNo.NO,
                egenmeldingsdager: null,
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.FRILANSER,
                harBruktEgenmelding: YesOrNo.NO,
                harForsikring: YesOrNo.NO,
            }

            expect(mapToValues).toEqual(expectValues)
        })

        it('should map sykmelding for naeringsdrivende with uriktigeOpplysninger', () => {
            const formValues = {
                erOpplysningeneRiktige: YesOrNo.NO,
                uriktigeOpplysninger: [UriktigeOpplysningerType.ANDRE_OPPLYSNINGER],
                arbeidssituasjon: ArbeidssituasjonType.NAERINGSDRIVENDE,
                arbeidsgiverOrgnummer: null,
                riktigNarmesteLeder: null,
                harBruktEgenmelding: YesOrNo.NO,
                egenmeldingsperioder: null,
                harForsikring: YesOrNo.NO,
                egenmeldingsdager: null,
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.NO,
                uriktigeOpplysninger: [UriktigeOpplysningerType.ANDRE_OPPLYSNINGER],
                arbeidssituasjon: ArbeidssituasjonType.NAERINGSDRIVENDE,
                harBruktEgenmelding: YesOrNo.NO,
                harForsikring: YesOrNo.NO,
            }

            expect(mapToValues).toEqual(expectValues)
        })
    })

    describe('ARBEIDSLEDIG, PERMITTERT, ANNET', () => {
        it('should map sykmelding for arbeidsledig', () => {
            const formValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                uriktigeOpplysninger: null,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSLEDIG,
                arbeidsgiverOrgnummer: null,
                riktigNarmesteLeder: null,
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                egenmeldingsdager: null,
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSLEDIG,
            }

            expect(mapToValues).toEqual(expectValues)
        })

        it('should map sykmelding for permittert', () => {
            const formValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                uriktigeOpplysninger: null,
                arbeidssituasjon: ArbeidssituasjonType.PERMITTERT,
                arbeidsgiverOrgnummer: null,
                riktigNarmesteLeder: null,
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                egenmeldingsdager: null,
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.PERMITTERT,
            }

            expect(mapToValues).toEqual(expectValues)
        })

        it('should map sykmelding for annet with uriktigeOpplysninger', () => {
            const formValues = {
                erOpplysningeneRiktige: YesOrNo.NO,
                uriktigeOpplysninger: [UriktigeOpplysningerType.ANDRE_OPPLYSNINGER],
                arbeidssituasjon: ArbeidssituasjonType.ANNET,
                arbeidsgiverOrgnummer: null,
                riktigNarmesteLeder: null,
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                egenmeldingsdager: null,
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.NO,
                uriktigeOpplysninger: [UriktigeOpplysningerType.ANDRE_OPPLYSNINGER],
                arbeidssituasjon: ArbeidssituasjonType.ANNET,
            }

            expect(mapToValues).toEqual(expectValues)
        })

        it('should map sykmelding for annet with uriktigeOpplysninger when first answers no, then changes to yes', () => {
            const formValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                uriktigeOpplysninger: [UriktigeOpplysningerType.ANDRE_OPPLYSNINGER],
                arbeidssituasjon: ArbeidssituasjonType.ANNET,
                arbeidsgiverOrgnummer: null,
                riktigNarmesteLeder: null,
                harBruktEgenmelding: null,
                egenmeldingsperioder: null,
                harForsikring: null,
                egenmeldingsdager: null,
                egenmeldingsdagerHitPrevious: null,
            }

            const mapToValues = mapToSendSykmeldingValues(formValues)
            const expectValues: SendSykmeldingValues = {
                erOpplysningeneRiktige: YesOrNo.YES,
                arbeidssituasjon: ArbeidssituasjonType.ANNET,
            }

            expect(mapToValues).toEqual(expectValues)
        })
    })
})
