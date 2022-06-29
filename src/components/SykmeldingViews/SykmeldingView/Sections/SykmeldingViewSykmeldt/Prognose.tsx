import { Historic } from '@navikt/ds-icons';

import { Prognose } from '../../../../../models/Sykmelding/Prognose';
import { toReadableDate } from '../../../../../utils/dateUtils';
import JaEntry from '../../Layout/JaEntry/JaEntry';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading';

import styles from './Prognose.module.css';

interface Props {
    prognose?: Prognose | null;
}

function Prognose({ prognose }: Props): JSX.Element | null {
    if (!prognose) return null;

    if (
        !prognose.arbeidsforEtterPeriode &&
        !prognose.erIArbeid &&
        !prognose.erIkkeIArbeid &&
        !prognose.hensynArbeidsplassen
    ) {
        return null;
    }

    return (
        <div>
            <SykmeldtHeading title="Prognose" Icon={Historic} />
            <div className={styles.info}>
                {prognose.arbeidsforEtterPeriode && (
                    <div className={styles.arbeidsforEtterPeriode}>
                        <JaEntry title="Er pasienten 100% arbeidsfør etter denne perioden?" headingLevel="4" />
                    </div>
                )}
                {!!prognose.hensynArbeidsplassen && (
                    <div className={styles.hensynArbeidsplassen}>
                        <SykmeldingEntry
                            title="Hensyn som må tas på arbeidsplassen"
                            mainText={prognose.hensynArbeidsplassen}
                            small
                            headingLevel="4"
                        />
                    </div>
                )}
            </div>
            {!!prognose.erIArbeid && (
                <div className={styles.erIArbeid}>
                    {prognose.erIArbeid.egetArbeidPaSikt && (
                        <JaEntry
                            title="Antas pasienten å kunne komme tilbake til samme arbeidsgiver på sikt?"
                            headingLevel="4"
                        />
                    )}
                    {prognose.erIArbeid.annetArbeidPaSikt && (
                        <JaEntry
                            title="Antas pasienten å kunne komme tilbake til annen arbeidsgiver på sikt?"
                            headingLevel="4"
                        />
                    )}
                    {!!prognose.erIArbeid.arbeidFOM && (
                        <SykmeldingEntry
                            title="Pasienten anslås å være tilbake"
                            mainText={toReadableDate(prognose.erIArbeid.arbeidFOM)}
                            small
                            headingLevel="4"
                        />
                    )}
                    {!!prognose.erIArbeid.vurderingsdato && (
                        <SykmeldingEntry
                            title="Behandler kan gi tilbakemelding på dette"
                            mainText={toReadableDate(prognose.erIArbeid.vurderingsdato)}
                            small
                            headingLevel="4"
                        />
                    )}
                </div>
            )}
            {!!prognose.erIkkeIArbeid && (
                <div className={styles.erIkkeIArbeid}>
                    {prognose.erIkkeIArbeid.arbeidsforPaSikt && (
                        <JaEntry title="Antas pasienten å kunne komme i arbeid på sikt?" headingLevel="4" />
                    )}
                    {!!prognose.erIkkeIArbeid.arbeidsforFOM && (
                        <SykmeldingEntry
                            title="Pasienten anslås å vær være arbeidsfør"
                            mainText={toReadableDate(prognose.erIkkeIArbeid.arbeidsforFOM)}
                            small
                            headingLevel="4"
                        />
                    )}
                    {!!prognose.erIkkeIArbeid.vurderingsdato && (
                        <SykmeldingEntry
                            title="Behandler kan gi tilbakemelding på dette"
                            mainText={toReadableDate(prognose.erIkkeIArbeid.vurderingsdato)}
                            small
                            headingLevel="4"
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Prognose;
