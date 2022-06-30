import { ArbeidsgiverSykmelding } from '../../../../../fetching/graphql.generated';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';

interface Props {
    arbeidsgiver: ArbeidsgiverSykmelding | null | undefined;
}

function ArbeidsgiverView({ arbeidsgiver }: Props): JSX.Element | null {
    if (arbeidsgiver?.navn == null) {
        return null;
    }

    return <SykmeldingEntry title="Arbeidsgiver" mainText={arbeidsgiver.navn} />;
}

export default ArbeidsgiverView;
