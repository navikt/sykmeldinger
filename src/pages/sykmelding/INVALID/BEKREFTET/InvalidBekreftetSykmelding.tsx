import React from 'react';
import Sykmeldingsopplysninger from '../../components/Sykmeldingsopplysninger/SykmeldingsopplysningerContainer';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import VeilederContent from '../VeilederContent';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleNeurtralSvg from '../../../commonComponents/Veileder/svg/VeilederMaleNeutralSvg';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import dayjs from 'dayjs';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';

interface InvalidBekreftetSykmeldingProps {
    sykmelding: Sykmelding;
}

const InvalidBekreftetSykmelding: React.FC<InvalidBekreftetSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('INVALID_BEKREFTET');

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

            <Sykmeldingsopplysninger
                id="sykmeldingsopplysninger"
                title="Opplysninger fra sykmeldingen"
                sykmelding={sykmelding}
                type="AVVIST"
            />
        </div>
    );
};

export default InvalidBekreftetSykmelding;
