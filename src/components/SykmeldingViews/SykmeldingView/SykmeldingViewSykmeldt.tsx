import { getSykmeldingperioderSorted, Sykmelding } from '../../../models/Sykmelding/Sykmelding';
import { Periode } from '../../../models/Sykmelding/Periode';

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
    sykmelding: Sykmelding;
}

const SykmeldingViewSykmeldt: React.FC<Props> = ({ sykmelding }) => {
    return (
        <div className={styles.sykmeldingViewSykmeldt}>
            <SykmeldingenGjelder pasient={sykmelding.pasient} />
            <Perioder perioder={getSykmeldingperioderSorted(sykmelding)} />
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
                <UtdypendeOpplysninger utdypendeOpplysninger={sykmelding.utdypendeOpplysninger} />
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
};

export default SykmeldingViewSykmeldt;
