import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { ReactElement } from 'react'

import { Section } from './Section'
import { contentBorder, contentBorderRadius, contentMarginBottom, contentPadding, textMarginBottom } from './constants'
import Employer from './icons/Employer'

interface Props {
    meldingTilArbeidsgiver?: string | null
}

const styles = StyleSheet.create({
    title: { fontFamily: 'Helvetica-Bold', marginBottom: textMarginBottom },
    content: {
        border: contentBorder,
        borderRadius: contentBorderRadius,
        padding: contentPadding,
        marginBottom: contentMarginBottom,
    },
})

const MeldingTilArbeidsgiver = ({ meldingTilArbeidsgiver }: Props): ReactElement | null => {
    if (!meldingTilArbeidsgiver) return null

    return (
        <Section title="Melding til arbeidsgiver" Icon={Employer}>
            <View style={styles.content}>
                <Text style={styles.title}>Andre innspill til arbeidsgiver</Text>
                <Text>{meldingTilArbeidsgiver}</Text>
            </View>
        </Section>
    )
}

export default MeldingTilArbeidsgiver
