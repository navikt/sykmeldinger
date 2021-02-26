import React, { useState } from 'react';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

import ArbeidsgiverSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/ArbeidsgiverSeksjon';
import DiagnoseSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/diagnose/DiagnoseSeksjon';
import Sykmeldingsopplysninger from '../../components/Sykmeldingsopplysninger/Sykmeldingsopplysninger';
import LegeSeksjon from '../../components/Sykmeldingsopplysninger/panelelementer/LegeSeksjon';
import { Sykmelding } from '../../../../types/sykmelding';
import SykmeldingPerioder from '../../components/Sykmeldingsopplysninger/panelelementer/periode/SykmeldingPerioder';
import VeilederContent from '../VeilederContent';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleNeurtralSvg from '../../../commonComponents/Veileder/svg/VeilederMaleNeutralSvg';
import { useParams } from 'react-router-dom';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import useBekreft from '../../../commonComponents/hooks/useBekreft';

interface InvalidApenSykmeldingProps {
    sykmelding: Sykmelding;
}

const InvalidApenSykmelding: React.FC<InvalidApenSykmeldingProps> = ({ sykmelding }) => {
    const [bekreftet, setBekreftet] = useState(false);

    const { sykmeldingId } = useParams();
    const { mutate: bekreft, isLoading: isLoadingBekreft, error: errorBekreft } = useBekreft(sykmeldingId);

    return (
        <div className="sykmelding-container">
            <div className="margin-bottom--4">
                <Veilederpanel type="plakat" kompakt fargetema="normal" svg={<VeilederMaleNeurtralSvg />}>
                    <VeilederContent sykmelding={sykmelding} />
                </Veilederpanel>
            </div>

            <Sykmeldingsopplysninger id="sykmeldingsopplysninger" title="Opplysninger fra sykmeldingen">
                <SykmeldingPerioder perioder={sykmelding.sykmeldingsperioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering?.hovedDiagnose} />
                {sykmelding.medisinskVurdering?.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} isBidiagnose />
                ))}
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />
            </Sykmeldingsopplysninger>

            {errorBekreft && (
                <AlertStripeAdvarsel className="margin-bottom--1">
                    Kunne ikke bekrefte at sykmeldingen er avvist på grunn av en feil med baksystemene våre. Vennligst
                    prøv igjen senere.
                </AlertStripeAdvarsel>
            )}

            <div className="text--center">
                <div style={{ width: 'fit-content', margin: 'auto', padding: '2rem' }}>
                    <BekreftCheckboksPanel
                        label="Jeg bekrefter at jeg har lest at sykmeldingen er avvist"
                        checked={bekreftet}
                        onChange={() => setBekreftet(!bekreftet)}
                    />
                </div>
                <Hovedknapp disabled={isLoadingBekreft} spinner={isLoadingBekreft} onClick={() => bekreft({})}>
                    Bekreft
                </Hovedknapp>
            </div>
        </div>
    );
};

export default InvalidApenSykmelding;
