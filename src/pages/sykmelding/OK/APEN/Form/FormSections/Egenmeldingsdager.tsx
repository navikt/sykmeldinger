import './flatpickr.less';
import './Egenmeldingsdager.less';

import Flatpickr from 'react-flatpickr';
import Lenke from 'nav-frontend-lenker';
import React, { useState } from 'react';
import labelPlugin from 'flatpickr/dist/plugins/labelPlugin/labelPlugin';
import { CustomLocale } from 'flatpickr/dist/types/locale';
import { Label } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { FormInputs } from '../../../../../../types/form';

export const locale: CustomLocale = {
    rangeSeparator: ' til ',
    firstDayOfWeek: 1,
    weekdays: {
        shorthand: ['søn', 'man', 'tirs', 'ons', 'tors', 'fre', 'lør'],
        longhand: ['søndag', 'mandag', 'tirsadg', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    },
    months: {
        shorthand: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
        longhand: [
            'januar',
            'februar',
            'mars',
            'april',
            'mai',
            'juni',
            'juli',
            'aug',
            'september',
            'oktober',
            'november',
            'desember',
        ],
    },
};

interface EgenmeldingsdagerProps {
    formState: Partial<FormInputs>;
    setFormState: React.Dispatch<React.SetStateAction<Partial<FormInputs>>>;
    sykmeldingStartdato: Date;
    feil?: string;
}

const Egenmeldingsdager = ({ formState, setFormState, sykmeldingStartdato, feil }: EgenmeldingsdagerProps) => {
    const [perioder, setPerioder] = useState(formState.fravaersperioder?.map(({ fom, tom }) => [fom, tom]) || [[]]);

    console.log(perioder);
    const opprettNyPeriode = () => {
        setPerioder((perioder) => [...perioder, []]);
    };
    const oppdaterPeriode = (index: number, datoer: Date[]) => {
        if (datoer.length === 2) {
            const perioderCopy = [...perioder];
            perioderCopy.splice(index, 1, datoer);
            setPerioder(perioderCopy);
            setFormState((state) => ({
                ...state,
                fravaersperioder: perioderCopy.map((dates) => ({ fom: dates[0], tom: dates[1] })),
            }));
        }
    };
    const slettPeriode = (index: number) => {
        const perioderCopy = [...perioder];
        perioderCopy.splice(index, 1);
        setPerioder(perioderCopy);
        setFormState((state) => ({
            ...state,
            fravaersperioder: perioderCopy.map((dates) => ({ fom: dates[0], tom: dates[1] })),
        }));
    };

    return (
        <fieldset className="skjemagruppe margin-bottom--2">
            <Label htmlFor="fravaersperioder">Når hadde du egenmelding?</Label>
            {perioder.map((periode, index) => (
                <div className="margin-bottom--1" key={periode.toString()}>
                    <Flatpickr
                        id="fravaersperioder"
                        className="typo-normal flatpickr"
                        placeholder="Trykk for å velge datoer"
                        onChange={(nyeDatoer) => oppdaterPeriode(index, nyeDatoer)}
                        options={{
                            position: 'below',
                            maxDate: sykmeldingStartdato,
                            defaultDate: periode,
                            disable: perioder
                                .filter((_periode, indx) => indx !== index)
                                .map((periode) => ({ from: periode[0], to: periode[1] })),
                            mode: 'range',
                            enableTime: false,
                            dateFormat: 'd-m-y',
                            altInput: true,
                            altFormat: 'j. M. Y',
                            locale,
                            // Denne pluginen flytter "id" fra input til altInput når altInput er satt til true.
                            // Dette gjør at vi kan lenke til feltet fra feilmeldingskjema.
                            plugins: [new (labelPlugin as any)()],
                        }}
                    />
                    {index > 0 && (
                        <Lenke
                            href="#"
                            className="periode__slett"
                            onClick={(e) => {
                                e.preventDefault();
                                slettPeriode(index);
                            }}
                        >
                            Slett periode
                        </Lenke>
                    )}
                </div>
            ))}

            {feil && (
                <div className="skjemaelement__feilmelding margin-bottom--1">
                    <p className="typo-feilmelding">{feil}</p>
                </div>
            )}

            <Knapp
                mini
                onClick={(e) => {
                    e.preventDefault();
                    opprettNyPeriode();
                }}
            >
                + Legg til en ekstra periode
            </Knapp>
        </fieldset>
    );
};

export default Egenmeldingsdager;
