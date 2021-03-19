import React, { useEffect, useMemo } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { FormData, Egenmeldingsperiode } from '../Form';
import { Label } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Xknapp } from 'nav-frontend-ikonknapper';
import QuestionWrapper from '../layout/QuestionWrapper';
import { Datepicker, DatepickerDateRange } from 'nav-datovelger';
import dayjs from 'dayjs';
import { Element } from 'nav-frontend-typografi';

interface EgenmeldingsperioderProps {
    syketilfelleStartdato: Date;
}
const Egenmeldingsperioder: React.FC<EgenmeldingsperioderProps> = ({ syketilfelleStartdato }) => {
    const fieldName: keyof FormData = 'egenmeldingsperioder';
    const sporsmaltekst = `Hvilke dager var du borte fra jobb før ${syketilfelleStartdato.toString()}`;

    const { errors, control, register, getValues, unregister } = useFormContext<FormData>();
    const { fields, append, remove } = useFieldArray<Egenmeldingsperiode>({
        control,
        name: `${fieldName}.svar`,
    });

    const invalidDateRanges: DatepickerDateRange[] = useMemo(
        () =>
            fields
                .filter((field) => field.fom && field.tom)
                .map((field) => {
                    return {
                        from: field.fom!,
                        to: field.tom!,
                    };
                }),
        [fields],
    );

    useEffect(() => {
        append({ fom: undefined, tom: undefined });
    }, [append]);

    useEffect(() => {
        register({
            name: `${fieldName}.sporsmaltekst`,
            value: sporsmaltekst,
        });
        register({
            name: `${fieldName}.svartekster`,
            value: JSON.stringify('Fom, Tom'),
        });
        return () => unregister(fieldName);
    }, [register, unregister, sporsmaltekst]);

    return (
        <QuestionWrapper>
            <Label htmlFor={fieldName}>{sporsmaltekst}</Label>

            <div id={fieldName}>
                {fields.map((field, index) => (
                    <div key={field.id} style={{ display: 'flex', marginBottom: '1rem' }}>
                        <Controller
                            control={control}
                            name={`${fieldName}.svar[${index}].fom`}
                            defaultValue={null}
                            rules={{
                                required: 'fom dato mangler.',
                                validate: (fom) => {
                                    const tom = getValues<string, string | undefined>(
                                        `${fieldName}.svar[${index}].tom`,
                                    );
                                    if (tom && dayjs(tom).isBefore(fom)) {
                                        return 'Startdato kan ikke være etter sluttdato';
                                    }
                                    return true;
                                },
                            }}
                            render={({ onChange, value, name }) => (
                                <div style={{ marginRight: '1rem' }}>
                                    <Datepicker
                                        locale="nb"
                                        value={value ? value : undefined}
                                        onChange={onChange}
                                        limitations={{
                                            invalidDateRanges,
                                            maxDate: dayjs(syketilfelleStartdato).format('YYYY-MM-DD'),
                                        }}
                                        inputProps={{ name, placeholder: 'Fom' }}
                                    />
                                    {errors[fieldName]?.svar?.[index]?.fom?.message && (
                                        <Element style={{ color: 'darkred' }}>
                                            {errors[fieldName]?.svar?.[index]?.fom?.message}
                                        </Element>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            control={control}
                            name={`${fieldName}.svar[${index}].tom`}
                            defaultValue={null}
                            rules={{
                                required: 'tom dato mangler.',
                                validate: (tom) => {
                                    const fom = getValues<string, string | undefined>(
                                        `${fieldName}.svar[${index}].fom`,
                                    );
                                    if (fom && dayjs(fom).isAfter(tom)) {
                                        console.log('sluttdato is before startdato');
                                        return 'Sluttdato kan ikke være før startdato';
                                    }
                                    return true;
                                },
                            }}
                            render={({ onChange, value, name }) => (
                                <div>
                                    <Datepicker
                                        locale="nb"
                                        value={value ? value : undefined}
                                        onChange={onChange}
                                        limitations={{
                                            invalidDateRanges,
                                            maxDate: dayjs(syketilfelleStartdato).format('YYYY-MM-DD'),
                                        }}
                                        inputProps={{ name, placeholder: 'Tom' }}
                                    />
                                    {errors[fieldName]?.svar?.[index]?.tom?.message && (
                                        <Element style={{ color: 'darkred' }}>
                                            {errors[fieldName]?.svar?.[index]?.tom?.message}
                                        </Element>
                                    )}
                                </div>
                            )}
                        />
                        {index > 0 && <Xknapp htmlType="button" onClick={() => remove(index)} />}
                    </div>
                ))}
            </div>

            <Knapp htmlType="button" type="standard" mini onClick={() => append({ fom: undefined, tom: undefined })}>
                + Legg til ekstra periode
            </Knapp>
        </QuestionWrapper>
    );
};

export default Egenmeldingsperioder;
