import React from 'react';
import ArbeidsgiverSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/ArbeidsgiverSeksjon';
import DiagnoseSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/diagnose/DiagnoseSeksjon';
import Sykmeldingsopplysninger from '../components/Sykmeldingsopplysninger/Sykmeldingsopplysninger';
import LegeSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/LegeSeksjon';
import { Sykmelding } from '../../../types/sykmelding';
import SykmeldingPerioder from '../components/Sykmeldingsopplysninger/panelelementer/periode/SykmeldingPerioder';
import VeilederContent from './VeilederContent';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleNeurtralSvg from '../../commonComponents/Veileder/svg/VeilederMaleNeutralSvg';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import dayjs from 'dayjs';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const AvvistBekreftetSykmelding = ({ sykmelding }: SykmeldingProps) => {
    return (
        <div className="sykmelding-container">
            <div className="margin-bottom--4">
                <AlertStripeInfo>
                    Du bekreftet at du har lest at sykmeldingen er avvist den{' '}
                    {dayjs(sykmelding.sykmeldingStatus.timestamp).format('D. MMM YYYY, kl. hh:mm')}
                </AlertStripeInfo>
            </div>

            <div className="margin-bottom--2">
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
        </div>
    );
};

export default AvvistBekreftetSykmelding;
