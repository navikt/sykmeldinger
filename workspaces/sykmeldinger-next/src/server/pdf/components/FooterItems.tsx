import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { ReactElement } from 'react'
import { format } from 'date-fns'

import { toDate } from '../../../utils/dateUtils'

import { pageMargin } from './constants'

const styles = StyleSheet.create({
    pageNumbers: { position: 'absolute', bottom: pageMargin + 8, left: -pageMargin + 8, fontSize: 12 },
    timestamp: { position: 'absolute', bottom: pageMargin + 8, right: pageMargin + 8, fontSize: 12 },
})

export function PageNumbers(): ReactElement {
    return (
        <View fixed style={styles.pageNumbers}>
            <Text render={({ pageNumber, totalPages }) => `Side ${pageNumber} av ${totalPages}`} fixed />
        </View>
    )
}

export function GeneratedTimestamp({ timestamp }: { timestamp: string }): ReactElement {
    return (
        <View fixed style={styles.timestamp}>
            <Text fixed>{format(toDate(timestamp), 'dd/MM/yyyy, HH:mm')}</Text>
        </View>
    )
}
