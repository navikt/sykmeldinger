import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

interface PeriodevelgerProps {
    register: any;
    setValue: any;
    name: string;
}

const PeriodevelgerNy = ({ register, setValue, name }: PeriodevelgerProps) => {
    const [periode, setPeriode] = useState<Date[] | undefined>(undefined);

    useEffect(() => {
        register({ name });
    });

    const oppdaterValue = (date: Date[]) => {
        setPeriode(date);
        setValue(name, date);
    };

    return (
        <>
            <Flatpickr
                value={periode}
                onChange={oppdaterValue}
                options={{
                    minDate: new Date('10.02.2019'),
                    maxDate: new Date('11.10.2019'),
                    mode: 'range',
                    enableTime: false,
                    dateFormat: 'd-m-y',
                    altInput: true,
                    altFormat: 'F j, Y',
                }}
            />
        </>
    );
};

export default PeriodevelgerNy;
