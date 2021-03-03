import React, { useEffect } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { FormData, Egenmeldingsperiode } from '../Form';
import { Label } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import Flatpickr from 'react-flatpickr';
import { CustomLocale } from 'flatpickr/dist/types/locale';
import { Xknapp } from 'nav-frontend-ikonknapper';
import '../FormSections/flatpickr.less';

const locale: CustomLocale = {
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

interface EgenmeldingsperioderProps {
    syketilfelleStartdato: Date;
}
const Egenmeldingsperioder: React.FC<EgenmeldingsperioderProps> = ({ syketilfelleStartdato }) => {
    const { control, register } = useFormContext<FormData>();
    const { fields, append, remove, swap, move, insert } = useFieldArray<Egenmeldingsperiode>({
        control,
        name: 'egenmeldingsperioder',
    });

    useEffect(() => {
        append({ fom: undefined, tom: undefined });
    }, []);

    return (
        <div id="egenmeldingsperioder">
            <Label htmlFor="fdafsdf">Hvilke dager var du borte fra jobb før {syketilfelleStartdato.toString()}</Label>

            {fields.map((field, index) => (
                <div key={field.id}>
                    <Controller
                        control={control}
                        name={`egenmeldingsperioder[${index}].fom`}
                        defaultValue={null}
                        rules={{ required: true }}
                        render={({ onChange, onBlur, value }) => (
                            <Flatpickr
                                className="typo-normal flatpickr"
                                placeholder="Fom"
                                onChange={(dates) => onChange(dates[0])}
                                options={{
                                    position: 'below',
                                    maxDate: syketilfelleStartdato,
                                    defaultDate: value,
                                    mode: 'single',
                                    enableTime: false,
                                    dateFormat: 'd-m-y',
                                    altInput: true,
                                    altFormat: 'j. M. Y',
                                    locale,
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={`egenmeldingsperioder[${index}].tom`}
                        defaultValue={null}
                        rules={{ required: true }}
                        render={({ onChange, onBlur, value }) => (
                            <Flatpickr
                                className="typo-normal flatpickr"
                                placeholder="Tom"
                                onChange={(date) => onChange(date[0])}
                                options={{
                                    position: 'below',
                                    maxDate: syketilfelleStartdato,
                                    defaultDate: value,
                                    mode: 'single',
                                    enableTime: false,
                                    dateFormat: 'd-m-y',
                                    altInput: true,
                                    altFormat: 'j. M. Y',
                                    locale,
                                }}
                            />
                        )}
                    />
                    <Xknapp htmlType="button" onClick={() => remove(index)} />
                </div>
            ))}

            <Knapp htmlType="button" type="standard" mini onClick={() => append({ fom: undefined, tom: undefined })}>
                + Legg til ekstra periode
            </Knapp>
        </div>
    );
};

export default Egenmeldingsperioder;
