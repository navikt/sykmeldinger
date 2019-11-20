import React from 'react';
import { Hovedknapp, Fareknapp } from 'nav-frontend-knapper';
import tekster from './sporsmal-tekster';
import { Arbeidsforhold } from './Sporsmal';
import Lenke from 'nav-frontend-lenker';

interface FormSubmitKnappProps {
    visAvbryt: boolean;
    onAvbryt: () => void;
    avbrytdialogRef: React.MutableRefObject<HTMLDivElement>;
    setVisAvbrytdialog: (arg: any) => void;
    visSubmitSpinner: boolean;
    visAvbrytSpinner: boolean;
    watchSykmeldtFra: any;
}

const FormSubmitKnapp: React.FC<FormSubmitKnappProps> = ({
    visAvbryt,
    onAvbryt,
    avbrytdialogRef,
    setVisAvbrytdialog,
    visSubmitSpinner,
    visAvbrytSpinner,
    watchSykmeldtFra,
}: FormSubmitKnappProps) => {
    if (visAvbryt) {
        return (
            <div className="knapp--sentrer">
                <Fareknapp
                    spinner={visAvbrytSpinner}
                    data-testid="knapp-submit"
                    onClick={e => {
                        e.preventDefault();
                        onAvbryt();
                    }}
                >
                    {tekster['knapp.avbryt-sykmeldingen']}
                </Fareknapp>
            </div>
        );
    }

    return (
        <>
            <div className="knapp--sentrer">
                <Hovedknapp htmlType="submit" spinner={visSubmitSpinner} data-testid="knapp-submit">
                    {watchSykmeldtFra === Arbeidsforhold.ARBEIDSGIVER
                        ? tekster['knapp.send-sykmeldingen']
                        : tekster['knapp.bekreft-sykmeldingen']}
                </Hovedknapp>
            </div>
            <div className="knapp--sentrer" ref={avbrytdialogRef}>
                <Lenke
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        setVisAvbrytdialog((vises: boolean) => !vises);
                        setTimeout(
                            () => window.scrollTo({ top: avbrytdialogRef.current.offsetTop, behavior: 'smooth' }),
                            300,
                        );
                    }}
                    className="knapp--ikke-bruk-sykmeldingen"
                >
                    {tekster['knapp.onsker-ikke-bruke-sykmelding']}
                </Lenke>
            </div>
        </>
    );
};

export default FormSubmitKnapp;
