import { sporsmolOgSvar } from '../utils/sporsmolOgSvar'
import { getSykmeldingStartDate } from '../utils/sykmeldingUtils'

import {
    ArbeidssituasjonType,
    SendSykmeldingValues,
    Sykmelding,
    UriktigeOpplysningerType,
    YesOrNo,
} from './graphql/resolver-types.generated'
import {
    ArbeidssituasjonV3,
    JaEllerNeiV3,
    SykmeldingUserEventV3Api,
    UriktigeOpplysningerV3,
} from './api-models/SendSykmelding'
import { Brukerinformasjon } from './api-models/Brukerinformasjon'
import { ErUtenforVentetid } from './api-models/ErUtenforVentetid'

export function mapSendSykmeldingValuesToV3Api(
    values: SendSykmeldingValues,
    sykmelding: Sykmelding,
    brukerinformasjon: Brukerinformasjon,
    erUtenforVentetid: ErUtenforVentetid,
): SykmeldingUserEventV3Api {
    if (values.arbeidssituasjon == null) throw new Error('Illegal state: arbeidssituasjon is required')
    if (values.erOpplysningeneRiktige == null) throw new Error('Illegal state: erOpplysningeneRiktige is required')

    const valgtNarmesteLederNavn: string | null =
        brukerinformasjon.arbeidsgivere.find((arbeidsgiver) => arbeidsgiver.orgnummer === values.arbeidsgiverOrgnummer)
            ?.naermesteLeder?.navn ?? null

    if (values.arbeidsgiverOrgnummer != null && valgtNarmesteLederNavn == null) {
        throw new Error(
            `Illegal state: unable to find narmeste leder for selected arbeidsgiver ${values.arbeidsgiverOrgnummer}`,
        )
    }

    const oppfolgingsdato = erUtenforVentetid.oppfolgingsdato || getSykmeldingStartDate(sykmelding)

    return {
        erOpplysningeneRiktige: {
            svar: yesOrNoTypeToV3Enum(values.erOpplysningeneRiktige),
            sporsmaltekst: sporsmolOgSvar.erOpplysningeneRiktige.sporsmaltekst,
            svartekster: sporsmolOgSvar.erOpplysningeneRiktige.svartekster,
        },
        arbeidssituasjon: {
            svar: arbeidssituasjonTypeToV3Enum(values.arbeidssituasjon),
            sporsmaltekst: sporsmolOgSvar.arbeidssituasjon.sporsmaltekst,
            svartekster: sporsmolOgSvar.arbeidssituasjon.svartekster,
        },
        arbeidsgiverOrgnummer: values.arbeidsgiverOrgnummer
            ? {
                  svar: values.arbeidsgiverOrgnummer,
                  sporsmaltekst: sporsmolOgSvar.arbeidsgiverOrgnummer.sporsmaltekst,
                  svartekster: JSON.stringify(
                      sporsmolOgSvar.arbeidsgiverOrgnummer.svartekster(brukerinformasjon.arbeidsgivere),
                  ),
              }
            : null,
        riktigNarmesteLeder:
            values.riktigNarmesteLeder && valgtNarmesteLederNavn != null
                ? {
                      svar: yesOrNoTypeToV3Enum(values.riktigNarmesteLeder),
                      sporsmaltekst: sporsmolOgSvar.riktigNarmesteLeder.sporsmalstekst(valgtNarmesteLederNavn),
                      svartekster: sporsmolOgSvar.riktigNarmesteLeder.svartekster,
                  }
                : null,
        harBruktEgenmelding: values.harBruktEgenmelding
            ? {
                  svar: yesOrNoTypeToV3Enum(values.harBruktEgenmelding),
                  sporsmaltekst: sporsmolOgSvar.harBruktEgenmelding.sporsmaltekst(oppfolgingsdato),
                  svartekster: sporsmolOgSvar.harBruktEgenmelding.svartekster,
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
                      sporsmaltekst: sporsmolOgSvar.egenmeldingsperioder.sporsmaltekst(oppfolgingsdato),
                      svartekster: sporsmolOgSvar.egenmeldingsperioder.svartekster,
                  }
                : null,
        harForsikring: values.harForsikring
            ? {
                  svar: yesOrNoTypeToV3Enum(values.harForsikring),
                  sporsmaltekst: sporsmolOgSvar.harForsikring.sporsmaltekst,
                  svartekster: sporsmolOgSvar.harForsikring.svartekster,
              }
            : null,
        uriktigeOpplysninger: values.uriktigeOpplysninger
            ? {
                  svar: values.uriktigeOpplysninger.map(uriktigeOpplysningerTypeToV3Enum),
                  sporsmaltekst: sporsmolOgSvar.uriktigeOpplysninger.sporsmaltekst,
                  svartekster: sporsmolOgSvar.uriktigeOpplysninger.svartekster,
              }
            : null,
    }
}

function yesOrNoTypeToV3Enum(value: YesOrNo): JaEllerNeiV3 {
    return value === YesOrNo.Yes ? JaEllerNeiV3.JA : JaEllerNeiV3.NEI
}

function arbeidssituasjonTypeToV3Enum(value: ArbeidssituasjonType): ArbeidssituasjonV3 {
    switch (value) {
        case ArbeidssituasjonType.Arbeidsledig:
            return ArbeidssituasjonV3.ARBEIDSLEDIG
        case ArbeidssituasjonType.Arbeidstaker:
            return ArbeidssituasjonV3.ARBEIDSTAKER
        case ArbeidssituasjonType.Frilanser:
            return ArbeidssituasjonV3.FRILANSER
        case ArbeidssituasjonType.Naeringsdrivende:
            return ArbeidssituasjonV3.NAERINGSDRIVENDE
        case ArbeidssituasjonType.Permittert:
            // TODO ???
            return ArbeidssituasjonV3.ANNET
        case ArbeidssituasjonType.Annet:
            return ArbeidssituasjonV3.ANNET
    }
}

function uriktigeOpplysningerTypeToV3Enum(value: UriktigeOpplysningerType): UriktigeOpplysningerV3 {
    switch (value) {
        case UriktigeOpplysningerType.AndreOpplysninger:
            return UriktigeOpplysningerV3.ANDRE_OPPLYSNINGER
        case UriktigeOpplysningerType.Arbeidsgiver:
            return UriktigeOpplysningerV3.ARBEIDSGIVER
        case UriktigeOpplysningerType.Diagnose:
            return UriktigeOpplysningerV3.DIAGNOSE
        case UriktigeOpplysningerType.Periode:
            return UriktigeOpplysningerV3.PERIODE
        case UriktigeOpplysningerType.SykmeldingsgradForHoy:
            return UriktigeOpplysningerV3.SYKMELDINGSGRAD_FOR_HOY
        case UriktigeOpplysningerType.SykmeldingsgradForLav:
            return UriktigeOpplysningerV3.SYKMELDINGSGRAD_FOR_LAV
    }
}
