import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { UriktigeOpplysningerType } from './Form';

const uriktigOpplysningTekst: Record<keyof typeof UriktigeOpplysningerType, string> = {
    PERIODE: '',
    SYKMELDINGSGRAD_FOR_HOY: '',
    SYKMELDINGSGRAD_FOR_LAV:
        'Senere, når du skal fylle ut søknaden om sykepenger, skriver du bare inn hvor mye du faktisk jobbet.',
    ARBEIDSGIVER:
        'I neste trinn velger du riktig arbeidsgiver. Obs: Feilen vil være synlig for arbeidsgiveren du sender sykmeldingen til.',
    DIAGNOSE:
        'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen er feil.',
    ANDRE_OPPLYSNINGER:
        'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.',
};

interface UriktigeOpplysningerInfoProps {
    uriktigeOpplysninger?: (keyof typeof UriktigeOpplysningerType)[];
}

const UriktigeOpplysningerInfo: React.FC<UriktigeOpplysningerInfoProps> = ({ uriktigeOpplysninger }) => {
    if (!uriktigeOpplysninger || uriktigeOpplysninger.length === 0) return null;

    if (uriktigeOpplysninger.includes('PERIODE') || uriktigeOpplysninger.includes('SYKMELDINGSGRAD_FOR_HOY'))
        return null;

    return (
        <AlertStripeInfo>
            Du kan fortsatt bruke sykmeldingen
            <ul>
                {uriktigeOpplysninger.map((opplysning) => (
                    <li>{uriktigOpplysningTekst[opplysning]}</li>
                ))}
            </ul>
        </AlertStripeInfo>
    );
};

export default UriktigeOpplysningerInfo;
