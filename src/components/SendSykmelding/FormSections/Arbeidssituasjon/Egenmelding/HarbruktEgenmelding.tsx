import { BodyLong, Link, ReadMore } from '@navikt/ds-react'

import { QuestionWrapper } from '../../shared/FormStructure'
import YesNoField from '../../shared/YesNoField'
import { toReadableDatePeriod } from '../../../../../utils/dateUtils'
import { YesOrNo } from '../../../../../fetching/graphql.generated'
import { sporsmal } from '../../../../../utils/sporsmal'

import styles from './HarbruktEgenmelding.module.css'

interface Props {
    index: number
    arbeidsgiverNavn: string
    lastPossibleDate: Date | string
    firstPossibleDate: Date | string
    onNo: () => void
}

function HarbruktEgenmelding({
    index,
    lastPossibleDate,
    firstPossibleDate,
    arbeidsgiverNavn,
    onNo,
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
                    if (value === YesOrNo.NO) {
                        onNo()
                    }
                }}
                shouldUnregister={false}
            />
        </QuestionWrapper>
    )
}

function EgenmeldingReadMore({ index }: { index: number }): JSX.Element {
    if (index === 0) {
        return (
            <ReadMore className={styles.readMore} header="Hvorfor betyr dette?">
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
        <ReadMore header="Hvorfor spør vi igjen?">
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

export default HarbruktEgenmelding
