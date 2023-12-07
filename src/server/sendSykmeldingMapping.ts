import { logger } from '@navikt/next-logger'

import { FiskerInput, LottOgHyre } from 'queries'

import { sporsmal } from '../utils/sporsmal'
import { getSykmeldingStartDate } from '../utils/sykmeldingUtils'

import {
    ArbeidssituasjonType,
    SendSykmeldingValues,
    UriktigeOpplysningerType,
    YesOrNo,
} from './graphql/resolver-types.generated'
import { ArbeidssituasjonV3, SykmeldingUserEventV3Api, UriktigeOpplysningerV3 } from './api-models/SendSykmelding'
import { Brukerinformasjon } from './api-models/Brukerinformasjon'
import { ErUtenforVentetid } from './api-models/ErUtenforVentetid'
import { Sykmelding } from './api-models/sykmelding/Sykmelding'
import { JaEllerNei } from './api-models/sykmelding/SykmeldingStatus'

export function mapSendSykmeldingValuesToV3Api(
    values: SendSykmeldingValues,
    sykmelding: Sykmelding,
    brukerinformasjon: Brukerinformasjon,
    erUtenforVentetid: ErUtenforVentetid,
): SykmeldingUserEventV3Api {
    if (values.arbeidssituasjon == null) throw new Error('Illegal state: arbeidssituasjon is required')
    if (values.erOpplysningeneRiktige == null) throw new Error('Illegal state: erOpplysningeneRiktige is required')

    const valgtArbeidsgiver = brukerinformasjon.arbeidsgivere.find(
        (arbeidsgiver) => arbeidsgiver.orgnummer === values.arbeidsgiverOrgnummer,
    )
    const valgtNarmesteLederNavn: string | null = valgtArbeidsgiver?.naermesteLeder?.navn ?? null

    if (
        values.arbeidsgiverOrgnummer != null &&
        valgtArbeidsgiver?.aktivtArbeidsforhold &&
        values.riktigNarmesteLeder != null &&
        valgtNarmesteLederNavn == null
    ) {
        logger.warn(
            `Illegal state: unable to find narmeste leder for selected aktive arbeidsgiver ${values.arbeidsgiverOrgnummer}. SykmeldingId: ${sykmelding.id}`,
        )
    }

    const oppfolgingsdato = erUtenforVentetid.oppfolgingsdato || getSykmeldingStartDate(sykmelding.sykmeldingsperioder)

    return {
        erOpplysningeneRiktige: {
            svar: yesOrNoTypeToV3Enum(values.erOpplysningeneRiktige),
            sporsmaltekst: sporsmal.erOpplysningeneRiktige,
        },
        arbeidssituasjon: {
            svar: arbeidssituasjonTypeToV3Enum(values.arbeidssituasjon, values.fisker),
            sporsmaltekst: sporsmal.arbeidssituasjon,
        },
        arbeidsgiverOrgnummer: values.arbeidsgiverOrgnummer
            ? {
                  svar: values.arbeidsgiverOrgnummer,
                  sporsmaltekst: sporsmal.arbeidsgiverOrgnummer,
              }
            : null,
        riktigNarmesteLeder:
            values.riktigNarmesteLeder && valgtNarmesteLederNavn != null
                ? {
                      svar: yesOrNoTypeToV3Enum(values.riktigNarmesteLeder),
                      sporsmaltekst: sporsmal.riktigNarmesteLeder(valgtNarmesteLederNavn),
                  }
                : null,
        harBruktEgenmelding: values.harBruktEgenmelding
            ? {
                  svar: yesOrNoTypeToV3Enum(values.harBruktEgenmelding),
                  sporsmaltekst: sporsmal.harBruktEgenmelding(oppfolgingsdato),
              }
            : null,
        egenmeldingsperioder:
            values.egenmeldingsperioder && erUtenforVentetid.oppfolgingsdato != null
                ? {
                      svar: values.egenmeldingsperioder.map((periode) => {
                          if (periode.fom == null || periode.tom == null) {
                              throw new Error('Illegal state: periode.fom and periode.tom is required')
                          }

                          return {
                              fom: periode.fom,
                              tom: periode.tom,
                          }
                      }),
                      sporsmaltekst: sporsmal.egenmeldingsperioder(oppfolgingsdato),
                  }
                : null,
        harForsikring: values.harForsikring
            ? {
                  svar: yesOrNoTypeToV3Enum(values.harForsikring),
                  sporsmaltekst: sporsmal.harForsikring,
              }
            : null,
        uriktigeOpplysninger: values.uriktigeOpplysninger
            ? {
                  svar: values.uriktigeOpplysninger.map(uriktigeOpplysningerTypeToV3Enum),
                  sporsmaltekst: sporsmal.uriktigeOpplysninger,
              }
            : null,
        harBruktEgenmeldingsdager:
            values.harEgenmeldingsdager && valgtArbeidsgiver
                ? {
                      svar: yesOrNoTypeToV3Enum(values.harEgenmeldingsdager),
                      sporsmaltekst: sporsmal.harBruktEgenmeldingsdager(valgtArbeidsgiver.navn),
                  }
                : null,
        egenmeldingsdager: values.egenmeldingsdager
            ? {
                  svar: values.egenmeldingsdager,
                  sporsmaltekst: sporsmal.egenmeldingsdager,
              }
            : null,
        fisker: values.fisker
            ? {
                  blad: values.fisker.blad
                      ? {
                            sporsmaltekst: sporsmal.fisker.velgBlad,
                            svar: values.fisker.blad,
                        }
                      : null,
                  lottOgHyre: values.fisker.lottOgHyre
                      ? {
                            sporsmaltekst: sporsmal.fisker.lottEllerHyre,
                            svar: values.fisker.lottOgHyre,
                        }
                      : null,
              }
            : null,
    }
}

