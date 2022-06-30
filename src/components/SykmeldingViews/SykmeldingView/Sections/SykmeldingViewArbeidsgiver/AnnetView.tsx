import { Behandler } from '../../../../../fetching/graphql.generated';
import Section from '../../Layout/Section/Section';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';

function AnnetView({ behandler }: { behandler: Behandler }): JSX.Element {
    return (
        <Section title="Annet">
            <SykmeldingEntry
                title="Telefon til behandler"
                mainText={behandler.tlf ? behandler.tlf : '—'}
                headingLevel="4"
            />
        </Section>
    );
}

export default AnnetView;
