import { Element } from 'nav-frontend-typografi';
import Periode, {
    AktivitetIkkeMuligPeriode,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
} from '../../../models/Sykmelding/Periode';
import CheckboxEntry from '../Layout/CheckboxEntry/CheckboxEntry';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';
import './PeriodeView.less';

interface AktivitetIkkeMuligViewProps {
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriode;
    arbeidsgiver?: boolean;
}

const AktivitetIkkeMuligView: React.FC<AktivitetIkkeMuligViewProps> = ({
    aktivitetIkkeMulig,
    arbeidsgiver = false,
}) => {
    if (!aktivitetIkkeMulig.medisinskArsak && !aktivitetIkkeMulig.arbeidsrelatertArsak) {
        return null;
    }

    return (
        <div className="aktivitet-ikke-mulig">
            {!arbeidsgiver && !!aktivitetIkkeMulig.medisinskArsak && (
                <div className="aktivitet-ikke-mulig__arsak">
                    {aktivitetIkkeMulig.medisinskArsak && (
                        <Element>Medisinske årsaker hindrer arbeidsrelatert aktivitet</Element>
                    )}
                    {aktivitetIkkeMulig.medisinskArsak?.arsak && (
                        <CheckboxEntry
                            show={Boolean(aktivitetIkkeMulig.medisinskArsak.arsak.length)}
                            checkboxText={aktivitetIkkeMulig.medisinskArsak.arsak.map(
                                (arsak) => MedisinskArsakType[arsak],
                            )}
                        />
                    )}
                    {aktivitetIkkeMulig.medisinskArsak?.beskrivelse && (
                        <SykmeldingEntry
                            title="Begrunnelse for vurdering av aktivitetskravet"
                            mainText={aktivitetIkkeMulig.medisinskArsak.beskrivelse}
                            small
                        />
                    )}
                </div>
            )}
            {!!aktivitetIkkeMulig.arbeidsrelatertArsak && (
                <div className="aktivitet-ikke-mulig__arsak">
                    {aktivitetIkkeMulig.arbeidsrelatertArsak && (
                        <Element>Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet</Element>
                    )}
                    {aktivitetIkkeMulig.arbeidsrelatertArsak?.arsak && (
                        <CheckboxEntry
                            show={Boolean(aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.length)}
                            checkboxText={aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.map(
                                (arsak) => ArbeidsrelatertArsakType[arsak],
                            )}
                        />
                    )}
                    {aktivitetIkkeMulig.arbeidsrelatertArsak?.beskrivelse && (
                        <SykmeldingEntry
                            title="Nærmere beskrivelse"
                            mainText={aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse}
                            small
                        />
                    )}
                </div>
            )}
        </div>
    );
};

interface PeriodeViewProps {
    perioder: Periode[];
    arbeidsgiver?: boolean;
}

const PeriodeView: React.FC<PeriodeViewProps> = ({ perioder, arbeidsgiver = false }) => {
    return (
        <div className="periode-view">
            {perioder.map((periode, index) => (
                <div key={index} className="periode-view__periode">
                    <SykmeldingEntry
                        title={periode.getPeriodTitle()}
                        mainText={periode.getReadablePeriod()}
                        subText={periode.getReadableLength()}
                    />
                    {!!periode.innspillTilArbeidsgiver && (
                        <SykmeldingEntry
                            title="Innspill til arbeidsgver om tilrettelegging"
                            mainText={periode.innspillTilArbeidsgiver}
                            small
                        />
                    )}
                    {!!periode.aktivitetIkkeMulig && (
                        <AktivitetIkkeMuligView
                            aktivitetIkkeMulig={periode.aktivitetIkkeMulig}
                            arbeidsgiver={arbeidsgiver}
                        />
                    )}
                    <CheckboxEntry
                        show={Boolean(periode.gradert?.reisetilskudd)}
                        checkboxText="Pasienten kan være i delvis arbeids ved bruk av reisetilskudd"
                    />
                </div>
            ))}
        </div>
    );
};

export default PeriodeView;
