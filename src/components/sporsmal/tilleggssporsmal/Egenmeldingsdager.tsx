import React, { useState, useEffect } from 'react';
import { FieldError, ValidationPayload } from 'react-hook-form/dist/types';
import Periodevelger from '../periodevelger/Periodevelger';
import { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe, Fieldset } from 'nav-frontend-skjema';
import tekster from '../sporsmal-tekster';

interface EgenmeldingsdagerProps {
    vis: boolean;
    sykmeldingStartdato?: Date;
    register: any;
    unregister: any;
    triggerValidation: (
        payload?: ValidationPayload<string, any> | ValidationPayload<string, any>[] | undefined,
        shouldRender?: any,
    ) => Promise<boolean>;
    isSubmitted: boolean;
    setValue: (name: string, value: any, shouldValidate?: boolean) => void;
    errors: Partial<Record<string, FieldError>>;
}

interface Periode {
    id: number;
    startDato?: Date;
    sluttDato?: Date;
}

const Egenmeldingsdager = ({
    vis,
    sykmeldingStartdato,
    register,
    unregister,
    setValue,
    errors,
    triggerValidation,
    isSubmitted,
}: EgenmeldingsdagerProps) => {
    const [perioder, setPerioder] = useState<Periode[]>([{ id: 0 }]); // Legger til første periode
    const name = 'egenmeldingsperioder';

    // Registrer ved mount, unregistrer ved unmount
    useEffect(() => {
        register({ name: name });
        return () => unregister(name);
    }, [register, unregister]);

    const updateValue = (id: number, value: Date[]): void => {
        // Setter lokal state
        setPerioder(perioder => {
            return perioder.map(periode => {
                if (periode.id === id) {
                    return { ...periode, startDato: value[0], sluttDato: value[1] };
                } else {
                    return periode;
                }
            });
        });

        // Setter name og value manuelt til form.
        setValue(
            name,
            perioder.map(periode => {
                if (periode.id === id) {
                    return { startDato: value[0], sluttDato: value[1] };
                }
                return { startDato: periode.startDato, sluttDato: periode.sluttDato };
            }),
        );

        // Trigger revalidering ved value-oppdatering (dersom det ikke er forsøkt sendt inn)
        // TODO: ikke trigger ved første render
        if (isSubmitted) {
            triggerValidation({ name: name });
        }
    };

    if (!vis) {
        return null;
    }

    return (
        <>
            <SkjemaGruppe
                feil={
                    errors.egenmeldingsperioder
                        ? { feilmelding: tekster['egenmeldingsperioder.feilmelding'] }
                        : undefined
                }
            >
                <Fieldset legend={tekster['egenmeldingsperioder.tittel']}>
                    {perioder.map(periode => {
                        return (
                            <div key={periode.id}>
                                <Periodevelger
                                    vis={true}
                                    id={periode.id}
                                    minDato={new Date('10.01.2019')} // TODO: lage logikk for å intervallbegrensning
                                    maksDato={new Date('10.10.2019')}
                                    setValue={updateValue}
                                />
                                {periode.id !== 0 && (
                                    <Knapp
                                        type={'fare'}
                                        form={'kompakt'}
                                        mini
                                        onClick={e => {
                                            e.preventDefault();
                                            setPerioder(forrigePerioder =>
                                                forrigePerioder.filter(prevPeriode => prevPeriode.id !== periode.id),
                                            );
                                        }}
                                    >
                                        {tekster['egenmeldingsperioder.slett-periode']}
                                    </Knapp>
                                )}
                            </div>
                        );
                    })}
                </Fieldset>
                <Knapp
                    type={'flat'}
                    form={'kompakt'}
                    mini
                    onClick={e => {
                        e.preventDefault();
                        setPerioder(forrigePerioder => [
                            ...forrigePerioder,
                            { id: forrigePerioder[forrigePerioder.length - 1].id + 1 },
                        ]); // Legger til periode med id én høyere enn siste element i listen
                    }}
                >
                    {tekster['egenmeldingsperioder.legg-til-periode']}
                </Knapp>
            </SkjemaGruppe>
        </>
    );
};

export default Egenmeldingsdager;
