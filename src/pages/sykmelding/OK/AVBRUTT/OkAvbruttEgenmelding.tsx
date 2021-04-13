import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import DateFormatter from '../../../../utils/DateFormatter';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';

interface OkAvbruttEgenmeldingProps {
    sykmelding: Sykmelding;
}

const OkAvbruttEgenmelding: React.FC<OkAvbruttEgenmeldingProps> = ({ sykmelding }) => {
    return (
        <div className="sykmelding-container">
            <div style={{ marginBottom: '4rem' }}>
                <AlertStripe type="feil">
                    <Undertittel tag="h2">Egenmeldingen ble avbrutt av deg</Undertittel>
                    <Normaltekst>
                        Dato avbrutt:{' '}
                        {DateFormatter.toReadableDate(sykmelding.sykmeldingStatus.timestamp, { withYear: true })}
                    </Normaltekst>
                </AlertStripe>
            </div>
            <Sykmeldingsopplysninger
                id="sykmeldingsopplysnigner"
                title="Opplysninger fra egenmeldingen"
                sykmelding={sykmelding}
            />
        </div>
    );
};

export default OkAvbruttEgenmelding;
