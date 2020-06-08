import React from 'react';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { useFormContext } from 'react-hook-form';

import Egenmeldingsdager from './Egenmeldingsdager';
import { JaEllerNei, Skjemafelt } from '../../../../../../types/sporsmalTypes';

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
                    <legend>
                        Vi har registrert at du ble sykmeldt {new Date() /* TODO: Dato */}. Brukte du egenmelding eller
                        noen annen sykmelding før denne datoen?
                    </legend>
                    <Radio
                        label="Ja"
                        name={Skjemafelt.FRILANSER_EGENMELDING}
                        value={JaEllerNei.JA}
                        radioRef={register as any}
                    />
                    <Radio
                        label="Nei"
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
                    <legend>Har du forsikring som gjelder de første 16 dagene av sykefraværet?</legend>
                    <Radio
                        label="Ja"
                        name={Skjemafelt.FRILANSER_FORSIKRING}
                        value={JaEllerNei.JA}
                        radioRef={register as any}
                    />
                    <Radio
                        label="Nei"
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
