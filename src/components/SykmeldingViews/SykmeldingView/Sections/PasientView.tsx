import { Element, Undertekst } from 'nav-frontend-typografi';

import { getPasientName, Pasient } from '../../../../models/Sykmelding/Pasient';
import Section from '../Layout/Section/Section';

interface PasientViewProps {
    pasient?: Pasient | null;
    arbeidsgiver: boolean;
}

function PasientView({ pasient, arbeidsgiver }: PasientViewProps): JSX.Element | null {
    if (!arbeidsgiver || !pasient) {
        return null;
    }

    const name = getPasientName(pasient);

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
}

export default PasientView;
