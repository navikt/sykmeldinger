import React, { useEffect, useMemo } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { FormShape, Egenmeldingsperiode } from '../Form';
import { Label } from 'nav-frontend-skjema';
import { Fareknapp, Knapp } from 'nav-frontend-knapper';
import QuestionWrapper from '../layout/QuestionWrapper';
import { Datepicker, DatepickerDateRange } from 'nav-datovelger';
import dayjs from 'dayjs';
import { Element } from 'nav-frontend-typografi';
import './Egenmeldingsperioder.less';

interface EgenmeldingsperioderProps {
    syketilfelleStartdato: Date;
}
const Egenmeldingsperioder: React.FC<EgenmeldingsperioderProps> = ({ syketilfelleStartdato }) => {
    const fieldName: keyof FormShape = 'egenmeldingsperioder';
    const sporsmaltekst = `Hvilke dager var du borte fra jobb før ${dayjs(syketilfelleStartdato).format(
        'D. MMMM YYYY',
    )}.`;

    const { errors, control, register, getValues, unregister } = useFormContext<FormShape>();
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
                    <div key={field.id} className="egenmeldingsperiode">
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
                                <div className="egenmeldingsperiode__fom">
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
                                <div className="egenmeldingsperiode__tom">
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
                        {index > 0 && (
                            <Fareknapp
                                htmlType="button"
                                mini
                                onClick={() => remove(index)}
                                className="egenmeldingsperiode__slett"
                            >
                                Slett periode
                            </Fareknapp>
                        )}
                    </div>
                ))}
            </div>

            <Knapp htmlType="button" type="hoved" mini onClick={() => append({ fom: undefined, tom: undefined })}>
                + Legg til ekstra periode
            </Knapp>
        </QuestionWrapper>
    );
};

export default Egenmeldingsperioder;
