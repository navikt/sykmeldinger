import Prognose from '../../../../../models/Sykmelding/Prognose';
import DateFormatter from '../../../../../utils/DateFormatter';
import CheckboxEntry from '../Layout/CheckboxEntry';
import Section from '../Layout/Section';
import SykmeldingEntry from '../Layout/SykmeldingEntry';

const PrognoseView: React.FC<{ prognose?: Prognose }> = ({ prognose }) => {
    if (!prognose) {
        return null;
    }

    return (
        <Section title="Friskmelding/Prognose">
            <CheckboxEntry
                show={prognose.arbeidsforEtterPeriode}
                checkboxText="Pasienten er 100% arbeidsfør etter denne perioden"
            />
            {!!prognose.hensynArbeidsplassen && (
                <SykmeldingEntry
                    title="Hensyn som må tas på arbeidsplassen"
                    mainText={prognose.hensynArbeidsplassen}
                    small
                />
            )}
            {!!prognose.erIArbeid && (
                <>
                    <CheckboxEntry
                        show={prognose.erIArbeid.egetArbeidPaSikt}
                        checkboxText="Pasienten antas å kunne komme tilbake til samme arbeidsgiver på sikt"
                    />
                    <CheckboxEntry
                        show={prognose.erIArbeid.annetArbeidPaSikt}
                        checkboxText="Pasienten antas å kunne komme tilbake til annen arbeidsgiver på sikt"
                    />
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
            {!!prognose.erIkkeIArbeid && (
                <>
                    <CheckboxEntry
                        show={prognose.erIkkeIArbeid.arbeidsforPaSikt}
                        checkboxText="Pasienten antas å kunne komme i arbeid på sikt"
                    />
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
