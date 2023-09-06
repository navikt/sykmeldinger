import { ReactElement } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

import { KontaktMedPasient } from '../../api-models/sykmelding/KontaktMedPasient'
import { toReadableDate } from '../../../utils/dateUtils'

import { Section } from './Section'
import Historic from './icons/Historic'
import { contentBorder, contentBorderRadius, contentMarginBottom, contentPadding, textMarginBottom } from './constants'

interface Props {
    kontaktMedPasient: KontaktMedPasient
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

const Tilbakedatering = ({ kontaktMedPasient }: Props): ReactElement | null => {
    if (!kontaktMedPasient.kontaktDato && !kontaktMedPasient.begrunnelseIkkeKontakt) {
        return null
    }

    return (
        <Section title="Tilbakedatering" Icon={Historic}>
            <View style={styles.content}>
                {!!kontaktMedPasient.kontaktDato && (
                    <View style={styles.view}>
                        <Text style={styles.title}>Dato for dokumenterbar kontakt med pasienten</Text>
                        <Text style={styles.text}>{toReadableDate(kontaktMedPasient.kontaktDato)}</Text>
                    </View>
                )}

                {!!kontaktMedPasient.begrunnelseIkkeKontakt && (
                    <View style={styles.view}>
                        <Text style={styles.title}>Begrunnelse for tilbakedatering</Text>
                        <Text>{kontaktMedPasient.begrunnelseIkkeKontakt}</Text>
                    </View>
                )}
            </View>
        </Section>
    )
}

export default Tilbakedatering
