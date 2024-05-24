import * as R from 'remeda'
import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { ReactElement } from 'react'

import { DagerSvar, Sporsmal, Svartype } from '../../api-models/sykmelding/SykmeldingStatus'
import { Periode } from '../../api-models/sykmelding/Periode'
import { getPeriodTitle, getReadableLength } from '../../../utils/periodeUtils'
import { toReadableDate, toReadableDatePeriod } from '../../../utils/dateUtils'

import { contentBorder, contentBorderRadius, contentMarginBottom, contentPadding, textMarginBottom } from './constants'
import Calender from './icons/Calender'
import { Section } from './Section'

interface Props {
    perioder: Periode[]
    sporsmalOgSvarListe?: Sporsmal[]
}

const styles = StyleSheet.create({
    title: { fontFamily: 'Helvetica-Bold', marginBottom: textMarginBottom },
    text: { marginBottom: textMarginBottom },
    jaText: { marginBottom: textMarginBottom, marginLeft: 12 },
    content: {
        border: contentBorder,
        borderRadius: contentBorderRadius,
        paddingTop: contentPadding,
        paddingRight: contentPadding,
        paddingLeft: contentPadding,
        marginBottom: contentMarginBottom,
    },
    view: { marginBottom: 8 },
    list: { marginBottom: 12 },
})

const Perioder = ({ perioder, sporsmalOgSvarListe }: Props): ReactElement | null => {
    const egenmeldingsdager = sporsmalOgSvarListe ? findEgenmeldingsdager(sporsmalOgSvarListe) : null
    return (
        <Section title="Perioder (f.o.m. - t.o.m.)" Icon={Calender} shouldWrap={perioder.length >= 5}>
            {perioder.map((periode, index) => (
                <View key={index} style={styles.content} wrap={false}>
                    <View style={styles.view}>
                        <Text style={styles.title}>{getPeriodTitle(periode)}</Text>
                        <Text style={styles.text}>{toReadableDatePeriod(periode.fom, periode.tom)}</Text>
                        <Text style={styles.text}>{getReadableLength(periode)}</Text>
                    </View>
                    {!!periode.innspillTilArbeidsgiver && (
                        <View style={styles.view}>
                            <Text style={styles.title}>Innspill til arbeidsgiver om tilrettelegging</Text>
                            <Text style={styles.text}>{periode.innspillTilArbeidsgiver}</Text>
                        </View>
                    )}
                    {periode.gradert?.reisetilskudd && (
                        <View style={styles.view}>
                            <Text style={styles.title}>
                                Kan pasienten være i delvis arbeid ved bruk av reisetilskudd?
                            </Text>
                            <Text style={styles.jaText}>Ja</Text>
                        </View>
                    )}
                </View>
            ))}
            {egenmeldingsdager && egenmeldingsdager.svar.length > 0 && (
                <Egenmeldingsdager egenmeldingsdager={egenmeldingsdager} />
            )}
        </Section>
    )
}

interface EgenmeldingsdagerProps {
    egenmeldingsdager: DagerSvar
}

function Egenmeldingsdager({ egenmeldingsdager }: EgenmeldingsdagerProps): ReactElement {
    return (
        <View style={styles.content}>
            <Text style={styles.title}>Egenmeldingsdager (lagt til av deg)</Text>
            <ul style={styles.list}>
                {R.pipe(
                    egenmeldingsdager.svar,
                    R.sortBy((it) => it),
                    R.map((date: string) => (
                        <li style={styles.view} key={toReadableDate(date)}>
                            <Text>{toReadableDate(date)}</Text>
                        </li>
                    )),
                )}
                <li>
                    <Text>{`(${egenmeldingsdager.svar.length} dager)`}</Text>
                </li>
            </ul>
        </View>
    )
}

export function findEgenmeldingsdager(sporsmalOgSvarListe: Sporsmal[]): DagerSvar | undefined {
    return sporsmalOgSvarListe.flatMap((it) => it.svar).find((it): it is DagerSvar => it.svarType === Svartype.DAGER)
}

export default Perioder
