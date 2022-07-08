import React from 'react';
import { Alert, Button, Detail, Heading, Loader } from '@navikt/ds-react';
import { FillForms, WarningFilled } from '@navikt/ds-icons';

import { Sykmelding, SykmeldingChangeStatus } from '../../../../fetching/graphql.generated';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import { toReadableDate } from '../../../../utils/dateUtils';
import Spacing from '../../../Spacing/Spacing';
import useGetSykmeldingIdParam from '../../../../hooks/useGetSykmeldingIdParam';
import { useChangeSykmeldingStatus } from '../../../../hooks/useMutations';
import { useAmplitude, useLogAmplitudeEvent } from '../../../../amplitude/amplitude';
import HintToNextOlderSykmelding from '../../../ForceOrder/HintToNextOlderSykmelding';
import SykmeldingStatusPrint from '../../SykmeldingView/Layout/SykmeldingStatusPrint/SykmeldingStatusPrint';
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer';

interface OkAvbruttSykmeldingProps {
    sykmelding: Sykmelding;
}

const skjemanavn = 'gjenåpne avbrutt sykmelding';

function OkAvbruttSykmelding({ sykmelding }: OkAvbruttSykmeldingProps): JSX.Element {
    const logEvent = useAmplitude();
    useHotjarTrigger('SYKMELDING_OK_AVBRUTT');
    useLogAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } });
    const sykmeldingId = useGetSykmeldingIdParam();
    const [{ loading, error }, gjenapne] = useChangeSykmeldingStatus(
        sykmeldingId,
        SykmeldingChangeStatus.Gjenapne,
        () => logEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    );

    return (
        <div className="sykmelding-container">
            <Spacing amount="small">
                <Alert variant="info">
                    <Heading size="medium" level="2">
                        {sykmelding.egenmeldt ? 'Egenmelding' : 'Sykmelding'}en ble avbrutt av deg
                    </Heading>
                    <Detail>{toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Detail>
                </Alert>
            </Spacing>
            <SykmeldingStatusPrint
                title={`Sykmeldingen ble avbrutt av deg ${toReadableDate(sykmelding.sykmeldingStatus.timestamp)}`}
                Icon={WarningFilled}
            />

            {!Boolean(sykmelding.egenmeldt) && (
                <div className="hide-on-print">
                    <Spacing>
                        <Spacing amount="small">
                            <Button size="small" variant="secondary" disabled={loading} onClick={() => gjenapne()}>
                                <FillForms />
                                <span>GJØR UTFYLLINGEN PÅ NYTT</span>
                                {loading && <Loader size="xsmall" />}
                            </Button>
                        </Spacing>
                        {error && (
                            <Alert variant="error" role="alert" aria-live="polite">
                                En feil oppsto som gjorde at vi ikke kunne gjenåpne sykmeldingen. Prøv igjen senere.
                            </Alert>
                        )}
                    </Spacing>
                </div>
            )}
            <SykmeldingSykmeldtContainer sykmelding={sykmelding} />

            <HintToNextOlderSykmelding />
        </div>
    );
}

export default OkAvbruttSykmelding;
