import React from 'react';

import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';
import useAppStore from '../store/useAppStore';
import NySykmelding from '../components/sykmelding/NySykmelding';
import { Status } from '../types/sykmeldingDataTypes';
import AvvistSykmelding from '../components/sykmelding/AvvistSykmelding';
import AvbruttSykmelding from '../components/sykmelding/AvbruttSykmelding';

const brodsmuler: Brodsmule[] = [
    {
        tittel: 'Ditt sykefravaer',
        sti: '/',
        erKlikkbar: true,
    },
    {
        tittel: 'Sykmeldinger',
        sti: '/sykmeldinger',
        erKlikkbar: true,
    },
    {
        tittel: 'Sykmelding',
        sti: '/sykmeldinger/:id',
        erKlikkbar: false,
    },
];

const SykmeldingSide: React.FC = props => {
    const { sykmelding, sykmeldingType } = useAppStore();

    if (!sykmeldingType) {
        // TODO: Error-melding, ingen sykmelding funnet
        return null;
    }

    const SykmeldingComponent = (() => {
        switch (sykmeldingType) {
            case Status.NY:
                return <NySykmelding sykmeldingtype={'NY'} />;
            case Status.AVBRUTT:
                return <AvbruttSykmelding sykmeldingtype={'NY'} />;
            case Status.AVVIST:
                return <AvvistSykmelding sykmeldingtype={'NY'} />;
            default:
                return null;
        }
    })();

    if (!SykmeldingComponent) {
        // TODO: Error-melding, ingen gyldig sykemeldingstype definert
        return null;
    }

    return (
        <div className="limit">
            <Brodsmuler brodsmuler={brodsmuler} />
            <p>Sykmelding side</p>
            {SykmeldingComponent}
        </div>
    );
};

export default SykmeldingSide;
