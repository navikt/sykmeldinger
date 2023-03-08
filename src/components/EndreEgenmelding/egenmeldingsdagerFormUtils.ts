import { DefaultValues } from 'react-hook-form'
import { isAfter, isWithinInterval } from 'date-fns'
import * as R from 'remeda'

import { SvarUnion_DagerSvar_Fragment, SykmeldingFragment, YesOrNo } from '../../fetching/graphql.generated'
import {
    currentPeriodDatePicker,
    EgenmeldingsdagerFormValue,
    EgenmeldingsdagerSubForm,
} from '../FormComponents/Egenmelding/EgenmeldingerField'
import { toDate } from '../../utils/dateUtils'
import { getSykmeldingStartDate } from '../../utils/sykmeldingUtils'

export function createEgenmeldingsdagerDefaultValues(
    sykmelding: SykmeldingFragment,
    previousSykmeldingTom: Date | null,
    egenmeldingsdager: SvarUnion_DagerSvar_Fragment['dager'],
): DefaultValues<EgenmeldingsdagerSubForm>['egenmeldingsdager'] {
    const initialDates = {
        earliestPossibleDate: toDate(getSykmeldingStartDate(sykmelding)),
        earliestSelectedDate: null,
    }
    const metadata = {
        arbeidsgiverNavn: sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn ?? '',
        previousSykmeldingTom: previousSykmeldingTom,
    }

    return traverseEgenmeldingsdager(egenmeldingsdager, initialDates, metadata)
}

function traverseEgenmeldingsdager(
    egenmeldingsdager: SvarUnion_DagerSvar_Fragment['dager'],
    previous: {
        earliestPossibleDate: Date
        earliestSelectedDate: Date | null
    },
    metadata: {
        previousSykmeldingTom: Date | null
        arbeidsgiverNavn: string
    },
): EgenmeldingsdagerFormValue[] {
    const [earliestPossibleDate, latestPossibleDate] = currentPeriodDatePicker(previous, metadata.previousSykmeldingTom)

    if (isAfter(earliestPossibleDate, latestPossibleDate)) {
        return []
    }

    const interval = { start: earliestPossibleDate, end: latestPossibleDate }
    const [insidePeriod, outsidePeriod] = R.pipe(
        egenmeldingsdager,
        R.sortBy((it) => it),
        R.partition((date) => isWithinInterval(toDate(date), interval)),
    )

    if (insidePeriod.length > 0) {
        return [
            { harPerioder: YesOrNo.YES, datoer: insidePeriod.map(toDate), hasClickedVidere: true },
            ...traverseEgenmeldingsdager(
                outsidePeriod,
                {
                    earliestSelectedDate: toDate(insidePeriod[0]),
                    earliestPossibleDate: earliestPossibleDate,
                },
                metadata,
            ),
        ]
    } else {
        return [{ harPerioder: YesOrNo.NO, datoer: null, hasClickedVidere: false }]
    }
}
