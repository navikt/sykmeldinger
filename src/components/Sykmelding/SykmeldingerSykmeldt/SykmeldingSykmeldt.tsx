import { ReactElement } from 'react'

import { Periode, SykmeldingFragment, UtdypendeOpplysning } from 'queries'

import { isV3 } from '../../../utils/sykmeldingUtils'
import { getSykmeldingperioderSorted } from '../../../utils/periodeUtils'
import { findEgenmeldingsdager } from '../../../utils/egenmeldingsdagerUtils'

import Perioder from './Felles/Perioder'
import SykmeldingenGjelder from './Felles/SykmeldingenGjelder'
import Egenmeldingsdager from './Felles/Egenmeldingsdager'
import RedigerEgenmeldingsdagerLink from './Felles/RedigerEgenmeldingsdagerLink'
import FlereOpplysningerSykmeldt from './Nasjonal/FlereOpplysningerSykmeldt'
import MeldingTilNav from './Nasjonal/MeldingTilNav'
import UtdypendeOpplysninger from './Nasjonal/UtdypendeOpplysninger'
import AnnenInfo from './Nasjonal/AnnenInfo'
import MedisinskTilstand from './Nasjonal/MedisinskTilstand'
import AktivitetIkkeMulig from './Nasjonal/AktivitetIkkeMulig'
import Prognose from './Nasjonal/Prognose'
import Arbeidsevne from './Nasjonal/Arbeidsevne'
import MeldingTilArbeidsgiver from './Nasjonal/MeldingTilArbeidsgiver'
import Tilbakedatering from './Nasjonal/Tilbakedatering'
import { BrukerSvarExpansionCard } from './Felles/BrukerSvar'

interface Props {
    sykmelding: SykmeldingFragment
    editableEgenmelding: boolean
}

const sectionId = 'sykmelding-sykmeldt'

function SykmeldingSykmeldt({ sykmelding, editableEgenmelding }: Props): ReactElement {
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

            {sykmelding.sykmeldingStatus.brukerSvar && (
                <BrukerSvarExpansionCard title="Dine svar" brukerSvar={sykmelding.sykmeldingStatus.brukerSvar} />
            )}

            <FlereOpplysningerSykmeldt>
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
            </FlereOpplysningerSykmeldt>
        </div>
    )
}

export default SykmeldingSykmeldt
