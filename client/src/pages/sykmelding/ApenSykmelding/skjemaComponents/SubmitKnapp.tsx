import './SubmitKnapp.less';

import Lenke from 'nav-frontend-lenker';
import React from 'react';
import { Fareknapp, Hovedknapp } from 'nav-frontend-knapper';

type SubmitKnappProps = {
    skalViseAvbryt: boolean;
    skalViseSend: boolean;
    submitting: boolean;
    onAvbryt: () => void;
    setVisAvbrytDialog: (val: boolean) => void;
    avbrytdialogRef: React.MutableRefObject<HTMLDivElement>;
};

const SubmitKnapp = ({
    skalViseAvbryt,
    skalViseSend,
    submitting,
    onAvbryt,
    setVisAvbrytDialog,
    avbrytdialogRef,
}: SubmitKnappProps) => {
    if (skalViseAvbryt) {
        return (
            <div className="submitknapp-container">
                <Fareknapp spinner={submitting} onClick={onAvbryt}>
                    AVBRYT SYKMELDINGEN
                </Fareknapp>
            </div>
        );
    }

    const submit = (
        <div className="submitknapp-container">
            <Hovedknapp htmlType="submit" spinner={submitting} data-testid="knapp-submit">
                {skalViseSend ? 'SEND SYKMELDINGEN' : 'BEKREFT SYKMELDINGEN'}
            </Hovedknapp>
        </div>
    );

    return (
        <>
            {submit}
            <div className="submitknapp-container" ref={avbrytdialogRef}>
                <Lenke
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setVisAvbrytDialog(true);
                        setTimeout(
                            () => window.scrollTo({ top: avbrytdialogRef.current.offsetTop, behavior: 'smooth' }),
                            300,
                        );
                    }}
                >
                    Jeg ønsker ikke å bruke denne sykmeldingen
                </Lenke>
            </div>
        </>
    );
};

export default SubmitKnapp;
