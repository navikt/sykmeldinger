import React from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import { Fieldset, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import tekster from '../sporsmal-tekster';
import { endreLedetekst } from '../../../utils/ledetekst-utils';
import Tekstomrade from 'nav-frontend-tekstomrade';

interface ArbeidsgiverSporsmalProps {
    vis: boolean;
    register: any;
    errors: Partial<Record<string, FieldError>>;
    watchOppfolging: string;
}

const ArbeidsgiverSporsmal: React.FC<ArbeidsgiverSporsmalProps> = ({
    vis,
    register,
    errors,
    watchOppfolging
}: ArbeidsgiverSporsmalProps) => {
    if (vis) {
        return (
            <SkjemaGruppe
                feil={
                    errors.oppfolging
                        ? {
                              feilmelding: endreLedetekst(tekster['sykmeldtFra.arbeidsgiver.bekreft.feilmelding'], {
                                  '%ARBEIDSGIVER%': 'PLACEHOLDER',
                              }),
                          }
                        : undefined
                }
                className="skjemagruppe--undersporsmal"
            >
                <Fieldset
                    legend={endreLedetekst(tekster['sykmeldtFra.arbeidsgiver.bekreft.tittel'], {
                        '%ARBEIDSGIVER%': 'PLACEHOLDER',
                    })}
                >
                    <Radio label={tekster['ja']} name="oppfolging" value="true" radioRef={register as any} />
                    <Radio label={tekster['nei']} name="oppfolging" value="false" radioRef={register as any} />
                </Fieldset>
                {watchOppfolging === 'true' && (
                    <Tekstomrade>
                        {endreLedetekst(tekster['sykmeldtFra.arbeidsgiver.bekreft.ja'], {
                            '%ARBEIDSGIVER%': 'PLACEHOLDER',
                        })}
                    </Tekstomrade>
                )}
                {watchOppfolging === 'false' && (
                    <Tekstomrade>{tekster['sykmeldtFra.arbeidsgiver.bekreft.nei']}</Tekstomrade>
                )}
            </SkjemaGruppe>
        );
    }

    return <></>;
};

export default ArbeidsgiverSporsmal;
