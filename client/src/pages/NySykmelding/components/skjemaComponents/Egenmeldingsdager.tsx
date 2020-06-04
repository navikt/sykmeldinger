import './flatpickr.less';
import './Egenmeldingsdager.less';

import Flatpickr from 'react-flatpickr';
import Lenke from 'nav-frontend-lenker';
import React from 'react';
import labelPlugin from 'flatpickr/dist/plugins/labelPlugin/labelPlugin';
import { CustomLocale } from 'flatpickr/dist/types/locale';
import { Label } from 'nav-frontend-skjema';

import tekster from '../SendingsSkjema-tekster';
import { Skjemafelt } from './skjemaTypes';

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
    name: Skjemafelt;
    sykmeldingStartdato: Date;
    handleChange: (value: string | string[] | string[][], name: Skjemafelt) => void;
    perioder: string[][];
}

const Egenmeldingsdager = ({ name, sykmeldingStartdato, handleChange, perioder }: EgenmeldingsdagerProps) => {
    const opprettNyPeriode = () => {
        handleChange([...perioder, []], name);
    };
    const oppdaterPeriode = (index: number, datoer: Date[]) => {
        const perioderCopy = [...perioder];
        perioderCopy.splice(
            index,
            1,
            datoer.map(dato => dato.toISOString()),
        );
        handleChange(perioderCopy, name);
    };
    const slettPeriode = (index: number) => {
        const perioderCopy = [...perioder];
        perioderCopy.splice(index, 1);
        handleChange(perioderCopy, name);
    };

    return (
        <>
            <>
                <Label htmlFor="periodevelger">{tekster['egenmeldingsperioder.tittel']}</Label>
                {perioder.map((periode, index) => (
                    <div className="periode" key={index.toString()}>
                        <Flatpickr
                            id={`b-${Skjemafelt.EGENMELDINGSPERIODER}`}
                            value={periode}
                            className="typo-normal flatpickr"
                            placeholder={tekster['egenmeldingsperioder.placeholder']}
                            onChange={nyeDatoer => oppdaterPeriode(index, nyeDatoer)}
                            options={{
                                position: 'below',
                                maxDate: sykmeldingStartdato,
                                mode: 'range',
                                enableTime: false,
                                dateFormat: 'd-m-y',
                                altInput: true,
                                altFormat: 'j. M, Y',
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
                                onClick={e => {
                                    e.preventDefault();
                                    slettPeriode(index);
                                }}
                            >
                                {tekster['egenmeldingsperioder.slett-periode']}
                            </Lenke>
                        )}
                    </div>
                ))}
            </>

            <Lenke
                href="#"
                onClick={e => {
                    e.preventDefault();
                    opprettNyPeriode();
                }}
            >
                {tekster['egenmeldingsperioder.legg-til-periode']}
            </Lenke>
        </>
    );
};

export default Egenmeldingsdager;
