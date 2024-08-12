import { Blad, LottOgHyre, SendSykmeldingValues, YesOrNo } from 'queries'

import { FormValues } from '../components/SendSykmelding/SendSykmeldingForm'
import { ArbeidssituasjonType } from '../server/graphql/resolver-types.generated'
import { EgenmeldingsdagerFormValue } from '../components/FormComponents/Egenmelding/EgenmeldingerField'

import { toDateString } from './dateUtils'

export function mapToSendSykmeldingValues(values: FormValues): SendSykmeldingValues {
    switch (values.arbeidssituasjon) {
        case ArbeidssituasjonType.ARBEIDSTAKER:
            return mapSykmeldingArbeidstaker(values)
        case ArbeidssituasjonType.FISKER:
            return mapSykmeldingFisker(values)
        case ArbeidssituasjonType.FRILANSER:
        case ArbeidssituasjonType.NAERINGSDRIVENDE:
        case ArbeidssituasjonType.JORDBRUKER:
            return mapSykmeldingFrilansOrSelvstendigOrJordbruker(values)
        case ArbeidssituasjonType.ARBEIDSLEDIG:
        case ArbeidssituasjonType.PERMITTERT:
            return mapSykmeldingArbiedsledigOrPermittert(values)
        case ArbeidssituasjonType.ANNET:
            return mapSykmeldingAnnet(values)
        default:
            throw new Error(`Illegal state: arbeidssituasjon ${values.arbeidssituasjon} is not valid.`)
    }
}

function mapSykmeldingArbeidstaker(values: FormValues): SendSykmeldingValues {
    const hasEgenmeldingsdager = getHasEgenmeldingsdager(values.egenmeldingsdager)

    return {
        erOpplysningeneRiktige: values.erOpplysningeneRiktige,
        uriktigeOpplysninger: values.erOpplysningeneRiktige === YesOrNo.NO ? values.uriktigeOpplysninger : undefined,
        arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
        arbeidsgiverOrgnummer: values.arbeidsgiverOrgnummer,
        riktigNarmesteLeder: values.riktigNarmesteLeder,
        harEgenmeldingsdager: hasEgenmeldingsdager,
        egenmeldingsdager:
            hasEgenmeldingsdager === YesOrNo.YES &&
            values.egenmeldingsdager != null &&
            values.egenmeldingsdager.length > 0
                ? getEgenmeldingsdagerDateList(values.egenmeldingsdager)
                : undefined,
    }
}

function mapSykmeldingFisker(values: FormValues): SendSykmeldingValues {
    const baseFields = {
        erOpplysningeneRiktige: values.erOpplysningeneRiktige,
        uriktigeOpplysninger: values.erOpplysningeneRiktige === YesOrNo.NO ? values.uriktigeOpplysninger : undefined,
        arbeidssituasjon: ArbeidssituasjonType.FISKER,
        fisker: {
            blad: values.fisker.blad,
            lottOgHyre: values.fisker.lottOgHyre,
        },
    } satisfies SendSykmeldingValues

    // In essence an arbeidstaker when LottOgHyre is HYRE or BEGGE
    if (values.fisker.lottOgHyre === LottOgHyre.HYRE || values.fisker.lottOgHyre === LottOgHyre.BEGGE) {
        const hasEgenmeldingsdager = getHasEgenmeldingsdager(values.egenmeldingsdager)

        return {
            ...baseFields,
            arbeidsgiverOrgnummer: values.arbeidsgiverOrgnummer,
            riktigNarmesteLeder: values.riktigNarmesteLeder,
            harEgenmeldingsdager: hasEgenmeldingsdager,
            egenmeldingsdager:
                hasEgenmeldingsdager === YesOrNo.YES &&
                values.egenmeldingsdager != null &&
                values.egenmeldingsdager.length > 0
                    ? getEgenmeldingsdagerDateList(values.egenmeldingsdager)
                    : undefined,
        }
    } else {
        const egenmeldingsperioder =
            values.egenmeldingsperioder?.map((periode) => ({
                fom: periode.fom ? toDateString(periode.fom) : null,
                tom: periode.tom ? toDateString(periode.tom) : null,
            })) ?? undefined

        return {
            ...baseFields,
            harBruktEgenmelding: values.harBruktEgenmelding ?? undefined,
            egenmeldingsperioder: values.harBruktEgenmelding === YesOrNo.YES ? egenmeldingsperioder : undefined,
            harForsikring: values.fisker.blad === Blad.A ? (values.harForsikring ?? undefined) : undefined,
        }
    }
}

function mapSykmeldingFrilansOrSelvstendigOrJordbruker(values: FormValues): SendSykmeldingValues {
    const egenmeldingsperioder =
        values.egenmeldingsperioder?.map((periode) => ({
            fom: periode.fom ? toDateString(periode.fom) : null,
            tom: periode.tom ? toDateString(periode.tom) : null,
        })) ?? undefined

    return {
        erOpplysningeneRiktige: values.erOpplysningeneRiktige,
        uriktigeOpplysninger: values.erOpplysningeneRiktige === YesOrNo.NO ? values.uriktigeOpplysninger : undefined,
        arbeidssituasjon: values.arbeidssituasjon,
        harBruktEgenmelding: values.harBruktEgenmelding ?? undefined,
        egenmeldingsperioder: values.harBruktEgenmelding === YesOrNo.YES ? egenmeldingsperioder : undefined,
        harForsikring: values.harForsikring ?? undefined,
    }
}

function mapSykmeldingArbiedsledigOrPermittert(values: FormValues): SendSykmeldingValues {
    return {
        erOpplysningeneRiktige: values.erOpplysningeneRiktige,
        uriktigeOpplysninger: values.erOpplysningeneRiktige === YesOrNo.NO ? values.uriktigeOpplysninger : undefined,
        arbeidssituasjon: values.arbeidssituasjon,
        arbeidsledig:
            values.arbeidsledig?.arbeidsledigFraOrgnummer && values.arbeidsledig?.arbeidsledigFraOrgnummer !== 'ingen'
                ? {
                      arbeidsledigFraOrgnummer: values.arbeidsledig.arbeidsledigFraOrgnummer,
                  }
                : undefined,
    }
}

function mapSykmeldingAnnet(values: FormValues): SendSykmeldingValues {
    return {
        erOpplysningeneRiktige: values.erOpplysningeneRiktige,
        uriktigeOpplysninger: values.erOpplysningeneRiktige === YesOrNo.NO ? values.uriktigeOpplysninger : undefined,
        arbeidssituasjon: values.arbeidssituasjon,
    }
}

function getHasEgenmeldingsdager(value: FormValues['egenmeldingsdager']): SendSykmeldingValues['harEgenmeldingsdager'] {
    if (value == null || value.length === 0) return undefined

    return value[0].harPerioder
}

export function getEgenmeldingsdagerDateList(value: EgenmeldingsdagerFormValue[]): readonly string[] {
    const dates = value.flatMap((dager) => dager.datoer).filter((it): it is Date => it != null)

    if (dates.length === 0) return []

    return dates.map(toDateString)
}
