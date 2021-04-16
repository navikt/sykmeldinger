import 'dayjs/locale/nb';
import dayjs from 'dayjs';
dayjs.locale('nb');

/** Class with utility functions for working with dates. */
class DateFormatter {
    /**
     * Get a text representation of the date
     * @return {string} The date string
     */
    static toReadableDate(date: Date, options?: { withYear?: boolean }): string {
        return dayjs(date).format(`D. MMMM${options?.withYear ? ' YYYY' : ''}`);
    }
}

export default DateFormatter;
