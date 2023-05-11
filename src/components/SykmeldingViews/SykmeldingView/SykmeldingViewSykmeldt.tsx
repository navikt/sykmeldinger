import { Periode, SykmeldingFragment, UtdypendeOpplysning } from '../../../fetching/graphql.generated'
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

function SykmeldingViewSykmeldt({ sykmelding, editableEgenmelding }: Props): JSX.Element {
    const isV3Sykmelding = isV3(sykmelding)
    const egenmeldingsdager = findEgenmeldingsdager(sykmelding.sykmeldingStatus.sporsmalOgSvarListe)

    return (
        <div>
            <SykmeldingenGjelder pasient={sykmelding.pasient} />
            <Perioder perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)} isV3={isV3Sykmelding} />
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
                    hasEgenmeldingsdager={egenmeldingsdager != null}
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
