import React, { useEffect } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { FormShape, Egenmeldingsperiode } from '../Form';
import { Label } from 'nav-frontend-skjema';
import { Fareknapp, Knapp } from 'nav-frontend-knapper';
import QuestionWrapper from '../layout/QuestionWrapper';
import { Datepicker } from 'nav-datovelger';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './Egenmeldingsperioder.less';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

interface EgenmeldingsperioderProps {
    oppfolgingsdato: Date;
}

// TODO: wait for new API
const Egenmeldingsperioder: React.FC<EgenmeldingsperioderProps> = ({ oppfolgingsdato }) => {
    const fieldName: keyof FormShape = 'egenmeldingsperioder';
    const sporsmaltekst = `Hvilke dager var du borte fra jobb før ${dayjs(oppfolgingsdato).format('D. MMMM YYYY')}.`;

    const { errors, control, register, getValues, unregister } = useFormContext<FormShape>();
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
        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
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
                                    // Test max date
                                    if (dayjs(fom).isAfter(oppfolgingsdato)) {
                                        return 'Startdato kan ikke være etter oppfølgingsdato';
                                    }

                                    // Test current peirod
                                    const tom = getValues<string, string | undefined>(
                                        `${fieldName}.svar[${index}].tom`,
                                    );
                                    if (tom && dayjs(tom).isBefore(fom)) {
                                        return 'Startdato kan ikke være etter sluttdato';
                                    }

                                    // Test cross-period
                                    if (
                                        fields
                                            .filter((f) => f.id !== field.id)
                                            .filter((f) => !!f.fom && !!f.tom)
                                            .some((f) => dayjs(fom).isBetween(f.fom!, f.tom!, null, '[]'))
                                    ) {
                                        return 'Du kan ikke ha overlappende perioder';
                                    }

                                    return true;
                                },
                            }}
                            render={({ onChange, value, name }) => (
                                <div className="egenmeldingsperiode__fom">
                                    <Normaltekst>Fra og med:</Normaltekst>
                                    <Datepicker
                                        locale="nb"
                                        value={value ? value : undefined}
                                        onChange={onChange}
                                        limitations={{
                                            maxDate: dayjs(oppfolgingsdato).format('YYYY-MM-DD'),
                                        }}
                                        inputProps={{ name, placeholder: 'dd.mm.åååå' }}
                                    />
                                    {errors[fieldName]?.svar?.[index]?.fom?.message && (
                                        <Element style={{ color: 'darkred', maxWidth: '12rem' }}>
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
                                    // Test max date
                                    if (dayjs(tom).isAfter(oppfolgingsdato)) {
                                        return 'Sluttdato kan ikke være etter oppfølgingsdato';
                                    }

                                    // Test current peirod
                                    const fom = getValues<string, string | undefined>(
                                        `${fieldName}.svar[${index}].fom`,
                                    );
                                    if (fom && dayjs(fom).isAfter(tom)) {
                                        console.log('sluttdato is before startdato');
                                        return 'Sluttdato kan ikke være før startdato';
                                    }

                                    // Test cross-period
                                    if (
                                        fields
                                            .filter((f) => f.id !== field.id)
                                            .filter((f) => !!f.fom && !!f.tom)
                                            .some((f) => dayjs(fom).isBetween(f.fom!, f.tom!, null, '[]'))
                                    ) {
                                        return 'Du kan ikke ha overlappende perioder';
                                    }

                                    return true;
                                },
                            }}
                            render={({ onChange, value, name }) => (
                                <div className="egenmeldingsperiode__tom">
                                    <Normaltekst>Til og med:</Normaltekst>
                                    <Datepicker
                                        locale="nb"
                                        value={value ? value : undefined}
                                        onChange={onChange}
                                        limitations={{
                                            maxDate: dayjs(oppfolgingsdato).format('YYYY-MM-DD'),
                                        }}
                                        inputProps={{ name, placeholder: 'dd.mm.åååå' }}
                                    />
                                    {errors[fieldName]?.svar?.[index]?.tom?.message && (
                                        <Element style={{ color: 'darkred', maxWidth: '11rem' }}>
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
