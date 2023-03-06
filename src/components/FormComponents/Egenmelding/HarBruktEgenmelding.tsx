import { BodyLong, Link, ReadMore } from '@navikt/ds-react'
import { useState } from 'react'

import { toReadableDatePeriod } from '../../../utils/dateUtils'
import { YesOrNo } from '../../../fetching/graphql.generated'
import { sporsmal } from '../../../utils/sporsmal'
import { logAmplitudeEvent } from '../../../amplitude/amplitude'
// TODO make common components?
import { QuestionWrapper } from '../../SendSykmelding/FormSections/shared/FormStructure'
import YesNoField from '../../SendSykmelding/FormSections/shared/YesNoField'

import styles from './HarbruktEgenmelding.module.css'

interface Props {
    index: number
    arbeidsgiverNavn: string
    lastPossibleDate: Date | string
    firstPossibleDate: Date | string
    onNo: () => void
    disabled: boolean
}

function HarBruktEgenmelding({
    index,
    lastPossibleDate,
    firstPossibleDate,
    arbeidsgiverNavn,
    onNo,
    disabled,
}: Props): JSX.Element {
    return (
        <QuestionWrapper>
            <YesNoField
                name={`egenmeldingsdager.${index}.harPerioder`}
                legend={`${sporsmal.harBruktEgenmeldingsdager(arbeidsgiverNavn)} i perioden ${toReadableDatePeriod(
                    lastPossibleDate,
                    firstPossibleDate,
                )}?`}
                subtext={<EgenmeldingReadMore index={index} />}
                rules={{
                    required: 'Du må svare på om du har brukt egenmelding før du ble syk.',
                }}
                onChange={(value: YesOrNo) => {
                    logAmplitudeEvent(
                        {
                            eventName: 'skjema spørsmål besvart',
                            data: {
                                skjemanavn: 'åpen sykmelding',
                                spørsmål: 'Har du brukt egenmeldingsdager i perioden?',
                                svar: value,
                            },
                        },
                        { level: index },
                    )

                    if (value === YesOrNo.NO) {
                        onNo()
                    }
                }}
                shouldUnregister={false}
                disabled={disabled}
            />
        </QuestionWrapper>
    )
}

function EgenmeldingReadMore({ index }: { index: number }): JSX.Element {
    const [open, setOpen] = useState(false)
    const handleOnReadMoreClick = (): void => {
        if (!open) {
            logAmplitudeEvent(
                {
                    eventName: 'komponent vist',
                    data: { komponent: 'EgenmeldingsdagerReadMore' },
                },
                { level: index },
            )
        }

        setOpen((b) => !b)
    }

    if (index === 0) {
        return (
            <ReadMore className={styles.readMore} header="Hva betyr dette?" open={open} onClick={handleOnReadMoreClick}>
                <BodyLong>
                    <Link
                        href="https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykmelding-ulike-former/egenmelding#chapter-1"
                        target="_blank"
                    >
                        Egenmelding
                    </Link>{' '}
                    er når du selv melder deg syk til arbeidsgiveren. Du kan bruke egenmeldingen opptil 3 kalenderdager
                    om gangen, opptil 4 ganger i løpet av ett år.
                </BodyLong>
                <BodyLong>
                    Om det har gått mindre enn 16 dager fra du brukte egenmeldingen, til første dagen i denne
                    sykmeldingsperioden, inngår det i beregningen av arbeidsgiverperioden.
                </BodyLong>
            </ReadMore>
        )
    }

    return (
        <ReadMore header="Hvorfor spør vi igjen?" open={open} onClick={handleOnReadMoreClick}>
            <BodyLong>
                Om det har gått mindre enn 16 dager fra du bruke egenmeldingsdager, til den første egenmeldingsdagen du
                valgte i forrige spørsmål, kommer de med i beregningen av{' '}
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
