import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleNeurtralSvg from '../Veileder/svg/VeilederMaleNeutralSvg';

const ErrorFallback = (): JSX.Element => {
    return (
        <div style={{ maxWidth: '40rem', margin: 'auto', marginTop: '2rem' }}>
            <Veilederpanel svg={<VeilederMaleNeurtralSvg />}>
                Beklager! En uventet feil har oppstått. Sannsynligvis jobber vi med saken allerede, men ta kontakt med
                oss hvis det ikke har løst seg til i morgen.
            </Veilederpanel>
        </div>
    );
};

export default ErrorFallback;
