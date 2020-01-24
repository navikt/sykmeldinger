import React from 'react';

import AvbruttSykmelding from './AvbruttSykmelding/AvbruttSykmelding';
import AvvistSykmelding from './AvvistSykmelding/AvvistSykmelding';
import BekreftetSykmelding from './BekreftetSykmelding/BekreftetSykmelding';
import DataFetcher from '../components/DataFetcher';
import Header from '../components/Header/Header';
import NySykmelding from './NySykmelding/NySykmelding';
import SendtSykmelding from './SendtSykmelding/SendtSykmelding';
import useAppStore from '../store/useAppStore';
import Brodsmuler, { Brodsmule } from '../components/Brodsmuler/Brodsmuler';
import { StatusTyper } from '../types/sykmeldingTypes';

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

const SykmeldingSide = () => {
    const { sykmelding, sykmeldingStatus, arbeidsgivere, sykmeldingUtenforVentetid } = useAppStore();

    if (!sykmelding || arbeidsgivere === null) {
        // TODO: Error-melding, ingen sykmelding funnet
        return null;
    }

    const SykmeldingComponent = (() => {
        switch (sykmeldingStatus) {
            case StatusTyper.NY: {
                if (sykmeldingUtenforVentetid === null) {
                    // TODO: Error-melding, ingen sykmelding funnet
                    return null;
                }

                return (
                    <NySykmelding
                        sykmelding={sykmelding}
                        arbeidsgivere={arbeidsgivere}
                        sykmeldingUtenforVentetid={sykmeldingUtenforVentetid}
                    />
                );
            }

            case StatusTyper.AVBRUTT:
                return <AvbruttSykmelding sykmelding={sykmelding} />;
            case StatusTyper.AVVIST:
                return <AvvistSykmelding sykmelding={sykmelding} />;
            case StatusTyper.SENDT:
                return <SendtSykmelding sykmelding={sykmelding} />;
            case StatusTyper.BEKREFTET:
                return <BekreftetSykmelding sykmelding={sykmelding} />;
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

const SykmeldingWithFetcher = () => {
    return (
        <DataFetcher>
            <Header location="Sykmelding" />
            <SykmeldingSide />
        </DataFetcher>
    );
};

export default SykmeldingWithFetcher;
