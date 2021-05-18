import { Element } from 'nav-frontend-typografi';
import Periode, {
    AktivitetIkkeMuligPeriode,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
} from '../../../models/Sykmelding/Periode';
import CheckboxEntry from '../Layout/CheckboxEntry';
import SykmeldingEntry from '../Layout/SykmeldingEntry';
import './PeriodeView.less';

const AktivitetIkkeMuligView: React.FC<{ aktivitetIkkeMulig: AktivitetIkkeMuligPeriode }> = ({
    aktivitetIkkeMulig,
}) => {
    return (
        <div className="aktivitet-ikke-mulig">
            <div className="aktivitet-ikke-mulig__medisinsk-arsak">
                {aktivitetIkkeMulig.medisinskArsak && (
                    <Element>Medisinske årsaker hindrer arbeidsrelatert aktivitet</Element>
                )}
                {aktivitetIkkeMulig.medisinskArsak?.arsak && (
                    <CheckboxEntry
                        show
                        checkboxText={aktivitetIkkeMulig.medisinskArsak.arsak.map((arsak) => MedisinskArsakType[arsak])}
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
            <div className="aktivitet-ikke-mulig__arbeidsrelatert-arsak">
                {aktivitetIkkeMulig.arbeidsrelatertArsak && (
                    <Element>Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet</Element>
                )}
                {aktivitetIkkeMulig.arbeidsrelatertArsak?.arsak && (
                    <CheckboxEntry
                        show
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
        </div>
    );
};

const PeriodeView: React.FC<{ perioder: Periode[] }> = ({ perioder }) => {
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
                        <AktivitetIkkeMuligView aktivitetIkkeMulig={periode.aktivitetIkkeMulig} />
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
