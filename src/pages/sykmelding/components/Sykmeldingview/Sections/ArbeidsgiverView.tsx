import ArbeidsgiverSykmelding from '../../../../../models/Sykmelding/ArbeidsgiverSykmelding';
import SykmeldingEntry from '../Layout/SykmeldingEntry';

const ArbeidsgiverView: React.FC<{ arbeidsgiver?: ArbeidsgiverSykmelding }> = ({ arbeidsgiver }) => {
    if (!arbeidsgiver?.navn) {
        return null;
    }

    return <SykmeldingEntry title="Arbeidsgiver som legen har skrevet inn" mainText={arbeidsgiver.navn} />;
};

export default ArbeidsgiverView;
