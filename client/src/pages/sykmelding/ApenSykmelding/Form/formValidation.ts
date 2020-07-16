import { ValidationFunctions } from '../../../commonComponents/hooks/useForm';
import { FormInputs } from './Form';

const validationFunctions: ValidationFunctions<FormInputs> = {
    opplysningeneErRiktige: (state) => {
        if (state.opplysningeneErRiktige === undefined) {
            return 'Du må svare på om opplysnigene er riktige';
        }
    },
    feilaktigeOpplysninger: (state) => {
        if (!state.opplysningeneErRiktige) {
            if (!state.feilaktigeOpplysninger || !state.feilaktigeOpplysninger?.length) {
                return 'Du må velge minst ett av alternativene';
            }
        }
    },
    valgtArbeidssituasjon: (state) => {
        if (!state.valgtArbeidssituasjon) {
            return 'Du må svare på hvor du er sykmeldt fra';
        }
    },
    valgtArbeidsgiver: (state) => undefined,
    beOmNyNaermesteLeder: (state) => undefined,
    harAnnetFravaer: (state) => undefined,
    fravaersperioder: (state) => undefined,
    harForsikring: (state) => undefined,
};
export default validationFunctions;
