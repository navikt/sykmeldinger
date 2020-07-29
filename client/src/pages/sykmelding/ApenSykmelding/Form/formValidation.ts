import { ValidationFunctions } from '../../../commonComponents/hooks/useForm';
import { FormInputs, Arbeidssituasjoner } from '../../../../types/form';

const validationFunctions: ValidationFunctions<FormInputs> = {
    opplysningeneErRiktige: (state) => {
        if (state.opplysningeneErRiktige === undefined) {
            return 'Du må svare på om opplysningene er riktige.';
        }
    },
    feilaktigeOpplysninger: (state) => {
        if (state.opplysningeneErRiktige === false) {
            if (!state.feilaktigeOpplysninger || !state.feilaktigeOpplysninger?.length) {
                return 'Du må velge minst ett av alternativene.';
            }
        }
    },
    valgtArbeidssituasjon: (state) => {
        if (
            !state.feilaktigeOpplysninger?.includes('PERIODE') &&
            !state.feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_LAV')
        ) {
            if (!state.valgtArbeidssituasjon) {
                return 'Du må svare på hvor du er sykmeldt fra.';
            }
        }
    },
    valgtArbeidsgiver: (state) => undefined,
    beOmNyNaermesteLeder: (state) => {
        if (
            !state.feilaktigeOpplysninger?.includes('PERIODE') &&
            !state.feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_LAV')
        ) {
            if (state.valgtArbeidsgiver) {
                if (state.beOmNyNaermesteLeder === undefined) {
                    return 'Du må svare på om dette er personen som skal følge deg opp når du er syk.';
                }
            }
        }
    },
    harAnnetFravaer: (state) => {
        if (
            !state.feilaktigeOpplysninger?.includes('PERIODE') &&
            !state.feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_LAV')
        ) {
            if (
                state.valgtArbeidssituasjon?.includes(Arbeidssituasjoner.FRILANSER) ||
                state.valgtArbeidssituasjon?.includes(Arbeidssituasjoner.NAERINGSDRIVENDE)
            ) {
                if (state.harAnnetFravaer === undefined) {
                    return 'Du må svare på om du har brukt egenmelding før du ble syk.';
                }
            }
        }
    },
    fravaersperioder: (state) => {
        if (
            !state.feilaktigeOpplysninger?.includes('PERIODE') &&
            !state.feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_LAV')
        ) {
            if (state.harAnnetFravaer) {
                if (state.fravaersperioder === undefined || state.fravaersperioder.length === 0) {
                    return 'Siden du har sagt at du brukte egenmelding før du ble syk må du fylle ut minst en egenmeldingsperiode.';
                }
                if (state.fravaersperioder.some((periode) => periode.fom === undefined)) {
                    return 'Én eller flere av periodene er tomme';
                }
            }
        }
    },
    harForsikring: (state) => {
        if (
            !state.feilaktigeOpplysninger?.includes('PERIODE') &&
            !state.feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_LAV')
        ) {
            if (
                state.valgtArbeidssituasjon?.includes(Arbeidssituasjoner.FRILANSER) ||
                state.valgtArbeidssituasjon?.includes(Arbeidssituasjoner.NAERINGSDRIVENDE)
            ) {
                if (state.harForsikring === undefined) {
                    return 'Du må svare på om du har forsikring som gjelder de første 16 dagene av sykefraværet.';
                }
            }
        }
    },
};
export default validationFunctions;
