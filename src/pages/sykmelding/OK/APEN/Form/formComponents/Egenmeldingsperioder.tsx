import React, { useEffect } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { FormData, Egenmeldingsperiode } from '../Form';
import { Label } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Xknapp } from 'nav-frontend-ikonknapper';
import QuestionWrapper from '../layout/QuestionWrapper';
import { Datepicker } from 'nav-datovelger';
import dayjs from 'dayjs';

interface EgenmeldingsperioderProps {
    syketilfelleStartdato: Date;
}
const Egenmeldingsperioder: React.FC<EgenmeldingsperioderProps> = ({ syketilfelleStartdato }) => {
    const { control, register, unregister } = useFormContext<FormData>();
    const fieldName: keyof FormData = 'egenmeldingsperioder';
    const sporsmaltekst = `Hvilke dager var du borte fra jobb før ${syketilfelleStartdato.toString()}`;
    const { fields, append, remove } = useFieldArray<Egenmeldingsperiode>({
        control,
        name: `${fieldName}.svar`,
    });

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

            {fields.map((field, index) => (
                <div key={field.id} style={{ display: 'flex', marginBottom: '1rem' }}>
                    <Controller
                        control={control}
                        name={`${fieldName}.svar[${index}].fom`}
                        defaultValue={null}
                        rules={{ required: 'fom dato mangler.' }}
                        render={({ onChange, value }) => (
                            <Datepicker
                                locale="nb"
                                value={value ? value : undefined}
                                onChange={onChange}
                                limitations={{ maxDate: dayjs(new Date()).format('YYYY-MM-DD') }}
                                inputProps={{ placeholder: 'Fom' }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={`${fieldName}.svar[${index}].tom`}
                        defaultValue={null}
                        rules={{ required: 'tom dato mangler.' }}
                        render={({ onChange, value }) => (
                            <Datepicker
                                locale="nb"
                                value={value ? value : undefined}
                                onChange={onChange}
                                limitations={{ maxDate: dayjs(new Date()).format('YYYY-MM-DD') }}
                                inputProps={{ placeholder: 'Tom' }}
                            />
                        )}
                    />
                    {index > 0 && <Xknapp htmlType="button" onClick={() => remove(index)} />}
                </div>
            ))}

            <Knapp htmlType="button" type="standard" mini onClick={() => append({ fom: undefined, tom: undefined })}>
                + Legg til ekstra periode
            </Knapp>
        </QuestionWrapper>
    );
};

export default Egenmeldingsperioder;
