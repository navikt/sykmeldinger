import React, { useState, useEffect } from 'react';
import { FieldError, ValidationPayload } from 'react-hook-form/dist/types';
import { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe, Fieldset } from 'nav-frontend-skjema';
import tekster from '../sporsmal-tekster';
import Flatpickr from 'react-flatpickr';
import './flatpickr.less';
import { CustomLocale } from 'flatpickr/dist/types/locale';
import { Egenmeldingsperiode } from '../valideringsSkjema';
import { Skjemafelt } from '../../../types/sporsmalTypes';

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
    setValue: (name: string, value: Egenmeldingsperiode[], shouldValidate?: boolean) => void;
    errors: Partial<Record<string, FieldError>>;
}

/* export interface Egenmeldingsperiode {
    id: number;
    datoer?: Date[];
} */

const locale: CustomLocale = {
    firstDayOfWeek: 1,
    weekdays: {
        shorthand: ['søn', 'man', 'tirs', 'ons', 'tors', 'fre', 'lør'],
        longhand: ['søndag', 'mandag', 'tirsadg', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    },
    months: {
        shorthand: ['jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan'],
        longhand: ['jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan', 'jan'],
    },
};

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
    const [perioder, setPerioder] = useState<Egenmeldingsperiode[]>([{ id: 0 }]); // Legger til første periode
    const name = Skjemafelt.EGENMELDINGSPERIODER;

    // Registrer ved mount, unregistrer ved unmount
    useEffect(() => {
        register({ name: name });
        return () => unregister(name);
    }, [name, register, unregister]);

    const opprettNyPeriode = (): void => {
        const nyPeriode: Egenmeldingsperiode = { id: perioder[perioder.length - 1].id + 1 };
        const nyPerioder = [...perioder, nyPeriode];
        setPerioder(nyPerioder); // Legger til periode med id én høyere enn siste element i listen
        setValue(name, nyPerioder);
    };

    const slettPeriode = (id: number): void => {
        const nyPerioder = perioder.filter(periode => periode.id !== id);
        setPerioder(nyPerioder);
        setValue(name, nyPerioder);
        if (isSubmitted) {
            triggerValidation({ name: name });
        }
    };

    const oppdaterPeriode = (id: number, datoer: Date[]): void => {
        setPerioder(perioder => {
            return perioder.map(periode => {
                if (periode.id === id) {
                    return { ...periode, datoer };
                } else {
                    return periode;
                }
            });
        });
        setValue(
            name,
            perioder.map(periode => {
                if (periode.id === id) {
                    const nyPeriode: Egenmeldingsperiode = { ...periode, datoer };
                    return nyPeriode;
                }
                return periode;
            }),
        );
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
                                <Flatpickr
                                    value={periode.datoer}
                                    onChange={datoer => oppdaterPeriode(periode.id, datoer)}
                                    options={{
                                        minDate: new Date('10.02.2019'),
                                        maxDate: new Date('11.10.2019'),
                                        mode: 'range',
                                        enableTime: false,
                                        dateFormat: 'd-m-y',
                                        altInput: true,
                                        altFormat: 'F j, Y',
                                        locale: locale,
                                    }}
                                />
                                {/* Skal ikke kunne slette første periode */}
                                {periode.id !== 0 && (
                                    <Knapp
                                        type={'fare'}
                                        form={'kompakt'}
                                        mini
                                        onClick={e => {
                                            e.preventDefault();
                                            slettPeriode(periode.id);
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
                        opprettNyPeriode();
                    }}
                >
                    {tekster['egenmeldingsperioder.legg-til-periode']}
                </Knapp>
            </SkjemaGruppe>
        </>
    );
};

export default Egenmeldingsdager;
