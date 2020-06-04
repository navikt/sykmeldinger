import React from 'react';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { useFormContext } from 'react-hook-form';

import Egenmeldingsdager from './Egenmeldingsdager';
import tekster from '../Sporsmal-tekster';
import { JaEllerNei, Skjemafelt } from '../../../../../types/sporsmalTypes';

interface FrilanserSporsmalProps {
    vis: boolean;
}

const FrilanserSporsmal = ({ vis }: FrilanserSporsmalProps) => {
    const { register, errors, watch } = useFormContext();
    const watchFrilanserEgenmelding = watch(Skjemafelt.FRILANSER_EGENMELDING);

    if (!vis) {
        return null;
    }

    return (
        <>
            <SkjemaGruppe
                feil={errors.frilanserEgenmelding ? { feilmelding: errors.frilanserEgenmelding.message } : undefined}
                className="skjemagruppe--undersporsmal"
            >
                <fieldset>
                    <legend>{tekster['frilanser.egenmelding.tittel']}</legend>
                    <Radio
                        label={tekster['ja']}
                        name={Skjemafelt.FRILANSER_EGENMELDING}
                        value={JaEllerNei.JA}
                        radioRef={register as any}
                    />
                    <Radio
                        label={tekster['nei']}
                        name={Skjemafelt.FRILANSER_EGENMELDING}
                        value={JaEllerNei.NEI}
                        radioRef={register as any}
                    />
                </fieldset>
            </SkjemaGruppe>
            {watchFrilanserEgenmelding === JaEllerNei.JA && (
                <Egenmeldingsdager name={Skjemafelt.EGENMELDINGSPERIODER} />
            )}

            <SkjemaGruppe
                feil={errors.frilanserForsikring ? { feilmelding: errors.frilanserForsikring.message } : undefined}
                className="skjemagruppe--undersporsmal"
            >
                <fieldset>
                    <legend>{tekster['frilanser.forsikring.tittel']}</legend>
                    <Radio
                        label={tekster['ja']}
                        name={Skjemafelt.FRILANSER_FORSIKRING}
                        value={JaEllerNei.JA}
                        radioRef={register as any}
                    />
                    <Radio
                        label={tekster['nei']}
                        name={Skjemafelt.FRILANSER_FORSIKRING}
                        value={JaEllerNei.NEI}
                        radioRef={register as any}
                    />
                </fieldset>
            </SkjemaGruppe>
        </>
    );
};

export default FrilanserSporsmal;
