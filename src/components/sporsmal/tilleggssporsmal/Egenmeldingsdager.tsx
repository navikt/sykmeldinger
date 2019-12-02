import React, { useState, useEffect } from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import Periodevelger from '../periodevelger/Periodevelger';
import { Knapp } from 'nav-frontend-knapper';

interface EgenmeldingsdagerProps {
    vis: boolean;
    sykmeldingStartdato?: Date;
    register: any;
    setValue: (name: string, value: any, shouldValidate?: boolean) => void;
    errors?: Partial<Record<string, FieldError>>;
}

interface Periode {
    id: number;
    startDato?: Date;
    sluttDato?: Date;
}

const Egenmeldingsdager = ({ vis, sykmeldingStartdato, register, setValue, errors }: EgenmeldingsdagerProps) => {
    const [perioder, setPerioder] = useState<Periode[]>([{ id: 0 }]);
    const name = 'egenmeldingsperioder';

    useEffect(() => {
        register({ name: name });
        // unregister
    });

    useEffect(() => {
        console.log(perioder);
    }, [perioder]);

    const updateValue = (id: number, value: Date[]): void => {
        console.log(value);
        setPerioder(perioder => {
            return perioder.map(periode => {
                if (periode.id === id) {
                    return { ...periode, startDato: value[0], sluttDato: value[1] };
                } else {
                    return periode;
                }
            });
        });
        setValue(
            name,
            perioder.map(periode => {
                if (periode.id === id) {
                    return { startDato: value[0], sluttDato: value[1] };
                }
                return { startDato: periode.startDato, sluttDato: periode.sluttDato };
            }),
        );
    };

    if (!vis) {
        return null;
    }

    return (
        <>
            {perioder.map(periode => {
                return (
                    <div key={periode.id}>
                        <Periodevelger
                            vis={true}
                            id={periode.id}
                            minDato={new Date('12.01.2019')}
                            maksDato={new Date('12.10.2019')}
                            setValue={updateValue}
                        />
                        {periode.id !== 0 && (
                            <Knapp
                                onClick={e => {
                                    e.preventDefault();
                                    setPerioder(prevPerioder =>
                                        prevPerioder.filter(prevPeriode => prevPeriode.id !== periode.id),
                                    );
                                }}
                            >
                                slett periode
                            </Knapp>
                        )}
                    </div>
                );
            })}
            <button
                onClick={e => {
                    e.preventDefault();
                    setPerioder(perioder => [...perioder, { id: perioder[perioder.length - 1].id + 1 }]);
                }}
            >
                legg til periode
            </button>
        </>
    );
};

export default Egenmeldingsdager;
