import { UtdypendeOpplysning } from '../../../../models/Sykmelding/UtdypendeOpplysninger';
import Section from '../Layout/Section/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

interface Props {
    utdypendeOpplysninger: Record<string, Record<string, UtdypendeOpplysning>>;
    arbeidsgiver: boolean;
}

function UtdypendeOpplysningerView({ utdypendeOpplysninger, arbeidsgiver }: Props): JSX.Element | null {
    if (arbeidsgiver) {
        return null;
    }

    if (Object.keys(utdypendeOpplysninger).length === 0) {
        return null;
    }

    return (
        <Section title="Utdypende opplysninger">
            {Array.from(Object.values(utdypendeOpplysninger)).map((innerMap) => {
                return Array.from(
                    Object.values(innerMap).map((utdypendeOpplysning, index) => {
                        if (utdypendeOpplysning.sporsmal) {
                            return (
                                <SykmeldingEntry
                                    key={index}
                                    title={utdypendeOpplysning.sporsmal}
                                    mainText={utdypendeOpplysning.svar}
                                />
                            );
                        }
                        return null;
                    }),
                );
            })}
        </Section>
    );
}

export default UtdypendeOpplysningerView;
