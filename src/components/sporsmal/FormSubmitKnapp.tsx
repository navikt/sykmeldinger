import React from 'react';
import { Hovedknapp, Fareknapp } from 'nav-frontend-knapper';
import tekster from './sporsmal-tekster';
import Lenke from 'nav-frontend-lenker';
import { Arbeidsforhold } from '../../types/sporsmalTypes';

interface FormSubmitKnappProps {
    visAvbryt: boolean;
    onAvbryt: () => void;
    avbrytdialogRef: React.MutableRefObject<HTMLDivElement>;
    setVisAvbrytdialog: React.Dispatch<React.SetStateAction<boolean>>;
    visSubmitSpinner: boolean;
    visAvbrytSpinner: boolean;
    watchSykmeldtFra: any;
}

const FormSubmitKnapp = ({
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
                    {new RegExp(Arbeidsforhold.ARBEIDSGIVER).test(watchSykmeldtFra)
                        ? tekster['knapp.send-sykmeldingen']
                        : tekster['knapp.bekreft-sykmeldingen']}
                </Hovedknapp>
            </div>
            <div className="knapp--sentrer" ref={avbrytdialogRef}>
                <Lenke
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        setVisAvbrytdialog(vises => !vises);
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
