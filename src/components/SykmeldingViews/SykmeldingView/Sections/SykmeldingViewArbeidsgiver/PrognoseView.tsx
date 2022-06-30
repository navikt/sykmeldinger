import { Prognose } from '../../../../../fetching/graphql.generated';
import JaEntry from '../../Layout/JaEntry/JaEntry';
import Section from '../../Layout/Section/Section';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';

interface Props {
    prognose?: Prognose | null;
}

function PrognoseView({ prognose }: Props): JSX.Element | null {
    if (!prognose) {
        return null;
    }

    if (!prognose.arbeidsforEtterPeriode && !prognose.hensynArbeidsplassen) {
        return null;
    }

    return (
        <Section title="Friskmelding/Prognose">
            {prognose.arbeidsforEtterPeriode && <JaEntry title="Er pasienten 100% arbeidsfør etter denne perioden?" />}
            {!!prognose.hensynArbeidsplassen && (
                <SykmeldingEntry
                    title="Hensyn som må tas på arbeidsplassen"
                    mainText={prognose.hensynArbeidsplassen}
                    small
                />
            )}
        </Section>
    );
}

export default PrognoseView;
