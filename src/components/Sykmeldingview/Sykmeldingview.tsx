import cn from 'classnames';

import { Sykmelding } from '../../models/Sykmelding/Sykmelding';
import DateFormatter from '../../utils/DateFormatter';

import FlereOpplysninger from './FlereOpplysninger';
import ArbeidsevneView from './Sections/ArbeidsevneView';
import MedisinskVurderingView from './Sections/MedisinskVurderingView';
import MeldingTilArbeidsgiverView from './Sections/MeldingTilArbeidsgiverView';
import MeldingTilNavView from './Sections/MeldingTilNavView';
import PeriodeView from './Sections/PeriodeView';
import AktivitetIkkeMuligView from './Sections/AktivitetIkkeMuligView';
import ArbeidsgiverView from './Sections/ArbeidsgiverView';
import TilbakedateringView from './Sections/TilbakedateringView';
import UtdypendeOpplysningerView from './Sections/UtdypendeOpplysningerView';
import PrognoseView from './Sections/PrognoseView';
import AnnetView from './Sections/AnnetView';
import SykmeldingEntry from './Layout/SykmeldingEntry/SykmeldingEntry';
import PasientView from './Sections/PasientView';
import styles from './Sykmeldingview.module.css';

interface SykmeldingviewProps {
    sykmelding: Sykmelding;
    arbeidsgiver: boolean;
}

const Sykmeldingview: React.FC<SykmeldingviewProps> = ({ sykmelding, arbeidsgiver = false }) => {
    return (
        <div
            className={cn({
                [styles.sykmeldingsview]: !arbeidsgiver,
                [styles.arbeidsgiver]: arbeidsgiver,
            })}
        >
            <PasientView pasient={sykmelding.pasient} arbeidsgiver={arbeidsgiver} />

            <PeriodeView perioder={sykmelding.getSykmeldingperioderSorted()} />

            <SykmeldingEntry title="Behandler" mainText={sykmelding.behandler.getName()} />
            <ArbeidsgiverView arbeidsgiver={sykmelding.arbeidsgiver} />

            <FlereOpplysninger disableExpand={arbeidsgiver}>
                <div
                    className={cn({
                        [styles.datoSykmeldingenBleSkrevet]: !arbeidsgiver,
                        [styles.datoSykmeldingenBleSkrevetArbeidsgiver]: arbeidsgiver,
                    })}
                >
                    <SykmeldingEntry
                        title="Dato sykmeldingen ble skrevet"
                        //  TODO is this the correct field? Ref. slack thread
                        mainText={DateFormatter.toReadableDate(sykmelding.behandletTidspunkt)}
                    />
                </div>

                <MedisinskVurderingView
                    medisinskVurdering={sykmelding.medisinskVurdering}
                    arbeidsgiver={arbeidsgiver}
                />

                {sykmelding.sykmeldingsperioder?.map((periode, index) => (
                    <div key={index}>
                        {!!periode.aktivitetIkkeMulig && (
                            <AktivitetIkkeMuligView
                                aktivitetIkkeMulig={periode.aktivitetIkkeMulig}
                                arbeidsgiver={arbeidsgiver}
                            />
                        )}
                    </div>
                ))}

                <PrognoseView prognose={sykmelding.prognose} arbeidsgiver={arbeidsgiver} />

                <UtdypendeOpplysningerView
                    utdypendeOpplysninger={sykmelding.utdypendeOpplysninger}
                    arbeidsgiver={arbeidsgiver}
                />

                <ArbeidsevneView
                    tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                    tiltakNAV={sykmelding.tiltakNAV}
                    andreTiltak={sykmelding.andreTiltak}
                    arbeidsgiver={arbeidsgiver}
                />

                <MeldingTilNavView meldingTilNav={sykmelding.meldingTilNAV} arbeidsgiver={arbeidsgiver} />

                <MeldingTilArbeidsgiverView meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver} />

                <TilbakedateringView kontaktMedPasient={sykmelding.kontaktMedPasient} arbeidsgiver={arbeidsgiver} />

                <AnnetView behandler={sykmelding.behandler} />
            </FlereOpplysninger>
        </div>
    );
};

export default Sykmeldingview;
