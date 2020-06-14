import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AvbruttSykmelding from './AvbruttSykmelding/AvbruttSykmelding';
import AvvistSykmelding from './AvvistSykmelding/AvvistSykmelding';
import BekreftetSykmelding from './BekreftetSykmelding/BekreftetSykmelding';
import Brodsmuler from '../commonComponents/Breadcrumbs/Breadcrumbs';
import Header from '../commonComponents/Header/Header';
import NySykmelding from './NySykmelding/NySykmelding';
import SendtSykmelding from './SendtSykmelding/SendtSykmelding';
import { StatusTyper, Sykmelding } from '../../types/sykmeldingTypes';
import Arbeidsgiver from '../../types/arbeidsgiverTypes';
import { ReceivedSykmelding } from '../../types/receivedSykmeldingTypes';
import { getSykmeldingPeriod } from './NySykmelding/sykmeldingUtils';

const SykmeldingSide = () => {
    const { sykmeldingId } = useParams();

    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [status, setStatus] = useState<StatusTyper | null>(null);
    const [arbeidsgivere, setArbeidsgivere] = useState<Arbeidsgiver[] | null>(null);

    useEffect(() => {
        console.log('Fetching sykmeldingdata for id: ' + sykmeldingId);

        fetch(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/${sykmeldingId}`)
            .then((response) => response.json())
            .then((data: ReceivedSykmelding) => {
                const { status, sykmelding } = data;
                setStatus(status);
                setSykmelding(new Sykmelding(sykmelding));
            });
    }, [sykmeldingId]);

    useEffect(() => {
        console.log('Fetching arbeidsgivere for id: ' + sykmeldingId);

        fetch(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere/${sykmeldingId}`)
            .then((response) => response.json())
            .then((data: Arbeidsgiver[]) => {
                const mappedArbeidsgivere = data.map((arbeidsgiver) => new Arbeidsgiver(arbeidsgiver));
                setArbeidsgivere(mappedArbeidsgivere);
            });
    }, [sykmeldingId]);

    // TODO: Reimplement this. Previously it was collected by calling an endpoint after the sykmelding was fetched if the sykmelding had status "NY". Should be fetched together with the sykmelding.
    const sykmeldingUtenforVentetid = false;

    if (!sykmelding || arbeidsgivere === null) {
        // TODO: Error-melding, ingen sykmelding funnet
        return null;
    }

    const SykmeldingComponent = (() => {
        if (status === 'NY') {
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

        if (status === 'AVVIST') {
            return <AvvistSykmelding sykmelding={sykmelding} />;
        }

        if (status === 'AVBRUTT') {
            return <AvbruttSykmelding sykmelding={sykmelding} />;
        }

        if (status === 'SENDT') {
            return <SendtSykmelding sykmelding={sykmelding} />;
        }

        if (status === 'BEKREFTET') {
            return <BekreftetSykmelding sykmelding={sykmelding} />;
        }
    })();

    if (!SykmeldingComponent) {
        // TODO: Error-melding, ingen gyldig sykemeldingstype definert
        return null;
    }

    const periodString = getSykmeldingPeriod(sykmelding);

    return (
        <>
            <Header title="Sykmelding" subtitle={`for ${periodString}`} />
            <div className="limit">
                <Brodsmuler
                    breadcrumbs={[
                        {
                            title: 'Sykefravær',
                            path: '/sykefravaer',
                        },
                        {
                            title: 'Sykmeldinger',
                            path: '/sykefravaer/sykmeldinger',
                        },
                        {
                            title: 'Sykmelding',
                        },
                    ]}
                />
                {SykmeldingComponent}
            </div>
        </>
    );
};

export default SykmeldingSide;
