import { ReactElement } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

import { toReadableDate } from '../../../../utils/dateUtils'
import { Sykmelding } from '../../../api-models/sykmelding/Sykmelding'
import { sykmeldingStatusMarginBottom } from '../constants'
import Warning from '../icons/Warning'

interface Props {
    sykmelding: Sykmelding
}

const styles = StyleSheet.create({
    sykmeldingStatus: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: sykmeldingStatusMarginBottom,
        marginTop: 12,
    },
    icon: { marginRight: 8 },
    title: { fontFamily: 'Helvetica-Bold', fontSize: 19 },
})

const SykmeldingStatusAvbrutt = ({ sykmelding }: Props): ReactElement => {
    return (
        <View style={styles.sykmeldingStatus}>
            <Warning style={styles.icon} />
            <Text style={styles.title}>{`Sykmeldingen ble avbrutt av deg ${toReadableDate(
                sykmelding.sykmeldingStatus.timestamp,
            )}`}</Text>
        </View>
    )
}

export default SykmeldingStatusAvbrutt
