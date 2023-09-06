import { ReactElement } from 'react'
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { toReadableDate } from '../../../utils/dateUtils'
import { Periode } from '../../api-models/sykmelding/Periode'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'

import NavLogoRedSvg from './NavLogoRedSvg'
import { GeneratedTimestamp, PageNumbers } from './FooterItems'
import { pageMargin } from './constants'
import SykmeldingenGjelder from './SykmeldingenGjelder'
import Perioder from './Perioder'
import AnnenInfo from './AnnenInfo'
import AktivitetIkkeMulig from './AktivitetIkkeMulig'
import Prognose from './Prognose'
import Arbeidsevne from './Arbeidsevne'
import MeldingTilNav from './MeldingTilNav'
import MeldingTilArbeidsgiver from './MeldingTilArbeidsgiver'
import Tilbakedatering from './Tilbakedatering'
import SykmeldingStatus from './SykmeldingStatus/SykmeldingStatus'

interface Props {
    sykmelding: Sykmelding
    timestamp: string
}

/**
 * This is a server side only component that creates a PDF of the sykmelding.
 * This entire render tree must ONLY use components from @react-pdf/renderer. Normal components will fail to render.
 */
const SykmeldingPdf = ({ sykmelding, timestamp }: Props): ReactElement => {
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>
                <NavLogoRedSvg style={styles.navLogo} />
                <SykmeldingStatus sykmelding={sykmelding} />
                <View style={styles.header}>
                    <Text style={styles.heading}>Opplysninger fra sykmeldingen</Text>
                    <Text>Sendt til oss {toReadableDate(sykmelding.mottattTidspunkt)}</Text>
                </View>
                <SykmeldingenGjelder pasient={sykmelding.pasient} />
                <Perioder
                    perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                    sporsmalOgSvarListe={sykmelding.sykmeldingStatus.sporsmalOgSvarListe}
                />
                <AnnenInfo sykmelding={sykmelding} />
                {!sykmelding.utenlandskSykmelding && (
                    <>
                        {sykmelding.sykmeldingsperioder?.map(
                            (periode: Periode, index: number) =>
                                periode.aktivitetIkkeMulig && (
                                    <AktivitetIkkeMulig key={index} aktivitetIkkeMulig={periode.aktivitetIkkeMulig} />
                                ),
                        )}
                        <Prognose prognose={sykmelding.prognose} />
                        <Arbeidsevne tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen} />
                        <MeldingTilNav meldingTilNav={sykmelding.meldingTilNAV} />
                        <MeldingTilArbeidsgiver meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver} />
                        <Tilbakedatering kontaktMedPasient={sykmelding.kontaktMedPasient} />
                        <PageNumbers />
                        <GeneratedTimestamp timestamp={timestamp} />
                    </>
                )}
            </Page>
        </Document>
    )
}

const styles = StyleSheet.create({
    navLogo: { marginBottom: 22 },
    page: { margin: pageMargin, paddingBottom: 90, fontSize: 14 },
    header: { marginBottom: 12 },
    heading: { fontFamily: 'Helvetica-Bold', fontSize: 18, marginBottom: 4 },
})

export default SykmeldingPdf
