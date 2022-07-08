import { z } from 'zod';
import { parseISO, isValid } from 'date-fns';

import { logger } from '../../utils/logger';

export const LocalDateSchema = z.string().refine(
    (date) => {
        const valid = isValid(parseISO(date));
        if (!valid) {
            logger.error(`Strange invalid date!!, date is: ${date}`);
        }
        return valid;
    },
    {
        message: 'Invalid date string',
    },
);
