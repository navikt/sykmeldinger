import { ArbeidssituasjonType, BrukerSvarFragment } from 'queries'

import { FormValues } from '../../../SendSykmelding/SendSykmeldingForm'
import { sporsmal } from '../../../../utils/sporsmal'
import { yesOrNoToJaEllerNei } from '../../../../server/sendSykmeldingMapping'
import { raise } from '../../../../utils/ts-utils'
import { mapToSendSykmeldingValues } from '../../../../utils/toSendSykmeldingUtils'

export type SporsmaltekstMetadata = {
    sykmeldingId: string
    arbeidsgiverNavn: string | null
    narmestelederNavn: string | null
    sykmeldingStartDato: string
}

export function mapFormValuesToBrukerSvar(
    formValues: FormValues,
    metadata: SporsmaltekstMetadata,
): Omit<BrukerSvarFragment, 'egenmeldingsperioder' | 'harBruktEgenmelding' | 'harForsikring'> {
    const sendSykmeldingValues = mapToSendSykmeldingValues(formValues)

    return {
        __typename: 'BrukerSvar',
        erOpplysningeneRiktige: sendSykmeldingValues.erOpplysningeneRiktige
            ? {
                  __typename: 'ErOpplysningeneRiktigeBrukerSvar',
                  sporsmaltekst: sporsmal.erOpplysningeneRiktige,
                  svar: yesOrNoToJaEllerNei(sendSykmeldingValues.erOpplysningeneRiktige),
              }
            : raise('Er opplysningene riktige må være satt'),
        uriktigeOpplysninger: sendSykmeldingValues.uriktigeOpplysninger
            ? {
                  __typename: 'UriktigeOpplysningerBrukerSvar',
                  sporsmaltekst: sporsmal.uriktigeOpplysninger,
                  svar: sendSykmeldingValues.uriktigeOpplysninger,
              }
            : null,
        arbeidssituasjon: sendSykmeldingValues.arbeidssituasjon
            ? {
                  __typename: 'ArbeidssituasjonBrukerSvar',
                  sporsmaltekst: sporsmal.arbeidssituasjon,
                  svar: sendSykmeldingValues.arbeidssituasjon,
              }
            : raise('Arbeidssitusajon er påkrevd'),
        arbeidsgiverOrgnummer: sendSykmeldingValues.arbeidsgiverOrgnummer
            ? {
                  __typename: 'ArbeidsgiverOrgnummerBrukerSvar',
                  sporsmaltekst: sporsmal.arbeidsgiverOrgnummer,
                  svar: sendSykmeldingValues.arbeidsgiverOrgnummer,
              }
            : null,
        riktigNarmesteLeder: sendSykmeldingValues.riktigNarmesteLeder
            ? {
                  __typename: 'RiktigNarmesteLederBrukerSvar',
                  sporsmaltekst: sporsmal.riktigNarmesteLeder(metadata.narmestelederNavn ?? ``),
                  svar: yesOrNoToJaEllerNei(sendSykmeldingValues.riktigNarmesteLeder),
              }
            : null,
        harBruktEgenmeldingsdager: sendSykmeldingValues.harEgenmeldingsdager
            ? {
                  __typename: 'HarBruktEgenmeldingsdagerBrukerSvar',
                  sporsmaltekst: sporsmal.harBruktEgenmeldingsdager(metadata.arbeidsgiverNavn ?? ``),
                  svar: yesOrNoToJaEllerNei(sendSykmeldingValues.harEgenmeldingsdager),
              }
            : null,
        egenmeldingsdager: sendSykmeldingValues.egenmeldingsdager
            ? {
                  __typename: 'EgenmeldingsdagerBrukerSvar',
                  sporsmaltekst: sporsmal.egenmeldingsdager,
                  svar: sendSykmeldingValues.egenmeldingsdager,
              }
            : null,
        fisker:
            sendSykmeldingValues.fisker != null
                ? {
                      __typename: 'FiskerBrukerSvar',
                      blad: {
                          __typename: 'BladBrukerSvar',
                          sporsmaltekst: sporsmal.fisker.velgBlad,
                          svar: sendSykmeldingValues.fisker.blad ?? raise('Blad må være satt'),
                      },
                      lottOgHyre: {
                          __typename: 'LottOgHyreBrukerSvar',
                          sporsmaltekst: sporsmal.fisker.lottEllerHyre,
                          svar: sendSykmeldingValues.fisker.lottOgHyre ?? raise('Lott og hyre må være satt'),
                      },
                  }
                : null,
        arbeidsledig:
            sendSykmeldingValues.arbeidsledig?.arbeidsledigFraOrgnummer != null
                ? {
                      __typename: 'ArbeidsledigBrukerSvar',
                      arbeidsledigFraOrgnummer: {
                          __typename: 'ArbeidsledigFraOrgnummerBrukerSvar',
                          sporsmaltekst: sporsmal.arbeidsledigFra(ArbeidssituasjonType.ARBEIDSLEDIG),
                          svar:
                              sendSykmeldingValues.arbeidsledig.arbeidsledigFraOrgnummer ??
                              raise('Orgnummer må være satt'),
                      },
                  }
                : null,
    }
}

export function mapFrilanserFormValuesToBrukerSvar(
    formValues: FormValues,
    oppfolgingsdato: string,
): Pick<BrukerSvarFragment, 'egenmeldingsperioder' | 'harBruktEgenmelding' | 'harForsikring'> {
    const sendSykmeldingValues = mapToSendSykmeldingValues(formValues)

    return {
        harForsikring:
            sendSykmeldingValues.harForsikring != null
                ? {
                      __typename: 'HarForsikringBrukerSvar',
                      sporsmaltekst: sporsmal.harForsikring,
                      svar: yesOrNoToJaEllerNei(sendSykmeldingValues.harForsikring),
                  }
                : null,
        harBruktEgenmelding: sendSykmeldingValues.harBruktEgenmelding
            ? {
                  __typename: 'HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar',
                  sporsmaltekst: sporsmal.harBruktEgenmelding(oppfolgingsdato),
                  svar: yesOrNoToJaEllerNei(sendSykmeldingValues.harBruktEgenmelding),
              }
            : null,
        egenmeldingsperioder: sendSykmeldingValues.egenmeldingsperioder
            ? {
                  __typename: 'FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar',
                  sporsmaltekst: sporsmal.egenmeldingsperioder(oppfolgingsdato),
                  svar: sendSykmeldingValues.egenmeldingsperioder.map((it) => ({
                      __typename: 'FomTom',
                      fom: it.fom ?? raise('Fom må være satt'),
                      tom: it.tom ?? raise('Tom må være satt'),
                  })),
              }
            : null,
    }
}
