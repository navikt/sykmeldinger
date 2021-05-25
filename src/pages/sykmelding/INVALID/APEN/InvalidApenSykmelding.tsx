import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import AvvistVeileder from '../../../../components/AvvistVeileder/AvvistVeileder';
import { useParams } from 'react-router-dom';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import useBekreftAvvist from '../../../../hooks/useBekreftAvvist';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import { Controller, useForm } from 'react-hook-form';
import Sykmeldingsopplysninger from '../../../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import Spacing from '../../../../components/Spacing/Spacing';
import CenterItems from '../../../../components/CenterItems/CenterItems';

interface InvalidApenSykmeldingProps {
    sykmelding: Sykmelding;
}

interface FormData {
    bekreftetLest: boolean;
}

const InvalidApenSykmelding: React.FC<InvalidApenSykmeldingProps> = ({ sykmelding }) => {
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    useHotjarTrigger('INVALID_APEN');

    const { handleSubmit, control, errors } = useForm<FormData>();

    const { mutate: bekreft, isLoading: isLoadingBekreft, error: errorBekreft } = useBekreftAvvist(sykmeldingId);

    return (
        <div className="sykmelding-container">
            <Spacing>
                <AvvistVeileder sykmelding={sykmelding} />
            </Spacing>

            <Spacing>
                <Sykmeldingsopplysninger sykmelding={sykmelding} />
            </Spacing>

            <form
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
                            <AlertStripeAdvarsel>{errorBekreft.message}</AlertStripeAdvarsel>
                        </Spacing>
                    )}

                    <Hovedknapp htmlType="submit" disabled={isLoadingBekreft} spinner={isLoadingBekreft}>
                        Bekreft
                    </Hovedknapp>
                </CenterItems>
            </form>
        </div>
    );
};

export default InvalidApenSykmelding;
