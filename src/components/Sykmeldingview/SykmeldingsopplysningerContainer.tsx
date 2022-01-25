import styles from './SykmeldingsopplysningerContainer.module.css';

import React, { useRef, useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Sykmelding } from '../../models/Sykmelding/Sykmelding';
import Sykmeldingview from './Sykmeldingview';
import ArbeidsgiverSvg from './Svg/ArbeidsgiverSvg';
import LegeSvg from './Svg/LegeSvg';
import Lukknapp from '../Lukknapp/Lukknap';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Spacing from '../Spacing/Spacing';
import { Normaltekst } from 'nav-frontend-typografi';
import cn from 'classnames';

interface SykmeldingsopplysningerProps {
    sykmelding: Sykmelding;
    expandable?: boolean;
    expandedDefault?: boolean;
    arbeidsgiver?: boolean;
    sendeSykmelding?: boolean;
}

const Sykmeldingsopplysninger: React.FC<SykmeldingsopplysningerProps> = ({
    sykmelding,
    expandable = false,
    expandedDefault = true,
    arbeidsgiver = false,
    sendeSykmelding = false,
}: SykmeldingsopplysningerProps) => {
    const [expanded, setExpanded] = useState(expandedDefault);
    const elementRef = useRef<HTMLElement>(null);

    const title = arbeidsgiver ? 'Dette vises til arbeidsgiveren din' : 'Opplysninger fra behandleren din';
    const contentId = `sykmelding-${sykmelding.id}-content${arbeidsgiver ? '-arbeidsgiver' : ''}`;
    const headerId = `sykmelding-${sykmelding.id}-header${arbeidsgiver ? '-arbeidsgiver' : ''}`;

    return (
        <article
            aria-labelledby={headerId}
            ref={elementRef}
            className={cn(styles.sykmeldingsopplysninger, { [styles.opplysningerTilArbeidsgiver]: arbeidsgiver })}
        >
            {expandable ? (
                <>
                    <button
                        id={headerId}
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={contentId}
                        onClick={() => {
                            if (!expanded) {
                                setTimeout(() => {
                                    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
                                }, 200);
                            }
                            setExpanded(!expanded);
                        }}
                        className={cn(
                            styles.sykmeldingsopplysningerHeader,
                            styles.sykmeldingsopplysningerHeaderExpandable,
                        )}
                    >
                        <div className={styles.sykmeldingsopplysningerIcon}>
                            <ArbeidsgiverSvg />
                        </div>
                        <Undertittel className={styles.sykmeldingsopplysningerText} tag="h2">
                            {title}
                        </Undertittel>
                        <NavFrontendChevron type={expanded ? 'opp' : 'ned'} />
                    </button>
                    <div
                        id={contentId}
                        aria-labelledby={headerId}
                        className={cn(styles.sykmeldingsopplysningerContent, {
                            [styles.sykmeldingsopplysningerContentHidden]: !expanded,
                        })}
                    >
                        <Sykmeldingview sykmelding={sykmelding} arbeidsgiver={arbeidsgiver} />
                        {sendeSykmelding && (
                            <Ekspanderbartpanel
                                className={styles.ikkeSendeTilArbeidsgiverPanel}
                                tittel="Hvis du ikke ønsker å sende sykmeldingen til arbeidsgiver"
                            >
                                <Spacing amount="small">
                                    <Normaltekst>
                                        Arbeidsgiveren din trenger sykmeldingen som dokumentasjon på at du er syk, enten
                                        den digitale sykmeldingen du finner her, eller papirsykmeldingen som du kan få
                                        hos legen.
                                    </Normaltekst>
                                </Spacing>
                                <Normaltekst>
                                    Ønsker du ikke å sende den slik du ser den her, kan du snakke med legen om å få en
                                    ny sykmelding. Da kan du ta stilling til om du vil gi den nye sykmeldingen til
                                    arbeidsgiveren din i stedet.
                                </Normaltekst>
                            </Ekspanderbartpanel>
                        )}
                        <Lukknapp onClick={() => setExpanded(false)} />
                    </div>
                </>
            ) : (
                <>
                    <header className={styles.sykmeldingsopplysningerHeader}>
                        <div className={styles.sykmeldingsopplysningerIcon}>
                            {arbeidsgiver ? <ArbeidsgiverSvg /> : <LegeSvg />}
                        </div>
                        <Undertittel className={styles.sykmeldingsopplysningerText} tag="h2">
                            {title}
                        </Undertittel>
                    </header>
                    <div id={contentId} aria-labelledby={headerId} className={styles.sykmeldingsopplysningerContent}>
                        <Sykmeldingview sykmelding={sykmelding} arbeidsgiver={arbeidsgiver} />
                    </div>
                </>
            )}
        </article>
    );
};

export default Sykmeldingsopplysninger;
