import { ReactElement } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

import { MeldingTilNAV } from '../../api-models/sykmelding/MeldingTilNav'

import { Section } from './Section'
import { contentBorder, contentBorderRadius, contentMarginBottom, contentPadding, textMarginBottom } from './constants'
import PeopleDialogOutline from './icons/PeopleDialogOutline'

interface Props {
    meldingTilNav?: MeldingTilNAV | null
}

const styles = StyleSheet.create({
    title: { fontFamily: 'Helvetica-Bold', marginBottom: textMarginBottom },
    text: { marginBottom: textMarginBottom },
    jaText: { marginBottom: textMarginBottom, marginLeft: 12 },
    content: {
        border: contentBorder,
        borderRadius: contentBorderRadius,
        padding: contentPadding,
        marginBottom: contentMarginBottom,
    },
    view: { marginBottom: 12 },
})

const MeldingTilNav = ({ meldingTilNav }: Props): ReactElement | null => {
    if (!meldingTilNav || (meldingTilNav.bistandUmiddelbart === false && !meldingTilNav.beskrivBistand)) {
        return null
    }

    return (
        <Section title="Melding til NAV" Icon={PeopleDialogOutline}>
            <View style={styles.content}>
                {meldingTilNav.bistandUmiddelbart && (
                    <View style={styles.view}>
                        <Text style={styles.title}>Ønskes bistand fra NAV nå?</Text>
                        <Text style={styles.jaText}>Ja</Text>
                    </View>
                )}
                {meldingTilNav.beskrivBistand && (
                    <View>
                        <Text style={styles.title}>Nærmere beskrivelse</Text>
                        <Text>{meldingTilNav.beskrivBistand}</Text>
                    </View>
                )}
            </View>
        </Section>
    )
}

export default MeldingTilNav
