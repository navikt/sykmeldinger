import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AvbruttSykmelding from './AvbruttSykmelding/AvbruttSykmelding';
import AvvistSykmelding from './AvvistSykmelding/AvvistSykmelding';
import BekreftetSykmelding from './BekreftetSykmelding/BekreftetSykmelding';
import Brodsmuler from '../commonComponents/Breadcrumbs/Breadcrumbs';
import Header from '../commonComponents/Header/Header';
import NySykmelding from './NySykmelding/NySykmelding';
import SendtSykmelding from './SendtSykmelding/SendtSykmelding';
import { getSykmeldingPeriod } from './NySykmelding/sykmeldingUtils';
import { Arbeidsgiver } from '../../types/arbeidsgiver';
import { Sykmelding } from '../../types/sykmelding';

const SykmeldingSide = () => {
    const { sykmeldingId } = useParams();

    document.title = 'Sykmelding - www.nav.no';

    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [arbeidsgivere, setArbeidsgivere] = useState<Arbeidsgiver[] | null>(null);

    console.log(sykmelding);
    
    useEffect(() => {
        console.log('Fetching sykmeldingdata for id: ' + sykmeldingId);
        fetch(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/${sykmeldingId}`)
            .then((response) => response.json())
            .then((data: any) => {
                setSykmelding(new Sykmelding(data));
            });
    }, [sykmeldingId]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere`)
            .then((response) => response.json())
            .then((data: any[]) => {
                const mappedArbeidsgivere = data.map((arbeidsgiver) => new Arbeidsgiver(arbeidsgiver));
                setArbeidsgivere(mappedArbeidsgivere);
            });
    }, []);

    // TODO: Reimplement this. Previously it was collected by calling an endpoint after the sykmelding was fetched if the sykmelding had status "NY". Should be fetched together with the sykmelding.
    // Try to get this into the sykmelding as a property
    const sykmeldingUtenforVentetid = false;

    if (!sykmelding || arbeidsgivere === null) {
        // TODO: Error-melding, ingen sykmelding funnet
        return null;
    }

    const SykmeldingComponent = (() => {
        const erAvvist = sykmelding.behandlingsutfall.status === 'INVALID';
        const status = sykmelding.sykmeldingStatus.statusEvent;

        if (erAvvist) {
            return <AvvistSykmelding sykmelding={sykmelding} />;
        }

        if (status === 'APEN') {
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

    const periodString = getSykmeldingPeriod(sykmelding.sykmeldingsperioder);

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
