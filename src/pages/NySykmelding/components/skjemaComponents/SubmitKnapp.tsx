import React from 'react';
import { Fareknapp, Hovedknapp } from 'nav-frontend-knapper';

type SubmitKnappProps = {
    skalViseAvbryt: boolean;
    skalViseSend: boolean;
    submitting: boolean;
    onAvbryt: () => void;
    setVisAvbrytDialog: (val: boolean) => void;
};

const SubmitKnapp = ({ skalViseAvbryt, skalViseSend, submitting, onAvbryt, setVisAvbrytDialog }: SubmitKnappProps) => {
    if (skalViseAvbryt) {
        return (
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <Fareknapp spinner={submitting} onClick={onAvbryt}>
                    Avbryt Sykmelding
                </Fareknapp>
            </div>
        );
    }

    const submit = (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <Hovedknapp htmlType="submit" spinner={submitting} data-testid="knapp-submit">
                {skalViseSend ? 'Send' : 'Bekreft'} sykmelding
            </Hovedknapp>
        </div>
    );

    return (
        <>
            {submit}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <Fareknapp
                    onClick={e => {
                        e.preventDefault();
                        setVisAvbrytDialog(true);
                    }}
                >
                    knapp.onsker-ikke-bruke-sykmelding
                </Fareknapp>
            </div>
        </>
    );
};

export default SubmitKnapp;
