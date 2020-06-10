import './AvbrytDialog.less';

import PanelBase from 'nav-frontend-paneler';
import React from 'react';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { Fareknapp, Knapp } from 'nav-frontend-knapper';

interface AvbrytDialogProps {
    vis: boolean;
    visSpinner: boolean;
    onAvbryt: () => void;
    setVisAvbrytDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvbrytDialog = ({ vis, visSpinner, onAvbryt, setVisAvbrytDialog }: AvbrytDialogProps) => {
    if (!vis) {
        return null;
    }

    return (
        <PanelBase className="avbrytdialog">
            <Tekstomrade className="avbrytdialog--margin-bottom">
                Er du sikker på at du vil avbryte denne sykmeldingen?
            </Tekstomrade>
            <Tekstomrade className="avbrytdialog--margin-bottom">Du kan fortsatt levere den på papir.</Tekstomrade>
            <Fareknapp
                htmlType="button"
                className="avbrytdialog--margin-bottom"
                spinner={visSpinner}
                onClick={(e) => {
                    e.preventDefault();
                    onAvbryt();
                }}
            >
                JA, JEG ER SIKKER
            </Fareknapp>
            <Knapp
                onClick={(e) => {
                    e.preventDefault();
                    setVisAvbrytDialog(false);
                }}
            >
                Angre
            </Knapp>
        </PanelBase>
    );
};

export default AvbrytDialog;
