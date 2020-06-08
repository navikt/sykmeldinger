import Tekstomrade from 'nav-frontend-tekstomrade';
import React, { useEffect, useState } from 'react';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { useFormContext } from 'react-hook-form';

import Arbeidsgiver from '../../../../../types/arbeidsgiverTypes';
import { JaEllerNei, Skjemafelt } from '../../../../../types/sporsmalTypes';

interface ArbeidsgiverSporsmalProps {
    vis: boolean;
    arbeidsgiver: Arbeidsgiver | undefined;
}

const ArbeidsgiverSporsmal = ({ vis, arbeidsgiver }: ArbeidsgiverSporsmalProps) => {
    const { register, triggerValidation, unregister, setValue, errors, watch } = useFormContext();
    const [harOppfolging, setHarOppfolging] = useState<JaEllerNei | undefined>(undefined);

    const watchOppfolging = watch(Skjemafelt.OPPFOLGING);

    useEffect(() => {
        register({ name: Skjemafelt.OPPFOLGING });
        return () => {
            unregister(Skjemafelt.OPPFOLGING);
        };
    }, [register, setValue, unregister]);

    useEffect(() => {
        setHarOppfolging(undefined);
        setValue(Skjemafelt.OPPFOLGING, undefined);
    }, [arbeidsgiver, setHarOppfolging, setValue]);

    const handterEndring = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHarOppfolging(e.target.value as JaEllerNei);
        setValue(Skjemafelt.OPPFOLGING, e.target.value);
        triggerValidation({ name: Skjemafelt.OPPFOLGING });
    };

    if (!vis) {
        return null;
    }

    if (!arbeidsgiver) {
        return null;
    }

    return (
        <SkjemaGruppe
            feil={
                errors.oppfolging
                    ? {
                          feilmelding: `Du må svare på om det er ${arbeidsgiver.naermesteLeder.navn} som skal følge deg opp på jobben når du er syk`,
                      }
                    : undefined
            }
            className="skjemagruppe--undersporsmal"
        >
            <fieldset>
                <legend>
                    {`Er det ${arbeidsgiver.naermesteLeder.navn} som skal følge deg opp på jobben når du er syk?`}
                </legend>
                <Radio
                    label="Ja"
                    name={Skjemafelt.OPPFOLGING}
                    value={JaEllerNei.JA}
                    checked={harOppfolging === JaEllerNei.JA}
                    onChange={handterEndring}
                />
                <Radio
                    label="Nei"
                    name={Skjemafelt.OPPFOLGING}
                    value={JaEllerNei.NEI}
                    checked={harOppfolging === JaEllerNei.NEI}
                    onChange={handterEndring}
                />
            </fieldset>
            {watchOppfolging === JaEllerNei.JA && (
                <Tekstomrade>
                    {`Vi sender sykmeldingen til ${arbeidsgiver.naermesteLeder.navn}, som finner den ved å logge inn på nav.no.`}
                </Tekstomrade>
            )}
            {watchOppfolging === JaEllerNei.NEI && (
                <Tekstomrade>Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.</Tekstomrade>
            )}
        </SkjemaGruppe>
    );
};

export default ArbeidsgiverSporsmal;
