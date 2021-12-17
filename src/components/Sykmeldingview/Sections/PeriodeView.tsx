import Periode from '../../../models/Sykmelding/Periode';
import CheckboxEntry from '../Layout/CheckboxEntry/CheckboxEntry';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';
import './PeriodeView.less';

interface PeriodeViewProps {
    perioder: Periode[];
}

const PeriodeView: React.FC<PeriodeViewProps> = ({ perioder }) => {
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
                    <CheckboxEntry
                        show={Boolean(periode.gradert?.reisetilskudd)}
                        checkboxText="Pasienten kan være i delvis arbeid ved bruk av reisetilskudd"
                    />
                </div>
            ))}
        </div>
    );
};

export default PeriodeView;
