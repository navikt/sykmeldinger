import { logger } from '@navikt/next-logger'

import { sporsmal } from '../utils/sporsmal'
import { getSykmeldingStartDate } from '../utils/sykmeldingUtils'
import { raise } from '../utils/ts-utils'
import { isFrilanserOrNaeringsdrivendeOrJordbruker } from '../utils/arbeidssituasjonUtils'

import { ArbeidssituasjonType, JaEllerNei, SendSykmeldingValues, YesOrNo } from './graphql/resolver-types.generated'
import { SykmeldingUserEventV3Api } from './api-models/SendSykmelding'
import { Brukerinformasjon } from './api-models/Brukerinformasjon'
import { ErUtenforVentetid } from './api-models/ErUtenforVentetid'
import { Sykmelding } from './api-models/sykmelding/Sykmelding'

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

    if (
        isFrilanserOrNaeringsdrivendeOrJordbruker(values.arbeidssituasjon) &&
        !erUtenforVentetid.erUtenforVentetid &&
        values.harForsikring == null
    ) {
        throw new Error(
            'Illegal state: harForsikring is required for frilanser, naeringsdrivende and jordbruker when is inside ventyTid',
        )
    }

    const oppfolgingsdato = erUtenforVentetid.oppfolgingsdato || getSykmeldingStartDate(sykmelding.sykmeldingsperioder)

    return {
        erOpplysningeneRiktige: {
            svar: yesOrNoToJaEllerNei(values.erOpplysningeneRiktige),
            sporsmaltekst: sporsmal.erOpplysningeneRiktige,
        },
        arbeidssituasjon: {
            svar: arbeidssituasjonWithPermittertFallback(values.arbeidssituasjon),
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
                      svar: yesOrNoToJaEllerNei(values.riktigNarmesteLeder),
                      sporsmaltekst: sporsmal.riktigNarmesteLeder(valgtNarmesteLederNavn),
                  }
                : null,
        harBruktEgenmelding: values.harBruktEgenmelding
            ? {
                  svar: yesOrNoToJaEllerNei(values.harBruktEgenmelding),
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
                  svar: yesOrNoToJaEllerNei(values.harForsikring),
                  sporsmaltekst: sporsmal.harForsikring,
              }
            : null,
        uriktigeOpplysninger: values.uriktigeOpplysninger
            ? {
                  svar: values.uriktigeOpplysninger,
                  sporsmaltekst: sporsmal.uriktigeOpplysninger,
              }
            : null,
        harBruktEgenmeldingsdager:
            values.harEgenmeldingsdager && valgtArbeidsgiver
                ? {
                      svar: yesOrNoToJaEllerNei(values.harEgenmeldingsdager),
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
                      : raise('Illegal state: blad is required when arbeidssituasjon is fisker'),
                  lottOgHyre: values.fisker.lottOgHyre
                      ? {
                            sporsmaltekst: sporsmal.fisker.lottEllerHyre,
                            svar: values.fisker.lottOgHyre,
                        }
                      : raise('Illegal state: lottOgHyre is required when arbeidssituasjon is fisker'),
              }
            : null,
        arbeidsledig: values.arbeidsledig?.arbeidsledigFraOrgnummer
            ? {
                  arbeidsledigFraOrgnummer: {
                      sporsmaltekst: sporsmal.arbeidsledigFra(ArbeidssituasjonType.ARBEIDSLEDIG),
                      svar: values.arbeidsledig.arbeidsledigFraOrgnummer,
                  },
              }
            : null,
    }
}

export function yesOrNoToJaEllerNei(value: YesOrNo): JaEllerNei {
    return value === YesOrNo.YES ? JaEllerNei.JA : JaEllerNei.NEI
}

function arbeidssituasjonWithPermittertFallback(value: ArbeidssituasjonType): ArbeidssituasjonType {
    switch (value) {
        // Permittert falls back to arbeidsledig in the API, this is intentional
        case ArbeidssituasjonType.ARBEIDSLEDIG:
        case ArbeidssituasjonType.PERMITTERT:
            return ArbeidssituasjonType.ARBEIDSLEDIG
        default:
            return value
    }
}
