import UtdypendeOpplysning from '../../../models/Sykmelding/UtdypendeOpplysninger';
import Section from '../Layout/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry';

const UtdypendeOpplysningerView: React.FC<{
    utdypendeOpplysninger: Map<string, Map<string, UtdypendeOpplysning>>;
    arbeidsgiver?: boolean;
}> = ({ utdypendeOpplysninger, arbeidsgiver }) => {
    if (arbeidsgiver) {
        return null;
    }

    if (utdypendeOpplysninger.size === 0) {
        return null;
    }

    return (
        <Section title="Utdypende opplysninger">
            {Array.from(utdypendeOpplysninger.values()).map((innerMap) => {
                return Array.from(innerMap.values()).map((utdypendeOpplysning, index) => {
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
                });
            })}
        </Section>
    );
};

export default UtdypendeOpplysningerView;
