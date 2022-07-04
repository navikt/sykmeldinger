import React from 'react';
import { Alert } from '@navikt/ds-react';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { InformationFilled } from '@navikt/ds-icons';

import { Sykmelding } from '../../../../fetching/graphql.generated';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../SykmeldingView/SykmeldingsopplysningerContainer';
import { toReadableDate } from '../../../../utils/dateUtils';
import Spacing from '../../../Spacing/Spacing';
import SykmeldingStatusPrint from '../../SykmeldingView/Layout/SykmeldingStatusPrint/SykmeldingStatusPrint';

interface OkUtgattSykmeldingProps {
    sykmelding: Sykmelding;
}

function OkUtgattSykmelding({ sykmelding }: OkUtgattSykmeldingProps): JSX.Element {
    useHotjarTrigger('SYKMELDING_OK_UTGATT');

    return (
        <div className="sykmelding-container">
            <Spacing>
                <Alert variant="info">
                    <Undertittel>Sykmeldingen er utgått</Undertittel>
                    <Element>{toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Element>
                </Alert>
            </Spacing>
            <SykmeldingStatusPrint
                title={`Utgått sykmelding: ${toReadableDate(sykmelding.sykmeldingStatus.timestamp)}`}
                Icon={InformationFilled}
            />
            <Sykmeldingsopplysninger sykmelding={sykmelding} />
        </div>
    );
}

export default OkUtgattSykmelding;
