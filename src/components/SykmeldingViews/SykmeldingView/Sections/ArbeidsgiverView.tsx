import { ArbeidsgiverSykmelding } from '../../../../models/Sykmelding/ArbeidsgiverSykmelding';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

interface Props {
    arbeidsgiver: ArbeidsgiverSykmelding | null;
}

function ArbeidsgiverView({ arbeidsgiver }: Props): JSX.Element | null {
    if (arbeidsgiver?.navn == null) {
        return null;
    }

    return <SykmeldingEntry title="Arbeidsgiver" mainText={arbeidsgiver.navn} />;
}

export default ArbeidsgiverView;
