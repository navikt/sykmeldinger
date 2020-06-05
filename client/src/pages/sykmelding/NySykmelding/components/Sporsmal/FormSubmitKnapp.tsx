import Lenke from 'nav-frontend-lenker';
import React from 'react';
import { Fareknapp, Hovedknapp } from 'nav-frontend-knapper';
import { useFormContext } from 'react-hook-form';

import tekster from './Sporsmal-tekster';
import { Arbeidsforhold, Skjemafelt } from '../../../../../types/sporsmalTypes';

interface FormSubmitKnappProps {
    visAvbryt: boolean;
    onAvbryt: () => void;
    avbrytdialogRef: React.MutableRefObject<HTMLDivElement>;
    setVisAvbrytdialog: React.Dispatch<React.SetStateAction<boolean>>;
    visSubmitSpinner: boolean;
    visAvbrytSpinner: boolean;
}

const FormSubmitKnapp = ({
    visAvbryt,
    onAvbryt,
    avbrytdialogRef,
    setVisAvbrytdialog,
    visSubmitSpinner,
    visAvbrytSpinner,
}: FormSubmitKnappProps) => {
    const { watch } = useFormContext();

    const watchSykmeldtFra = watch(Skjemafelt.SYKMELDT_FRA);
    const skalViseSendknapp = new RegExp(Arbeidsforhold.ARBEIDSGIVER).test(watchSykmeldtFra);

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
                    {skalViseSendknapp ? tekster['knapp.send-sykmeldingen'] : tekster['knapp.bekreft-sykmeldingen']}
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
