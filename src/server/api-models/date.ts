import { z } from 'zod'
import { parseISO, isValid } from 'date-fns'
import { logger } from '@navikt/next-logger'

export const LocalDateSchema = z.string().refine(
    (date) => {
        const valid = isValid(parseISO(date, { additionalDigits: 1 }))
        if (!valid) {
            logger.error(`Strange invalid date!!, date is: ${date}`)
        }
        return valid
    },
    {
        message: 'Invalid date string',
    },
)
