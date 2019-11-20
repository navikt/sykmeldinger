import React from 'react';

import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';
import useAppStore from '../store/useAppStore';
import NySykmelding from '../components/sykmelding/nysykmelding/NySykmelding';
import { Status } from '../types/sykmeldingDataTypes';
import AvvistSykmelding from '../components/sykmelding/avvistsykmelding/AvvistSykmelding';
import AvbruttSykmelding from '../components/sykmelding/avbruttsykmelding/AvbruttSykmelding';
import SendtSykmelding from '../components/sykmelding/sendtsykmelding/SendtSykmelding';

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
    const { sykmelding, sykmeldingStatus } = useAppStore();

    if (!sykmelding) {
        // TODO: Error-melding, ingen sykmelding funnet
        return null;
    }

    const SykmeldingComponent = (() => {
        switch (sykmeldingStatus) {
            case Status.NY:
                return <NySykmelding sykmelding={sykmelding} />;
            case Status.AVBRUTT:
                return <AvbruttSykmelding sykmelding={sykmelding} />;
            case Status.AVVIST:
                return <AvvistSykmelding sykmelding={sykmelding} />;
            case Status.SENDT:
                return <SendtSykmelding sykmelding={sykmelding} />;
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
            {SykmeldingComponent}
        </div>
    );
};

export default SykmeldingSide;
