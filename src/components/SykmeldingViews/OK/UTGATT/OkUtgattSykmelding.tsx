import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Undertittel } from 'nav-frontend-typografi';

import { Sykmelding } from '../../../../fetching/graphql.generated';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../SykmeldingView/SykmeldingsopplysningerContainer';
import { toReadableDate } from '../../../../utils/dateUtils';
import Spacing from '../../../Spacing/Spacing';

interface OkUtgattSykmeldingProps {
    sykmelding: Sykmelding;
}

function OkUtgattSykmelding({ sykmelding }: OkUtgattSykmeldingProps): JSX.Element {
    useHotjarTrigger('SYKMELDING_OK_UTGATT');

    return (
        <div className="sykmelding-container">
            <Spacing>
                <AlertStripeInfo>
                    <Undertittel>Sykmeldingen er utgått</Undertittel>
                    <Element>{toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Element>
                </AlertStripeInfo>
            </Spacing>

            <Sykmeldingsopplysninger sykmelding={sykmelding} />
        </div>
    );
}

export default OkUtgattSykmelding;
