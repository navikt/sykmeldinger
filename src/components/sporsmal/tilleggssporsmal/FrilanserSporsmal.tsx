import React from 'react';
import { Fieldset, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import tekster from '../sporsmal-tekster';
import Egenmeldingsdager from './Egenmeldingsdager';
import { JaEllerNei, Skjemafelt } from '../../../types/sporsmalTypes';
import { useFormContext } from 'react-hook-form';

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
                feil={
                    errors.frilanserEgenmelding
                        ? { feilmelding: tekster['frilanser.egenmelding.feilmelding'] }
                        : undefined
                }
                className="skjemagruppe--undersporsmal"
            >
                <Fieldset legend={tekster['frilanser.egenmelding.tittel']}>
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
                </Fieldset>
            </SkjemaGruppe>
            <Egenmeldingsdager
                vis={watchFrilanserEgenmelding === JaEllerNei.JA}
                name={Skjemafelt.EGENMELDINGSPERIODER}
            />
            <SkjemaGruppe
                feil={
                    errors.frilanserForsikring
                        ? { feilmelding: tekster['frilanser.forsikring.feilmelding'] }
                        : undefined
                }
                className="skjemagruppe--undersporsmal"
            >
                <Fieldset legend={tekster['frilanser.forsikring.tittel']}>
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
                </Fieldset>
            </SkjemaGruppe>
        </>
    );
};

export default FrilanserSporsmal;
