import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './Statuspanel.less';
import { Soknadstype } from './Statuspanel';
import { Knapp } from 'nav-frontend-knapper';
import dayjs from 'dayjs';
import ExpandableChevron from './ExpandableChevron';

interface SoknadSectionProps {
    soknadstype: Soknadstype;
    soknadFomDato?: Date;
}

const SoknadSection = ({ soknadstype, soknadFomDato }: SoknadSectionProps) => {
    const title: string = (() => {
        switch (soknadstype) {
            case 'SOK_NA':
                return 'Du må søke om sykepenger';
            case 'SOK_SENERE_KORT_SYKMELDING':
                return 'Du må søke om sykepenger senere';
            case 'SOK_SENERE_LANG_SYKMELDING':
                return 'Du må søke om sykepenger senere';
            case 'SOK_PAPIR':
                return 'Du må gjøre resten på papir';
            case 'SOK_SENDT':
                return 'Søknaden om sykepenger er sendt';
            case 'UTEN_SOKNAD':
                return 'Du trenger ikke å søke om sykepenger';
        }
    })();

    // TODO: do not display date if missing from props
    const content: string | JSX.Element = (() => {
        switch (soknadstype) {
            case 'SOK_NA':
                return (
                    <>
                        <Normaltekst className="statuspanel--margin-bottom">
                            I søknaden svarer du på noen spørsmål. Svarene dine brukes til å beregne sykepengene.
                        </Normaltekst>
                        <ExpandableChevron buttonText="Hvorfor må jeg søke?">
                            For å utbetale riktig trenger vi å vite hva som skjedde i løpet av sykefraværet, for
                            eksempel om du jobbet mer enn sykmeldingen sier, eller om du gjorde noe annet som har
                            betydning for sykepengene dine.
                        </ExpandableChevron>
                        <Knapp className="statuspanel--margin-top">Gå til søknaden</Knapp>
                    </>
                );
            case 'SOK_SENERE_KORT_SYKMELDING':
                return (
                    <>
                        <Normaltekst className="statuspanel--margin-bottom">
                            Når sykmeldingsperioden er ferdig, får du en søknad med spørsmål. Svarene dine brukes til å
                            beregne sykepengene.
                        </Normaltekst>
                        <Normaltekst className="statuspanel--margin-bottom">
                            Søknaden kan fylles ut fra {dayjs(soknadFomDato).format('dddd D. MMMM YYYY')}
                        </Normaltekst>
                        <ExpandableChevron buttonText="Hvorfor må jeg vente med å søke?">
                            For å utbetale riktig trenger vi å vite hva som skjedde i løpet av sykefraværet, for
                            eksempel om du jobbet mer enn sykmeldingen sier, eller om du gjorde noe annet som har
                            betydning for sykepengene dine. Du får en melding når søknaden er klar til å fylles ut.
                        </ExpandableChevron>
                    </>
                );
            case 'SOK_SENERE_LANG_SYKMELDING':
                return (
                    <>
                        <Normaltekst className="statuspanel--margin-bottom">
                            Du er sykmeldt over en lengre periode. Vi gir deg beskjed når søknaden er klar til å fylles
                            ut. Svarene dine brukes til å beregne sykepengene.
                        </Normaltekst>
                        <Normaltekst className="statuspanel--margin-bottom">
                            Søknaden kan fylles ut fra {dayjs(soknadFomDato).format('dddd D. MMMM YYYY')}
                        </Normaltekst>
                        <ExpandableChevron buttonText="Hvorfor må jeg vente med å søke?">
                            For å utbetale riktig trenger vi å vite hva som skjedde i løpet av sykefraværet, for
                            eksempel om du jobbet mer enn sykmeldingen sier, eller om du gjorde noe annet som har
                            betydning for sykepengene dine. Du får en melding når søknaden er klar til å fylles ut.
                        </ExpandableChevron>
                    </>
                );
            case 'SOK_PAPIR':
                return (
                    <>
                        <Normaltekst className="statuspanel--margin-bottom">
                            Når sykefraværet er over, fyller du ut del D av papirsykmeldingen du fikk hos legen. Hvis du
                            ikke har fått papiret, må du be legen om å få det.
                        </Normaltekst>
                        <Normaltekst>
                            Spør arbeidsgiveren din om du skal sende del D direkte til dem eller til NAV.
                        </Normaltekst>
                    </>
                );
            case 'SOK_SENDT':
                return (
                    <>
                        <Normaltekst>Søknaden er sendt. vent på svar</Normaltekst>
                    </>
                );
            case 'UTEN_SOKNAD':
                return (
                    <>
                        <Normaltekst>Du trenger ikke å søke</Normaltekst>
                    </>
                );
        }
    })();

    return (
        <div className="statuspanel__section">
            <Element className="statuspanel__section-title">{title}</Element>
            {content}
        </div>
    );
};

export default SoknadSection;
