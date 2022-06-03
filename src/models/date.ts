import { z } from 'zod';
import { parseISO, isValid } from 'date-fns';

export const LocalDateSchema = z.string().refine((date) => isValid(parseISO(date)), {
    message: 'Invalid date string',
});
