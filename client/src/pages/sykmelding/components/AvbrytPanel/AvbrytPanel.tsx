import React from 'react';
import './AvbrytPanel.less';
import { Xknapp } from 'nav-frontend-ikonknapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';

interface AvbrytPanelProps {
    avbrytSykmelding: () => void;
    closePanel: React.Dispatch<React.SetStateAction<boolean>>;
    type?: 'NORMAL' | 'PAPER' | 'MANDATORY_CANCEL';
    showLoadingSpinner?: boolean;
}
const AvbrytPanel = ({
    avbrytSykmelding,
    closePanel,
    type = 'NORMAL',
    showLoadingSpinner = false,
}: AvbrytPanelProps) => {
    const MainContent: JSX.Element = (() => {
        switch (type) {
            case 'NORMAL':
                return (
                    <>
                        <Normaltekst>Er du sikker på at du vil avbryte sykmeldingen?</Normaltekst>
                        <br />
                        <Knapp
                            htmlType="button"
                            type="fare"
                            spinner={showLoadingSpinner}
                            onClick={() => avbrytSykmelding()}
                        >
                            Ja, jeg er sikker
                        </Knapp>
                    </>
                );
            case 'PAPER':
                return (
                    <>
                        <Normaltekst>Er du sikker på at du skal fortsette med papir?</Normaltekst>
                        <br />
                        <Normaltekst>Du avbryter kun den digitale sykmeldingen.</Normaltekst>
                        <br />
                        <Knapp
                            htmlType="button"
                            type="fare"
                            spinner={showLoadingSpinner}
                            onClick={() => avbrytSykmelding()}
                        >
                            Ja, jeg er sikker
                        </Knapp>
                    </>
                );
            case 'MANDATORY_CANCEL':
                return (
                    <>
                        <Knapp
                            htmlType="button"
                            type="fare"
                            className="margin-bottom--2"
                            spinner={showLoadingSpinner}
                            onClick={() => avbrytSykmelding()}
                        >
                            Avbryt sykmelding
                        </Knapp>
                        <br />
                        <Normaltekst>
                            Selv om du avbryter sykmeldingen nå, har du mulighet til å gjenåpne den på et senere
                            tidspunkt.
                        </Normaltekst>
                    </>
                );
        }
    })();

    return (
        <div className="avbryt-panel">
            {type !== 'MANDATORY_CANCEL' && (
                <Xknapp
                    htmlType="button"
                    className="avbryt-panel__cross"
                    onClick={() => closePanel((previousValue) => !previousValue)}
                />
            )}
            {MainContent}
        </div>
    );
};

export default AvbrytPanel;
