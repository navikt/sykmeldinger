import React, { useEffect, useState } from 'react';
import { Fieldset, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import tekster from '../sporsmal-tekster';
import { getLedetekst } from '../../../utils/ledetekst-utils';
import Tekstomrade from 'nav-frontend-tekstomrade';
import Arbeidsgiver from '../../../types/arbeidsgiverTypes';
import { JaEllerNei, Skjemafelt } from '../../../types/sporsmalTypes';
import { useFormContext } from 'react-hook-form';

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
    }, [arbeidsgiver, setValue]);

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
                          feilmelding: getLedetekst(tekster['sykmeldtFra.arbeidsgiver.bekreft.feilmelding'], {
                              '%ARBEIDSGIVER%': arbeidsgiver.naermesteLeder.navn,
                          }),
                      }
                    : undefined
            }
            className="skjemagruppe--undersporsmal"
        >
            <Fieldset
                legend={getLedetekst(tekster['sykmeldtFra.arbeidsgiver.bekreft.tittel'], {
                    '%ARBEIDSGIVER%': arbeidsgiver.naermesteLeder.navn,
                })}
            >
                <Radio
                    label={tekster['ja']}
                    name={Skjemafelt.OPPFOLGING}
                    value={JaEllerNei.JA}
                    checked={harOppfolging === JaEllerNei.JA}
                    onChange={handterEndring}
                />
                <Radio
                    label={tekster['nei']}
                    name={Skjemafelt.OPPFOLGING}
                    value={JaEllerNei.NEI}
                    checked={harOppfolging === JaEllerNei.NEI}
                    onChange={handterEndring}
                />
            </Fieldset>
            {watchOppfolging === JaEllerNei.JA && (
                <Tekstomrade>
                    {getLedetekst(tekster['sykmeldtFra.arbeidsgiver.bekreft.ja'], {
                        '%ARBEIDSGIVER%': arbeidsgiver.naermesteLeder.navn,
                    })}
                </Tekstomrade>
            )}
            {watchOppfolging === JaEllerNei.NEI && (
                <Tekstomrade>{tekster['sykmeldtFra.arbeidsgiver.bekreft.nei']}</Tekstomrade>
            )}
        </SkjemaGruppe>
    );
};

export default ArbeidsgiverSporsmal;
