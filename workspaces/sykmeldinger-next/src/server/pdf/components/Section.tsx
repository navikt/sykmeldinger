import { ReactElement, PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

import People from './icons/People'

type Props = {
    title: string
    Icon?: typeof People
    shouldWrap?: boolean
}

const styles = StyleSheet.create({
    section: { marginTop: 12 },
    sectionHeader: { display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 12 },
    sectionIcon: { marginRight: 8 },
    sectionTitle: { fontFamily: 'Helvetica-Bold', fontSize: 16 },
    sectionContent: { width: 460 },
})

export function Section({ title, Icon, children, shouldWrap }: PropsWithChildren<Props>): ReactElement {
    return (
        <View style={styles.section} wrap={shouldWrap ? true : false}>
            <View style={styles.sectionHeader}>
                {Icon ? <Icon style={styles.sectionIcon} /> : null}
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            <View style={styles.sectionContent}>{children}</View>
        </View>
    )
}
