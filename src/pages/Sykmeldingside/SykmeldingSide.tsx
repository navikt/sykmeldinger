import React from 'react';

import Brodsmuler, { Brodsmule } from '../../components/brodsmuler/brodsmuler';
import useAppStore from '../../store/useAppStore';
import NySykmelding from './sykmeldinger/NySykmelding/NySykmelding';
import { Status } from '../../types/sykmeldingDataTypes';
import AvvistSykmelding from './sykmeldinger/AvvistSykmelding/AvvistSykmelding';
import AvbruttSykmelding from './sykmeldinger/AvbruttSykmelding/AvbruttSykmelding';
import SendtSykmelding from './sykmeldinger/SendtSykmelding/SendtSykmelding';
import BekreftetSykmelding from './sykmeldinger/BekreftetSykmelding/BekreftetSykmelding';

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
            case Status.NY: {
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

            case Status.AVBRUTT:
                return <AvbruttSykmelding sykmelding={sykmelding} />;
            case Status.AVVIST:
                return <AvvistSykmelding sykmelding={sykmelding} />;
            case Status.SENDT:
                return <SendtSykmelding sykmelding={sykmelding} />;
            case Status.BEKREFTET:
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

export default SykmeldingSide;
