import React from 'react';
import { Alert, Detail, Heading } from '@navikt/ds-react';

import { Sykmelding } from '../../../../fetching/graphql.generated';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import { toReadableDate } from '../../../../utils/dateUtils';
import Spacing from '../../../Spacing/Spacing';
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer';

interface OkUtgattSykmeldingProps {
    sykmelding: Sykmelding;
}

function OkUtgattSykmelding({ sykmelding }: OkUtgattSykmeldingProps): JSX.Element {
    useHotjarTrigger('SYKMELDING_OK_UTGATT');

    return (
        <div className="sykmelding-container">
            <Spacing>
                <Alert variant="info">
                    <Heading size="small" level="2">
                        Sykmeldingen er utgått
                    </Heading>
                    <Detail>{toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Detail>
                </Alert>
            </Spacing>
            <SykmeldingSykmeldtContainer sykmelding={sykmelding} />
        </div>
    );
}

export default OkUtgattSykmelding;