function yesOrNoTypeToV3Enum(value: YesOrNo): JaEllerNei {
    return value === YesOrNo.YES ? JaEllerNei.JA : JaEllerNei.NEI
}

function arbeidssituasjonTypeToV3Enum(
    value: ArbeidssituasjonType,
    fisker: FiskerInput | null | undefined,
): ArbeidssituasjonV3 {
    switch (value) {
        // Permittert falls back to arbeidsledig in the API, this is intentional
        case ArbeidssituasjonType.ARBEIDSLEDIG:
        case ArbeidssituasjonType.PERMITTERT:
            return ArbeidssituasjonV3.ARBEIDSLEDIG
        case ArbeidssituasjonType.ARBEIDSTAKER:
            return ArbeidssituasjonV3.ARBEIDSTAKER
        case ArbeidssituasjonType.FISKER:
            if (fisker == null) throw new Error('Illegal state: Can not be fisker without lottOgHyre option')

            return fisker.lottOgHyre === LottOgHyre.HYRE
                ? ArbeidssituasjonV3.ARBEIDSTAKER
                : ArbeidssituasjonV3.NAERINGSDRIVENDE
        case ArbeidssituasjonType.FRILANSER:
            return ArbeidssituasjonV3.FRILANSER
        case ArbeidssituasjonType.NAERINGSDRIVENDE:
            return ArbeidssituasjonV3.NAERINGSDRIVENDE
        case ArbeidssituasjonType.ANNET:
            return ArbeidssituasjonV3.ANNET
    }
}

function uriktigeOpplysningerTypeToV3Enum(value: UriktigeOpplysningerType): UriktigeOpplysningerV3 {
    switch (value) {
        case UriktigeOpplysningerType.ANDRE_OPPLYSNINGER:
            return UriktigeOpplysningerV3.ANDRE_OPPLYSNINGER
        case UriktigeOpplysningerType.ARBEIDSGIVER:
            return UriktigeOpplysningerV3.ARBEIDSGIVER
        case UriktigeOpplysningerType.DIAGNOSE:
            return UriktigeOpplysningerV3.DIAGNOSE
        case UriktigeOpplysningerType.PERIODE:
            return UriktigeOpplysningerV3.PERIODE
        case UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_HOY:
            return UriktigeOpplysningerV3.SYKMELDINGSGRAD_FOR_HOY
        case UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_LAV:
            return UriktigeOpplysningerV3.SYKMELDINGSGRAD_FOR_LAV
    }
}
