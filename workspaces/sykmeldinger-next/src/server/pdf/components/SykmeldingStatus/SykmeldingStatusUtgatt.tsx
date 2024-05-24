import { ReactElement } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

import { toReadableDate } from '../../../../utils/dateUtils'
import { Sykmelding } from '../../../api-models/sykmelding/Sykmelding'
import { sykmeldingStatusMarginBottom } from '../constants'
import InformationFilled from '../icons/InformationFilled'

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

const SykmeldingStatusUtgatt = ({ sykmelding }: Props): ReactElement => {
    return (
        <View style={styles.sykmeldingStatus}>
            <InformationFilled style={styles.icon} />
            <Text style={styles.title}>{`Utgått sykmelding: ${toReadableDate(
                sykmelding.sykmeldingStatus.timestamp,
            )}`}</Text>
        </View>
    )
}

export default SykmeldingStatusUtgatt
