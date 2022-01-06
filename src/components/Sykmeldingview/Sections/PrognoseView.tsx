import Prognose from '../../../models/Sykmelding/Prognose';
import DateFormatter from '../../../utils/DateFormatter';
import JaEntry from '../Layout/JaEntry/JaEntry';
import Section from '../Layout/Section/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry/SykmeldingEntry';

const PrognoseView: React.FC<{ prognose?: Prognose; arbeidsgiver: boolean }> = ({ prognose, arbeidsgiver }) => {
    if (!prognose) {
        return null;
    }

    if (
        !prognose.arbeidsforEtterPeriode &&
        !prognose.erIArbeid &&
        !prognose.erIkkeIArbeid &&
        !prognose.hensynArbeidsplassen
    ) {
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
            {!arbeidsgiver && !!prognose.erIArbeid && (
                <>
                    {prognose.erIArbeid.egetArbeidPaSikt && <JaEntry title="Antas pasienten å kunne komme tilbake til samme arbeidsgiver på sikt?" />}
                    {prognose.erIArbeid.annetArbeidPaSikt && <JaEntry title="Antas pasienten å kunne komme tilbake til annen arbeidsgiver på sikt?" />}
                    {!!prognose.erIArbeid.arbeidFOM && (
                        <SykmeldingEntry
                            title="Pasienten anslås å være tilbake"
                            mainText={DateFormatter.toReadableDate(prognose.erIArbeid.arbeidFOM)}
                            small
                        />
                    )}
                    {!!prognose.erIArbeid.vurderingsdato && (
                        <SykmeldingEntry
                            title="Behandler kan gi tilbakemelding på dette"
                            mainText={DateFormatter.toReadableDate(prognose.erIArbeid.vurderingsdato)}
                            small
                        />
                    )}
                </>
            )}
            {!arbeidsgiver && !!prognose.erIkkeIArbeid && (
                <>
                    {prognose.erIkkeIArbeid.arbeidsforPaSikt && <JaEntry title="Antas pasienten å kunne komme i arbeid på sikt?" />}
                    {!!prognose.erIkkeIArbeid.arbeidsforFOM && (
                        <SykmeldingEntry
                            title="Pasienten anslås å vær være arbeidsfør"
                            mainText={DateFormatter.toReadableDate(prognose.erIkkeIArbeid.arbeidsforFOM)}
                            small
                        />
                    )}
                    {!!prognose.erIkkeIArbeid.vurderingsdato && (
                        <SykmeldingEntry
                            title="Behandler kan gi tilbakemelding på dette"
                            mainText={DateFormatter.toReadableDate(prognose.erIkkeIArbeid.vurderingsdato)}
                            small
                        />
                    )}
                </>
            )}
        </Section>
    );
};

export default PrognoseView;
