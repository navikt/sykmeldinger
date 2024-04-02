import { ReactElement } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

import type { Prognose } from '../../api-models/sykmelding/Prognose'

import { Section } from './Section'
import { contentBorder, contentBorderRadius, contentMarginBottom, contentPadding, textMarginBottom } from './constants'
import Historic from './icons/Historic'

interface Props {
    prognose?: Prognose | null
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
    view: { marginBottom: 12 },
})

const Prognose = ({ prognose }: Props): ReactElement | null => {
    if (!prognose) return null
    if (!prognose.arbeidsforEtterPeriode && !prognose.hensynArbeidsplassen) return null

    return (
        <Section title="Prognose" Icon={Historic}>
            <View style={styles.content}>
                {prognose.arbeidsforEtterPeriode && (
                    <View style={styles.view}>
                        <Text style={styles.title}>Er pasienten 100% arbeidsfør etter denne perioden?</Text>
                        <Text style={styles.jaText}>Ja</Text>
                    </View>
                )}
                {!!prognose.hensynArbeidsplassen && (
                    <View style={styles.view}>
                        <Text style={styles.title}>Hensyn som må tas på arbeidsplassen</Text>
                        <Text>{prognose.hensynArbeidsplassen}</Text>
                    </View>
                )}
            </View>
        </Section>
    )
}

export default Prognose
