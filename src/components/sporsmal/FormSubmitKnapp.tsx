import React from 'react';
import { Hovedknapp, Fareknapp } from 'nav-frontend-knapper';
import tekster from './sporsmal-tekster';
import { Arbeidsforhold } from './Sporsmal';

interface FormSubmitKnappProps {
    visAvbryt: boolean;
    onAvbryt: () => void;
    visSubmitSpinner: boolean;
    visAvbrytSpinner: boolean;
    watchSykmeldtFra: any;
}

const FormSubmitKnapp: React.FC<FormSubmitKnappProps> = ({
    visAvbryt,
    onAvbryt,
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
        <div className="knapp--sentrer">
            <Hovedknapp htmlType="submit" spinner={visSubmitSpinner} data-testid="knapp-submit">
                {watchSykmeldtFra === Arbeidsforhold.ARBEIDSGIVER
                    ? tekster['knapp.send-sykmeldingen']
                    : tekster['knapp.bekreft-sykmeldingen']}
            </Hovedknapp>
        </div>
    );
};

export default FormSubmitKnapp;
