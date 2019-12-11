import React from 'react';
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
    const { register, errors, watch } = useFormContext();

    const watchOppfolging = watch(Skjemafelt.OPPFOLGING);

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
                    radioRef={register as any}
                />
                <Radio
                    label={tekster['nei']}
                    name={Skjemafelt.OPPFOLGING}
                    value={JaEllerNei.NEI}
                    radioRef={register as any}
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
