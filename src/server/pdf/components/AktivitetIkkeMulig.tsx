import { ReactElement } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

import { AktivitetIkkeMuligPeriode } from '../../api-models/sykmelding/Periode'
import { arbeidsrelatertArsakToText } from '../../../utils/periodeUtils'

import Office2 from './icons/Office2'
import { Section } from './Section'
import { contentBorder, contentBorderRadius, contentMarginBottom, contentPadding, textMarginBottom } from './constants'

interface Props {
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriode
}

const styles = StyleSheet.create({
    title: { fontFamily: 'Helvetica-Bold', marginBottom: textMarginBottom },
    text: { marginBottom: textMarginBottom },
    content: {
        border: contentBorder,
        borderRadius: contentBorderRadius,
        paddingTop: contentPadding,
        paddingRight: contentPadding,
        paddingLeft: contentPadding,
        marginBottom: contentMarginBottom,
    },
    view: { marginBottom: 12 },
})

const AktivitetIkkeMulig = ({ aktivitetIkkeMulig }: Props): ReactElement | null => {
    if (!aktivitetIkkeMulig.arbeidsrelatertArsak) return null

    return (
        <Section title="Aktivitet på arbeidsplassen" Icon={Office2}>
            <View style={styles.content}>
                {!!aktivitetIkkeMulig.arbeidsrelatertArsak && (
                    <View style={styles.view}>
                        <Text style={styles.title}>
                            Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet
                        </Text>
                        <Text style={styles.text}>
                            {`- ${aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.map(arbeidsrelatertArsakToText)}`}
                        </Text>
                    </View>
                )}
                {aktivitetIkkeMulig.arbeidsrelatertArsak?.beskrivelse && (
                    <View style={styles.view}>
                        <Text style={styles.title}>Beskrivelse</Text>
                        <Text style={styles.text}>{aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse}</Text>
                    </View>
                )}
            </View>
        </Section>
    )
}

export default AktivitetIkkeMulig
