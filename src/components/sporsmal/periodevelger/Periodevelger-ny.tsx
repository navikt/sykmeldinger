import React, { useState, useEffect, useRef } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dayjs from 'dayjs';

const PeriodevelgerNy = () => {
    const [days, setDays] = useState({
        from: undefined,
        to: undefined,
    });
    let toInput = useRef(null);

    const FORMAT = 'YYYY-D-M';

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const showFromMonth = () => {
        if (!days.from) {
            return;
        }
        if (dayjs(days.to).diff(dayjs(days.from), 'month') < 2) {
            toInput.getDayPicker().showMonth(days.from);
        }
    };

    const parseDate = (str: string, format: string, locale?: string) => {
        const parsed = dayjs(str, format, locale).toDate();
        if (DateUtils.isDate(parsed)) {
            return parsed;
        }
        return undefined;
    };

    const formatDate = (date?: Date, format?: string, locale?: string) => {
        return dayjs(date).format(format);
    };

    const handleFromChange = (from: any) => {
        // Change the from date and focus the "to" input field
        setDays({ ...days, from: from });
    };

    const handleToChange = (to: any) => {
        setDays({
            ...days,
            to: to,
        });
    };

    useEffect(() => {
        showFromMonth();
    }, [days.to, showFromMonth]);

    return (
        <>
            <DayPickerInput
                value={days.from}
                formatDate={formatDate}
                parseDate={parseDate}
                format={FORMAT}
                placeholder={'fra og med'}
                dayPickerProps={{
                    selectedDays: [fra],
                    toMonth: til,
                    modifiers: { start: fra, end: til },
                }}
                onDayChange={handleFromChange}
            />
            <DayPickerInput
                ref={toInput}
                value={days.to}
                formatDate={formatDate}
                parseDate={parseDate}
                format={FORMAT}
                placeholder={'til og med'}
                onDayChange={handleToChange}
            />
        </>
    );
};

export default PeriodevelgerNy;
