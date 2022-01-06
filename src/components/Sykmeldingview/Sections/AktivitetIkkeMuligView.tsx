import {
    AktivitetIkkeMuligPeriode,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
} from '../../../models/Sykmelding/Periode';
import ListEntry from '../Layout/ListEntry/ListEntry';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';
import './AktivitetIkkeMuligView.less';

interface AktivitetIkkeMuligViewProps {
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriode;
    arbeidsgiver: boolean;
}

const AktivitetIkkeMuligView: React.FC<AktivitetIkkeMuligViewProps> = ({ aktivitetIkkeMulig, arbeidsgiver }) => {
    if (!aktivitetIkkeMulig.medisinskArsak && !aktivitetIkkeMulig.arbeidsrelatertArsak) {
        return null;
    }

    if (arbeidsgiver && !aktivitetIkkeMulig.arbeidsrelatertArsak) {
        return null;
    }

    return (
        <div className="aktivitet-ikke-mulig">
            {!arbeidsgiver && !!aktivitetIkkeMulig.medisinskArsak && (
                <div className="aktivitet-ikke-mulig__arsak">
                    {aktivitetIkkeMulig.medisinskArsak?.arsak && (
                        <ListEntry
                            listTitle="Medisinske årsaker hindrer arbeidsrelatert aktivitet"
                            listText={aktivitetIkkeMulig.medisinskArsak.arsak.map(
                                (arsak) => MedisinskArsakType[arsak],
                            )}
                        />
                    )}
                    {aktivitetIkkeMulig.medisinskArsak?.beskrivelse && (
                        <SykmeldingEntry
                            title="Beskrivelse"
                            mainText={aktivitetIkkeMulig.medisinskArsak.beskrivelse}
                            small
                        />
                    )}
                </div>
            )}
            {!!aktivitetIkkeMulig.arbeidsrelatertArsak && (
                <div className="aktivitet-ikke-mulig__arsak">
                    {aktivitetIkkeMulig.arbeidsrelatertArsak?.arsak && (
                        <ListEntry
                            listTitle="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                            listText={aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.map(
                                (arsak) => ArbeidsrelatertArsakType[arsak],
                            )}
                        />
                    )}
                    {aktivitetIkkeMulig.arbeidsrelatertArsak?.beskrivelse && (
                        <SykmeldingEntry
                            title="Beskrivelse"
                            mainText={aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse}
                            small
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default AktivitetIkkeMuligView;
