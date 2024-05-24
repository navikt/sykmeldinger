import { ReactElement } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

import { Section } from './Section'
import { contentBorder, contentBorderRadius, contentMarginBottom, contentPadding, textMarginBottom } from './constants'
import ShakeHands from './icons/ShakeHands'

interface Props {
    tiltakArbeidsplassen?: string | null
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

const Arbeidsevne = ({ tiltakArbeidsplassen }: Props): ReactElement | null => {
    if (!tiltakArbeidsplassen) return null

    return (
        <Section title="Hva skal til for å bedre arbeidsevnen?" Icon={ShakeHands}>
            {!!tiltakArbeidsplassen && (
                <View style={styles.content}>
                    <Text style={styles.title}>Tilrettelegging/hensyn som bør tas på arbeidsplassen</Text>
                    <Text>{tiltakArbeidsplassen}</Text>
                </View>
            )}
        </Section>
    )
}

export default Arbeidsevne
