import React, { useState } from 'react';

import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import dayjs from 'dayjs';

import './reactCalendar.less';
import './reactDaterangePicker.less';
import { Normaltekst } from 'nav-frontend-typografi';

interface PeriodevelgerProps {
    minDato: Date;
    maksDato: Date;
    name: string;
    register: any;
}

const Periodevelger = ({ minDato, maksDato, name, register }: PeriodevelgerProps) => {
    const [value, setValue] = useState<Date[]>([dayjs(new Date()).toDate(), dayjs(new Date()).toDate()]);
    const [open, setOpen] = useState<boolean>(false);

    const onChange = (value: any) => {
        setValue(value);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onOpen = () => {
        const cal: any = document.querySelector('.react-calendar');
        cal.setAttribute('tabindex', '-1');
        cal.focus();
    };

    return (
        <>
            <Normaltekst className="skjema__sporsmal">date stuff</Normaltekst>
            <DateRangePicker
                id="compId"
                name={name}
                locale="nb-NO"
                format="dd.MM.yyyy"
                minDate={dayjs(minDato).toDate()}
                maxDate={dayjs(maksDato).toDate()}
                onChange={onChange}
                onCalendarOpen={onOpen}
                onCalendarClose={onClose}
                isOpen={open}
                value={value}
                ref={register({
                    validate: (value: any) => value === true,
                    required: true,
                })}
                calendarAriaLabel="Åpne/lukk kalender"
                clearAriaLabel="Tøm"
                dayAriaLabel="Dag"
                monthAriaLabel="Mnd"
                yearAriaLabel="År"
                nativeInputAriaLabel="Dato"
            />
        </>
    );
};

export default Periodevelger;
