import ArbeidsgiverSykmelding from '../../../models/Sykmelding/ArbeidsgiverSykmelding';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

const ArbeidsgiverView: React.FC<{ arbeidsgiver?: ArbeidsgiverSykmelding }> = ({ arbeidsgiver }) => {
    if (!arbeidsgiver?.navn) {
        return null;
    }

    return <SykmeldingEntry title="Arbeidsgiver" mainText={arbeidsgiver.navn} />;
};

export default ArbeidsgiverView;
