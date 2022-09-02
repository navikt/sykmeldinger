import { Periode, SykmeldingFragment, UtdypendeOpplysning } from '../../../fetching/graphql.generated';
import { getSykmeldingperioderSorted } from '../../../utils/sykmeldingUtils';

import FlereOpplysninger from './FlereOpplysninger';
import MeldingTilNav from './Sections/SykmeldingViewSykmeldt/MeldingTilNav';
import Perioder from './Sections/SykmeldingViewSykmeldt/Perioder';
import UtdypendeOpplysninger from './Sections/SykmeldingViewSykmeldt/UtdypendeOpplysninger';
import SykmeldingenGjelder from './Sections/SykmeldingViewSykmeldt/SykmeldingenGjelder';
import AnnenInfo from './Sections/SykmeldingViewSykmeldt/AnnenInfo';
import MedisinskTilstand from './Sections/SykmeldingViewSykmeldt/MedisinskTilstand';
import AktivitetIkkeMulig from './Sections/SykmeldingViewSykmeldt/AktivitetIkkeMulig';
import Prognose from './Sections/SykmeldingViewSykmeldt/Prognose';
import Arbeidsevne from './Sections/SykmeldingViewSykmeldt/Arbeidsevne';
import MeldingTilArbeidsgiver from './Sections/SykmeldingViewSykmeldt/MeldingTilArbeidsgiver';
import Tilbakedatering from './Sections/SykmeldingViewSykmeldt/Tilbakedatering';
import styles from './SykmeldingViewSykmeldt.module.css';

interface Props {
    sykmelding: SykmeldingFragment;
}

function SykmeldingViewSykmeldt({ sykmelding }: Props): JSX.Element {
    return (
        <div className={styles.sykmeldingViewSykmeldt}>
            <SykmeldingenGjelder pasient={sykmelding.pasient} />
            <Perioder perioder={getSykmeldingperioderSorted(sykmelding.sykmeldingsperioder)} />
            <AnnenInfo sykmelding={sykmelding} />

            <FlereOpplysninger>
                <MedisinskTilstand medisinskVurdering={sykmelding.medisinskVurdering} />
                {sykmelding.sykmeldingsperioder?.map(
                    (periode: Periode, index: number) =>
                        periode.aktivitetIkkeMulig && (
                            <AktivitetIkkeMulig key={index} aktivitetIkkeMulig={periode.aktivitetIkkeMulig} />
                        ),
                )}
                <Prognose prognose={sykmelding.prognose} />
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
    );
}

export default SykmeldingViewSykmeldt;
