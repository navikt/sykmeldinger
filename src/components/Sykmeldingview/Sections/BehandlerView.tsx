import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

const BehandlerView: React.FC<{ navnFastlege?: string }> = ({ navnFastlege }) => {
    if (!navnFastlege) {
        return null;
    }

    return <SykmeldingEntry title="Behandler" mainText={navnFastlege} />;
};

export default BehandlerView;
