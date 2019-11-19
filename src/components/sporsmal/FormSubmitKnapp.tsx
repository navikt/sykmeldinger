import React from 'react';
import { Hovedknapp, Fareknapp } from 'nav-frontend-knapper';
import tekster from './sporsmal-tekster';
import { Arbeidsforhold } from './Sporsmal';

interface FormSubmitKnappProps {
    visAvbryt: boolean;
    onAvbryt: () => void;
    visSpinner: boolean;
    watchSykmeldtFra: any;
}

const FormSubmitKnapp: React.FC<FormSubmitKnappProps> = ({
    visAvbryt,
    onAvbryt,
    visSpinner,
    watchSykmeldtFra,
}: FormSubmitKnappProps) => {
    if (visAvbryt) {
        return (
            <div className="knapp--sentrer">
                <Fareknapp spinner={visSpinner} data-testid="knapp-submit" onClick={onAvbryt}>
                    {tekster['knapp.avbryt-sykmeldingen']}
                </Fareknapp>
            </div>
        );
    }

    return (
        <div className="knapp--sentrer">
            <Hovedknapp htmlType="submit" spinner={visSpinner} data-testid="knapp-submit">
                {watchSykmeldtFra === Arbeidsforhold.ARBEIDSGIVER
                    ? tekster['knapp.send-sykmeldingen']
                    : tekster['knapp.bekreft-sykmeldingen']}
            </Hovedknapp>
        </div>
    );
};

export default FormSubmitKnapp;
