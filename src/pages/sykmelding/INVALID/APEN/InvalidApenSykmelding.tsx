import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import VeilederContent from '../VeilederContent';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleNeurtralSvg from '../../../commonComponents/Veileder/svg/VeilederMaleNeutralSvg';
import { useParams } from 'react-router-dom';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import useBekreft from '../../../../hooks/useBekreft';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import { Controller, useForm } from 'react-hook-form';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import Spacing from '../../../commonComponents/Spacing/Spacing';
import CenterItems from '../../../commonComponents/CenterItems/CenterItems';

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

    const { mutate: bekreft, isLoading: isLoadingBekreft, error: errorBekreft } = useBekreft(sykmeldingId);

    return (
        <div className="sykmelding-container">
            <Spacing>
                <Veilederpanel type="plakat" kompakt fargetema="normal" svg={<VeilederMaleNeurtralSvg />}>
                    <VeilederContent sykmelding={sykmelding} />
                </Veilederpanel>
            </Spacing>

            <Spacing>
                <Sykmeldingsopplysninger
                    id="sykmeldingsopplysninger"
                    title="Se hele sykmeldingen din"
                    sykmelding={sykmelding}
                />
            </Spacing>

            <form
                onSubmit={handleSubmit((data) => {
                    bekreft(data);
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
                            <AlertStripeAdvarsel>
                                Kunne ikke bekrefte at sykmeldingen er avvist på grunn av en feil med baksystemene våre.
                                Vennligst prøv igjen senere.
                            </AlertStripeAdvarsel>
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
