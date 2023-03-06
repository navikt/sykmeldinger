import { Periode, SykmeldingFragment, UtdypendeOpplysning } from '../../../fetching/graphql.generated'
import { isV3 } from '../../../utils/sykmeldingUtils'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsdagerUtils'
import { getPublicEnv } from '../../../utils/env'

import FlereOpplysninger from './FlereOpplysninger'
import MeldingTilNav from './Sections/SykmeldingViewSykmeldt/MeldingTilNav'
import Perioder from './Sections/SykmeldingViewSykmeldt/Perioder'
import UtdypendeOpplysninger from './Sections/SykmeldingViewSykmeldt/UtdypendeOpplysninger'
import SykmeldingenGjelder from './Sections/SykmeldingViewSykmeldt/SykmeldingenGjelder'
import AnnenInfo from './Sections/SykmeldingViewSykmeldt/AnnenInfo'
import MedisinskTilstand from './Sections/SykmeldingViewSykmeldt/MedisinskTilstand'
import AktivitetIkkeMulig from './Sections/SykmeldingViewSykmeldt/AktivitetIkkeMulig'
import Prognose from './Sections/SykmeldingViewSykmeldt/Prognose'
import Arbeidsevne from './Sections/SykmeldingViewSykmeldt/Arbeidsevne'
import MeldingTilArbeidsgiver from './Sections/SykmeldingViewSykmeldt/MeldingTilArbeidsgiver'
import Tilbakedatering from './Sections/SykmeldingViewSykmeldt/Tilbakedatering'
import styles from './SykmeldingViewSykmeldt.module.css'
import Egenmeldingsdager from './Sections/SykmeldingViewSykmeldt/Egenmeldingsdager/Egenmeldingsdager'

const publicEnv = getPublicEnv()

interface Props {
    sykmelding: SykmeldingFragment
    editableEgenmelding: boolean
}

function SykmeldingViewSykmeldt({ sykmelding, editableEgenmelding }: Props): JSX.Element {
    const isV3Sykmelding = isV3(sykmelding)
    const egenmeldingsdager = findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)

    return (
        <div className={styles.sykmeldingViewSykmeldt}>
            <SykmeldingenGjelder pasient={sykmelding.pasient} />
            <Perioder perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)} isV3={isV3Sykmelding} />
            {publicEnv.DISPLAY_EGENMELDING === 'true' && egenmeldingsdager && (
                <Egenmeldingsdager
                    egenmeldingsdager={egenmeldingsdager}
                    sykmelding={sykmelding}
                    editableEgenmelding={editableEgenmelding}
                />
            )}
            <AnnenInfo sykmelding={sykmelding} />

            <FlereOpplysninger>
                <MedisinskTilstand medisinskVurdering={sykmelding.medisinskVurdering} isV3={isV3Sykmelding} />
                {sykmelding.sykmeldingsperioder?.map(
                    (periode: Periode, index: number) =>
                        periode.aktivitetIkkeMulig && (
                            <AktivitetIkkeMulig
                                key={index}
                                aktivitetIkkeMulig={periode.aktivitetIkkeMulig}
                                isV3={isV3Sykmelding}
                            />
                        ),
                )}
                <Prognose prognose={sykmelding.prognose} isV3={isV3Sykmelding} />
                <UtdypendeOpplysninger
                    utdypendeOpplysninger={
                        sykmelding.utdypendeOpplysninger as Record<string, Record<string, UtdypendeOpplysning>>
                    }
                />
                <Arbeidsevne
                    tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                    tiltakNAV={sykmelding.tiltakNAV}
                    andreTiltak={sykmelding.andreTiltak}
                />
                <MeldingTilNav meldingTilNav={sykmelding.meldingTilNAV} />
                <MeldingTilArbeidsgiver meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver} />
                <Tilbakedatering kontaktMedPasient={sykmelding.kontaktMedPasient} />
            </FlereOpplysninger>
        </div>
    )
}

export default SykmeldingViewSykmeldt
