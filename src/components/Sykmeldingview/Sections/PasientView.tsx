import { Element, Undertekst } from 'nav-frontend-typografi';
import Pasient from '../../../models/Sykmelding/Pasient';
import Section from '../Layout/Section/Section';

interface PasientViewProps {
    pasient?: Pasient;
    arbeidsgiver: boolean;
}

const PasientView: React.FC<PasientViewProps> = ({ pasient, arbeidsgiver }) => {
    if (!arbeidsgiver || !pasient) {
        return null;
    }

    const name = pasient.getName();

    if (!name) {
        return null;
    }

    return (
        <Section>
            <Element>Sykmeldingen gjelder</Element>
            <Undertekst>{name}</Undertekst>
            {pasient.fnr && <Undertekst>{pasient.fnr}</Undertekst>}
        </Section>
    );
};

export default PasientView;
