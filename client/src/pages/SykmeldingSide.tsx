import React from 'react';
import { useParams } from 'react-router-dom';

import AvbruttSykmelding from './AvbruttSykmelding/AvbruttSykmelding';
import AvvistSykmelding from './AvvistSykmelding/AvvistSykmelding';
import BekreftetSykmelding from './BekreftetSykmelding/BekreftetSykmelding';
import Brodsmuler from '../components/Brodsmuler/Brodsmuler';
import DataFetcher from '../components/DataFetcher';
import Header from '../components/Header/Header';
import NySykmelding from './NySykmelding/NySykmelding';
import SendtSykmelding from './SendtSykmelding/SendtSykmelding';
import useAppStore from '../store/useAppStore';
import { StatusTyper } from '../types/sykmeldingTypes';

const getBrodsmuler = (fravaerId?: string) => {
    return [
        {
            tittel: 'Sykefravær',
            sti: '/',
            erKlikkbar: true,
        },
        {
            tittel: 'Oversikt',
            sti: '/fravaer',
            erKlikkbar: true,
        },
        {
            tittel: 'Status',
            sti: `/fravaer/${fravaerId}`,
            erKlikkbar: true,
        },
        {
            tittel: 'Sykmelding',
            sti: '/sykmeldinger/:id',
            erKlikkbar: false,
        },
    ];
};

const SykmeldingSide = () => {
    const { sykmelding, sykmeldingStatus, arbeidsgivere, sykmeldingUtenforVentetid } = useAppStore();
    const { fravaerId } = useParams();

    console.log(sykmeldingStatus)

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

    const brodsmuler = getBrodsmuler(fravaerId);

    return (
        <>
            <Header location="Sykmelding" />
            <div className="limit">
                <Brodsmuler brodsmuler={brodsmuler} />
                {SykmeldingComponent}
            </div>
        </>
    );
};

const SykmeldingWithFetcher = () => {
    return (
        <DataFetcher>
            <SykmeldingSide />
        </DataFetcher>
    );
};

export default SykmeldingWithFetcher;
