import './AvbrytDialog.less';

import PanelBase from 'nav-frontend-paneler';
import React from 'react';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { Fareknapp, Knapp } from 'nav-frontend-knapper';

import tekster from '../SendingsSkjema-tekster';

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
            <Tekstomrade className="avbrytdialog--margin-bottom">{tekster['avbrytdialog.er-du-sikker']}</Tekstomrade>
            <Tekstomrade className="avbrytdialog--margin-bottom">{tekster['avbrytdialog.kan-sende-papir']}</Tekstomrade>
            <Fareknapp
                htmlType="button"
                className="avbrytdialog--margin-bottom"
                spinner={visSpinner}
                onClick={(e) => {
                    e.preventDefault();
                    onAvbryt();
                }}
            >
                {tekster['avbrytdialog.avbryt-knapp']}
            </Fareknapp>
            <Knapp
                onClick={(e) => {
                    e.preventDefault();
                    setVisAvbrytDialog(false);
                }}
            >
                {tekster['avbrytdialog.angre-knapp']}
            </Knapp>
        </PanelBase>
    );
};

export default AvbrytDialog;
