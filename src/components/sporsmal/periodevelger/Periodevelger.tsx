import React, { useState } from 'react';

import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import dayjs from 'dayjs';

import './reactCalendar.less';
import './reactDaterangePicker.less';
import { Normaltekst } from 'nav-frontend-typografi';

interface PeriodevelgerProps {
    vis: boolean;
    minDato: Date;
    maksDato: Date;
    id: number;
    setValue: (id:number, value: Date[]) => void;
}

const Periodevelger = ({ vis, minDato, maksDato, id, setValue }: PeriodevelgerProps) => {
    const [val, setVal] = useState<Date[] | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const onChange = (value: any) => {
        setVal(value);
        setValue(id, value);
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

    if (!vis) {
        return null;
    }

    return (
        <>
            <Normaltekst className="skjema__sporsmal">date stuff</Normaltekst>
            <DateRangePicker
                id={id}
                locale="nb-NO"
                format="dd.MM.yyyy"
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="åååå"
                minDate={dayjs(minDato).toDate()}
                maxDate={dayjs(maksDato).toDate()}
                onChange={onChange}
                onCalendarOpen={onOpen}
                onCalendarClose={onClose}
                isOpen={open}
                value={val}
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
