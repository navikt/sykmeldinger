import { ReactElement } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'

import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { toReadableDate } from '../../../utils/dateUtils'
import { getBehandlerName } from '../../../utils/behandlerUtils'

import Information from './icons/Information'
import { Section } from './Section'
import { contentBorder, contentBorderRadius, contentMarginBottom, contentPadding, textMarginBottom } from './constants'

interface Props {
    sykmelding: Sykmelding
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

function AnnenInfo({ sykmelding }: Props): ReactElement | null {
    return (
        <Section title="Annen info" Icon={Information}>
            <View style={styles.content}>
                <View style={styles.view}>
                    <Text style={styles.title}>Dato sykmeldingen ble skrevet</Text>
                    <Text style={styles.text}>{toReadableDate(sykmelding.behandletTidspunkt)}</Text>
                </View>
                {sykmelding.utenlandskSykmelding ? (
                    <View style={styles.view}>
                        <Text style={styles.title}>Landet sykmeldingen ble skrevet</Text>
                        <Text style={styles.text}>{sykmelding.utenlandskSykmelding.land}</Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.view}>
                            <Text style={styles.title}>Sykmeldingen ble skrevet av</Text>
                            <Text style={styles.text}>{getBehandlerName(sykmelding.behandler)}</Text>
                            <Text style={styles.text}>
                                {sykmelding.behandler.tlf ? `Tlf: ${sykmelding.behandler.tlf}` : 'Tlf: mangler'}
                            </Text>
                        </View>
                        <View style={styles.view}>
                            {sykmelding.arbeidsgiver && sykmelding.arbeidsgiver?.navn && (
                                <View>
                                    <Text style={styles.title}>Arbeidsgiver som er oppgitt i sykmeldingen</Text>
                                    <Text style={styles.text}>{sykmelding.arbeidsgiver.navn}</Text>
                                </View>
                            )}
                        </View>
                    </>
                )}
            </View>
        </Section>
    )
}

export default AnnenInfo
