import { ReactElement } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

import { Sykmelding } from '../../../api-models/sykmelding/Sykmelding'
import { sykmeldingStatusMarginBottom, textMarginBottom } from '../constants'
import Warning from '../icons/Warning'
import { Merknadtype } from '../../../graphql/resolver-types.generated'

interface Props {
    sykmelding: Sykmelding
}

const styles = StyleSheet.create({
    avvistStatus: { marginBottom: sykmeldingStatusMarginBottom, marginTop: 12, paddingRight: 140 },
    avvistHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: { marginRight: 8 },
    title: { fontFamily: 'Helvetica-Bold', fontSize: 19 },
    underTitle: { fontFamily: 'Helvetica-Bold', marginBottom: 8 },
    text: { marginBottom: textMarginBottom },
})

const SykmeldingStatusAvvist = ({ sykmelding }: Props): ReactElement | null => {
    const behandlingsutfall = sykmelding.behandlingsutfall.status

    if (
        behandlingsutfall === 'INVALID' ||
        sykmelding.merknader?.some((merknad) => merknad.type === Merknadtype.UGYLDIG_TILBAKEDATERING)
    ) {
        return (
            <View style={styles.avvistStatus}>
                <View style={styles.avvistHeader}>
                    <Warning style={styles.icon} />
                    <Text style={styles.title}>Avvist sykmelding</Text>
                </View>
                {sykmelding.behandlingsutfall.ruleHits.length > 0 && (
                    <View>
                        <Text style={styles.underTitle}>Grunnen til at sykmeldingen er avvist:</Text>
                        {sykmelding.behandlingsutfall.ruleHits.map((grunn, index) => (
                            <Text key={index} style={styles.text}>
                                {`- ${grunn.messageForUser}`}
                            </Text>
                        ))}
                    </View>
                )}
            </View>
        )
    }
    return null
}

export default SykmeldingStatusAvvist
