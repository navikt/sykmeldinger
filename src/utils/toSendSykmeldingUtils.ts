import { SendSykmeldingValues, YesOrNo } from 'queries'

import { FormValues } from '../components/SendSykmelding/SendSykmeldingForm'
import { ArbeidssituasjonType } from '../server/graphql/resolver-types.generated'
import { EgenmeldingsdagerFormValue } from '../components/FormComponents/Egenmelding/EgenmeldingerField'

import { toDateString } from './dateUtils'

export function mapToSendSykmeldingValues(values: FormValues): SendSykmeldingValues {
    switch (values.arbeidssituasjon) {
        case ArbeidssituasjonType.ARBEIDSTAKER:
            return mapSykmeldingArbeidstaker(values)
        case ArbeidssituasjonType.FRILANSER:
        case ArbeidssituasjonType.NAERINGSDRIVENDE:
            return mapSykmeldingFrilansOrSelvstendig(values)
        case ArbeidssituasjonType.ARBEIDSLEDIG:
        case ArbeidssituasjonType.PERMITTERT:
        case ArbeidssituasjonType.ANNET:
            return mapSykmeldingArbeidsledigPermitertOrAnnet(values)
        default:
            throw new Error(`Illegal state: arbeidssituasjon ${values.arbeidssituasjon} is not valid.`)
    }
}

function mapSykmeldingArbeidstaker(values: FormValues): SendSykmeldingValues {
    return {
        erOpplysningeneRiktige: values.erOpplysningeneRiktige,
        uriktigeOpplysninger: values.uriktigeOpplysninger ?? undefined,
        arbeidssituasjon: values.arbeidssituasjon,
        arbeidsgiverOrgnummer: values.arbeidsgiverOrgnummer,
        riktigNarmesteLeder: values.riktigNarmesteLeder,
        harEgenmeldingsdager: getEgenmeldingsdager(values.egenmeldingsdager),
        egenmeldingsdager:
            values.egenmeldingsdager != null &&
            values.egenmeldingsdager.length > 0 &&
            values.egenmeldingsdager[0].harPerioder !== YesOrNo.NO
                ? mapEgenmeldingsdager(values.egenmeldingsdager)
                : undefined,
    }
}

function mapSykmeldingFrilansOrSelvstendig(values: FormValues): SendSykmeldingValues {
    return {
        erOpplysningeneRiktige: values.erOpplysningeneRiktige,
        uriktigeOpplysninger: values.uriktigeOpplysninger ?? undefined,
        arbeidssituasjon: values.arbeidssituasjon,
        harBruktEgenmelding: values.harBruktEgenmelding ?? undefined,
        egenmeldingsperioder:
            values.egenmeldingsperioder?.map((periode) => ({
                fom: periode.fom ? toDateString(periode.fom) : null,
                tom: periode.tom ? toDateString(periode.tom) : null,
            })) ?? undefined,
        harForsikring: values.harForsikring ?? undefined,
    }
}

function mapSykmeldingArbeidsledigPermitertOrAnnet(values: FormValues): SendSykmeldingValues {
    return {
        erOpplysningeneRiktige: values.erOpplysningeneRiktige,
        uriktigeOpplysninger: values.uriktigeOpplysninger ?? undefined,
        arbeidssituasjon: values.arbeidssituasjon,
    }
}

function getEgenmeldingsdager(value: FormValues['egenmeldingsdager']): SendSykmeldingValues['harEgenmeldingsdager'] {
    if (value == null || value.length === 0) return undefined

    return value[0].harPerioder
}

export function mapEgenmeldingsdager(value: EgenmeldingsdagerFormValue[]): readonly string[] {
    const dates = value.flatMap((dager) => dager.datoer).filter((it): it is Date => it != null)

    if (dates.length === 0) return []

    return dates.map(toDateString)
}
