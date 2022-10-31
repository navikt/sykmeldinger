import { StyleSheet, Text, View } from '@react-pdf/renderer'

import { Periode } from '../../api-models/sykmelding/Periode'
import { getPeriodTitle, getReadableLength, getReadablePeriod } from '../../../utils/periodeUtils'

import { contentBorder, contentBorderRadius, contentMarginBottom, contentPadding, textMarginBottom } from './constants'
import Calender from './icons/Calender'
import { Section } from './Section'

interface Props {
    perioder: Periode[]
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
})

const Perioder = ({ perioder }: Props): JSX.Element | null => {
    return (
        <Section title="Perioder (f.o.m. - t.o.m.)" Icon={Calender} shouldWrap={perioder.length >= 5}>
            {perioder.map((periode, index) => (
                <View key={index} style={styles.content} wrap={false}>
                    <View style={styles.view}>
                        <Text style={styles.title}>{getPeriodTitle(periode)}</Text>
                        <Text style={styles.text}>{getReadablePeriod(periode)}</Text>
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
        </Section>
    )
}

export default Perioder
