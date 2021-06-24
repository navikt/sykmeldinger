import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Pasient from '../../../models/Sykmelding/Pasient';
import Section from '../Layout/Section/Section';

const PasientView: React.FC<{ pasient?: Pasient; arbeidsgiver?: boolean }> = ({ pasient, arbeidsgiver = false }) => {
    if (!arbeidsgiver || !pasient) {
        return null;
    }

    const name = pasient.getName();

    if (!name) {
        return null;
    }

    return (
        <Section>
            <Systemtittel>{name}</Systemtittel>
            {pasient.fnr && <Normaltekst>{pasient.fnr}</Normaltekst>}
        </Section>
    );
};

export default PasientView;
