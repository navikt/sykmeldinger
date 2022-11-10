import { sporsmolOgSvar } from '../utils/sporsmolOgSvar'

import { ArbeidssituasjonType, SendSykmeldingValues, YesOrNo } from './graphql/resolver-types.generated'
import { ArbeidssituasjonV3, JaEllerNeiV3, SykmeldingUserEventV3Api } from './api-models/SendSykmelding'

export function mapSendSykmeldingValuesToV3Api(values: SendSykmeldingValues): SykmeldingUserEventV3Api {
    if (values.arbeidssituasjon == null) throw new Error('Illegal state: arbeidssituasjon is required')
    if (values.erOpplysningeneRiktige == null) throw new Error('Illegal state: erOpplysningeneRiktige is required')

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
        egenmeldingsperioder: null,
        harBruktEgenmelding: null,
        harForsikring: null,
        riktigNarmesteLeder: null,
        uriktigeOpplysninger: null,
        arbeidsgiverOrgnummer: null,
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
