import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Controller, useForm } from 'react-hook-form';

import { Sykmelding, SykmeldingChangeStatus } from '../../../../fetching/graphql.generated';
import AvvistVeileder from '../../../AvvistVeileder/AvvistVeileder';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../SykmeldingView/SykmeldingsopplysningerContainer';
import Spacing from '../../../Spacing/Spacing';
import CenterItems from '../../../CenterItems/CenterItems';
import useGetSykmeldingIdParam from '../../../../hooks/useGetSykmeldingIdParam';
import { getBehandlerName } from '../../../../utils/behandlerUtils';
import { useChangeSykmeldingStatus } from '../../../../hooks/useMutations';

interface InvalidApenSykmeldingProps {
    sykmelding: Sykmelding;
}

interface FormData {
    bekreftetLest: boolean;
}

function InvalidApenSykmelding({ sykmelding }: InvalidApenSykmeldingProps): JSX.Element {
    const sykmeldingId = useGetSykmeldingIdParam();
    useHotjarTrigger('SYKMELDING_INVALID_APEN');

    const { handleSubmit, control, errors } = useForm<FormData>();
    const [{ loading: fetchingBekreft, error: errorBekreft }, bekreft] = useChangeSykmeldingStatus(
        sykmeldingId,
        SykmeldingChangeStatus.BekreftAvvist,
    );

    return (
        <div className="sykmelding-container">
            <Spacing>
                <AvvistVeileder
                    behandlerNavn={getBehandlerName(sykmelding.behandler)}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </Spacing>

            <Spacing>
                <Sykmeldingsopplysninger sykmelding={sykmelding} />
            </Spacing>

            <form
                className="hide-on-print"
                onSubmit={handleSubmit(() => {
                    bekreft();
                })}
            >
                <CenterItems horizontal>
                    <Controller
                        control={control}
                        name="bekreftetLest"
                        defaultValue={false}
                        rules={{
                            validate: (value) =>
                                value === true || 'Du må bekrefte at du har lest at sykmeldingen er avvist',
                        }}
                        render={({ onChange, value }) => (
                            <Spacing>
                                <BekreftCheckboksPanel
                                    label="Jeg bekrefter at jeg har lest at sykmeldingen er avvist"
                                    checked={value}
                                    feil={errors.bekreftetLest?.message}
                                    onChange={() => {
                                        onChange(!value);
                                    }}
                                />
                            </Spacing>
                        )}
                    />

                    {errorBekreft && (
                        <Spacing amount="small">
                            <AlertStripeAdvarsel role="alert" aria-live="polite">
                                {errorBekreft.message}
                            </AlertStripeAdvarsel>
                        </Spacing>
                    )}

                    <Hovedknapp htmlType="submit" disabled={fetchingBekreft} spinner={fetchingBekreft}>
                        Bekreft
                    </Hovedknapp>
                </CenterItems>
            </form>
        </div>
    );
}

export default InvalidApenSykmelding;
