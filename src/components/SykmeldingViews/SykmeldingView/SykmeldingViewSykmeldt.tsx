import { ReactElement } from 'react'

import { Periode, SykmeldingFragment, UtdypendeOpplysning } from 'queries'

import { isV3 } from '../../../utils/sykmeldingUtils'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsdagerUtils'

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
import Egenmeldingsdager from './Sections/SykmeldingViewSykmeldt/Egenmeldingsdager'
import RedigerEgenmeldingsdagerLink from './Sections/SykmeldingViewSykmeldt/RedigerEgenmeldingsdagerLink'

interface Props {
    sykmelding: SykmeldingFragment
    editableEgenmelding: boolean
}

const sectionId = 'sykmelding-sykmeldt'

function SykmeldingViewSykmeldt({ sykmelding, editableEgenmelding }: Props): ReactElement {
    const isV3Sykmelding = isV3(sykmelding)
    const egenmeldingsdager = findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)

    return (
        <div>
            <SykmeldingenGjelder pasient={sykmelding.pasient} parentId={sectionId} />
            <Perioder
                perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)}
                isV3={isV3Sykmelding}
                parentId={sectionId}
            >
                {egenmeldingsdager && egenmeldingsdager.dager.length > 0 && (
                    <Egenmeldingsdager
                        sykmeldingId={sykmelding.id}
                        egenmeldingsdager={egenmeldingsdager}
                        sykmelding={sykmelding}
                        editableEgenmelding={editableEgenmelding}
                    />
                )}
                {editableEgenmelding && (
                    <RedigerEgenmeldingsdagerLink
                        sykmeldingId={sykmelding.id}
                        hasEgenmeldingsdager={egenmeldingsdager != null && egenmeldingsdager.dager.length > 0}
                    />
                )}
            </Perioder>

            <AnnenInfo sykmelding={sykmelding} parentId={sectionId} />

            <FlereOpplysninger>
                <MedisinskTilstand
                    medisinskVurdering={sykmelding.medisinskVurdering}
                    isV3={isV3Sykmelding}
                    parentId={`${sectionId}flere-opplysninger`}
                />
                {sykmelding.sykmeldingsperioder?.map(
                    (periode: Periode, index: number) =>
                        periode.aktivitetIkkeMulig && (
                            <AktivitetIkkeMulig
                                key={index}
                                aktivitetIkkeMulig={periode.aktivitetIkkeMulig}
                                isV3={isV3Sykmelding}
                                parentId={`${sectionId}flere-opplysninger-${index}`}
                            />
                        ),
                )}
                <Prognose
                    prognose={sykmelding.prognose}
                    isV3={isV3Sykmelding}
                    parentId={`${sectionId}flere-opplysninger`}
                />
                <UtdypendeOpplysninger
                    utdypendeOpplysninger={
                        sykmelding.utdypendeOpplysninger as Record<string, Record<string, UtdypendeOpplysning>>
                    }
                    parentId={`${sectionId}flere-opplysninger`}
                />
                <Arbeidsevne
                    tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                    tiltakNAV={sykmelding.tiltakNAV}
                    andreTiltak={sykmelding.andreTiltak}
                    parentId={`${sectionId}flere-opplysninger`}
                />
                <MeldingTilNav meldingTilNav={sykmelding.meldingTilNAV} parentId={`${sectionId}flere-opplysninger`} />
                <MeldingTilArbeidsgiver
                    meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver}
                    parentId={`${sectionId}flere-opplysninger`}
                />
                <Tilbakedatering
                    kontaktMedPasient={sykmelding.kontaktMedPasient}
                    parentId={`${sectionId}flere-opplysninger`}
                />
            </FlereOpplysninger>
        </div>
    )
}

export default SykmeldingViewSykmeldt
