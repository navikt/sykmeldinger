import React from 'react';
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
            <div className="margin-bottom--4">
                <Veilederpanel type="plakat" kompakt fargetema="normal" svg={<VeilederMaleNeurtralSvg />}>
                    <VeilederContent sykmelding={sykmelding} />
                </Veilederpanel>
            </div>

            <Sykmeldingsopplysninger
                id="sykmeldingsopplysninger"
                title="Opplysninger fra sykmeldingen"
                sykmelding={sykmelding}
            />

            {errorBekreft && (
                <AlertStripeAdvarsel className="margin-bottom--1">
                    Kunne ikke bekrefte at sykmeldingen er avvist på grunn av en feil med baksystemene våre. Vennligst
                    prøv igjen senere.
                </AlertStripeAdvarsel>
            )}

            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                    bekreft(data);
                })}
            >
                <div style={{ textAlign: 'center' }}>
                    <Controller
                        control={control}
                        name="bekreftetLest"
                        defaultValue={false}
                        rules={{
                            validate: (value) =>
                                value === true || 'Du må bekrefte at du har lest at sykmeldingen er avvist',
                        }}
                        render={({ onChange, value }) => (
                            <div style={{ width: 'fit-content', margin: 'auto', padding: '2rem' }}>
                                <BekreftCheckboksPanel
                                    label="Jeg bekrefter at jeg har lest at sykmeldingen er avvist"
                                    checked={value}
                                    feil={errors.bekreftetLest?.message}
                                    onChange={() => {
                                        onChange(!value);
                                    }}
                                />
                            </div>
                        )}
                    />
                    <Hovedknapp htmlType="submit" disabled={isLoadingBekreft} spinner={isLoadingBekreft}>
                        Bekreft
                    </Hovedknapp>
                </div>
            </form>
        </div>
    );
};

export default InvalidApenSykmelding;
