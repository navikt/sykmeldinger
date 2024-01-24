import { ReactElement } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

import { fnrText, getPasientName } from '../../../utils/pasientUtils'
import { Pasient } from '../../api-models/sykmelding/Pasient'

import { contentBorder, contentBorderRadius, contentMarginBottom, contentPadding, textMarginBottom } from './constants'
import People from './icons/People'
import { Section } from './Section'

interface Props {
    pasient?: Pasient | null
}

const styles = StyleSheet.create({
    text: { marginBottom: textMarginBottom },
    content: {
        border: contentBorder,
        borderRadius: contentBorderRadius,
        padding: contentPadding,
        marginBottom: contentMarginBottom,
    },
})

const SykmeldingenGjelder = ({ pasient }: Props): ReactElement | null => {
    if (!pasient) return null

    const name = getPasientName(pasient)
    if (!name) return null

    return (
        <Section title="Sykmeldingen gjelder" Icon={People}>
            <View style={styles.content}>
                <Text style={styles.text}>{name}</Text>
                <Text>{fnrText(pasient.fnr)}</Text>
            </View>
        </Section>
    )
}

export default SykmeldingenGjelder
