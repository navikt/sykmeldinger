import './flatpickr.less';
import './Egenmeldingsdager.less';

import Flatpickr from 'react-flatpickr';
import Lenke from 'nav-frontend-lenker';
import React, { useEffect, useState } from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { useFormContext } from 'react-hook-form';

import tekster from '../Sporsmal-tekster';
import { Egenmeldingsperiode } from '../valideringsSkjema';
import { locale } from '../../../../../types/sporsmalTypes';

interface EgenmeldingsdagerProps {
    name: string;
    sykmeldingStartdato?: Date;
}

const Egenmeldingsdager = ({ name, sykmeldingStartdato }: EgenmeldingsdagerProps) => {
    const { register, unregister, errors, setValue, triggerValidation, formState } = useFormContext();
    const { isSubmitted } = formState;

    const [perioder, setPerioder] = useState<Egenmeldingsperiode[]>([{ id: 0 }]); // Legger til første periode

    // Registrer ved mount, unregistrer ved unmount
    useEffect(() => {
        register({ name });
        return () => {
            setValue(name, undefined);
            unregister(name);
        };
    }, [name, register, setValue, unregister]);

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

    return (
        <>
            <SkjemaGruppe
                feil={errors.egenmeldingsperioder ? { feilmelding: errors.egenmeldingsperioder.message } : undefined}
            >
                <fieldset>
                    <legend>{tekster['egenmeldingsperioder.tittel']}</legend>
                    {perioder.map(periode => {
                        return (
                            <div className="periode" key={periode.id}>
                                <Flatpickr
                                    value={periode.datoer}
                                    className="typo-normal flatpickr"
                                    placeholder="Trykk for å velge periode"
                                    onChange={datoer => oppdaterPeriode(periode.id, datoer)}
                                    options={{
                                        position: 'below',
                                        minDate: new Date('10.02.2019'),
                                        maxDate: new Date('11.10.2019'),
                                        mode: 'range',
                                        enableTime: false,
                                        dateFormat: 'd-m-y',
                                        altInput: true,
                                        altFormat: 'j. M, Y',
                                        locale: locale,
                                    }}
                                />
                                {/* Skal ikke kunne slette første periode */}
                                {periode.id !== 0 && (
                                    <Lenke
                                        className="periode__slett"
                                        href="#"
                                        onClick={e => {
                                            e.preventDefault();
                                            slettPeriode(periode.id);
                                        }}
                                    >
                                        {tekster['egenmeldingsperioder.slett-periode']}
                                    </Lenke>
                                )}
                            </div>
                        );
                    })}
                </fieldset>
                <Lenke
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        opprettNyPeriode();
                    }}
                >
                    {tekster['egenmeldingsperioder.legg-til-periode']}
                </Lenke>
            </SkjemaGruppe>
        </>
    );
};

export default Egenmeldingsdager;
