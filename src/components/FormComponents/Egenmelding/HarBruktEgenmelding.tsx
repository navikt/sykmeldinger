import { BodyLong, Link, ReadMore } from '@navikt/ds-react'
import { ReactElement, useState } from 'react'
import { differenceInDays } from 'date-fns'

import { YesOrNo } from 'queries'

import { toReadableDatePeriod } from '../../../utils/dateUtils'
import { sporsmal } from '../../../utils/sporsmal'
import { logAmplitudeEvent } from '../../../amplitude/amplitude'
import YesNoField from '../YesNoField/YesNoField'
import { QuestionWrapper } from '../FormStructure'

import { EgenmeldingsdagerSubForm } from './EgenmeldingerField'

interface Props {
    index: number
    arbeidsgiverNavn: string
    lastPossibleDate: Date
    firstPossibleDate: Date
    onNo: () => void
    amplitudeSkjemanavn: string
}

function HarBruktEgenmelding({
    index,
    lastPossibleDate,
    firstPossibleDate,
    arbeidsgiverNavn,
    onNo,
    amplitudeSkjemanavn,
}: Props): ReactElement {
    const period: string = toReadableDatePeriod(lastPossibleDate, firstPossibleDate)
    const periodLength: number = differenceInDays(firstPossibleDate, lastPossibleDate) + 1

    return (
        <QuestionWrapper>
            <YesNoField<EgenmeldingsdagerSubForm>
                name={`egenmeldingsdager.${index}.harPerioder`}
                legend={`${sporsmal.harBruktEgenmeldingsdager(arbeidsgiverNavn)} ${
                    periodLength > 1 ? `i perioden` : ''
                } ${period}?`}
                subtext={<EgenmeldingReadMore index={index} />}
                rules={{
                    required: 'Du må svare på om du har brukt egenmelding før du ble syk.',
                }}
                onChange={(value: YesOrNo) => {
                    logAmplitudeEvent(
                        {
                            eventName: 'skjema spørsmål besvart',
                            data: {
                                skjemanavn: amplitudeSkjemanavn,
                                spørsmål: 'Har du brukt egenmeldingsdager i perioden?',
                                svar: value,
                            },
                        },
                        { level: index + 1 },
                    )

                    if (value === YesOrNo.NO) {
                        onNo()
                    }
                }}
            />
        </QuestionWrapper>
    )
}

function EgenmeldingReadMore({ index }: { index: number }): ReactElement {
    const [open, setOpen] = useState(false)
    const handleOnReadMoreClick = (): void => {
        if (!open) {
            logAmplitudeEvent(
                {
                    eventName: 'komponent vist',
                    data: { komponent: 'EgenmeldingsdagerReadMore' },
                },
                { level: index + 1 },
            )
        }

        setOpen((b) => !b)
    }

    if (index === 0) {
        return (
            <ReadMore header="Hva betyr dette?" open={open} onClick={handleOnReadMoreClick}>
                <BodyLong spacing>
                    Egenmelding betyr at du melder fra til arbeidsgiveren din om at du er syk, uten at du leverer
                    sykmelding. Du skal kun registrere fravær som skyldes egen sykdom.
                </BodyLong>
                <BodyLong spacing>
                    Du finner mer informasjon om egenmeldingsdager på{' '}
                    <Link href="https://www.nav.no/egenmelding" target="_blank">
                        www.nav.no/egenmelding
                    </Link>
                </BodyLong>
                <BodyLong spacing>
                    Hvis du er usikker på hvilke dager du har brukt egenmelding, kan du ta kontakt med din arbeidsgiver.
                    Dette gjelder også hvis du ønsker å endre egenmeldingsdager etter at du har sendt sykmeldingen.
                </BodyLong>
            </ReadMore>
        )
    }

    return (
        <ReadMore header="Hvorfor spør vi igjen?" open={open} onClick={handleOnReadMoreClick}>
            <BodyLong spacing>
                Ettersom du har opplyst om at du har benyttet egenmeldingsdager i spørsmålet over, trenger vi også
                informasjon om du brukte egenmelding i løpet av de 16 dagene før egenmeldingsperioden i forrige periode.
            </BodyLong>
            <BodyLong spacing>
                Hvis det har gått mindre enn 16 dager fra du brukte egenmeldingsdager, til den første egenmeldingsdagen
                du oppgav i forrige spørsmål, kommer de med i beregningen av{' '}
                <Link
                    href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/sykepenger/sykepenger-i-arbeidsgiverperioden#chapter-1"
                    target="_blank"
                >
                    arbeidsgiverperioden.
                </Link>
            </BodyLong>
        </ReadMore>
    )
}

export default HarBruktEgenmelding
