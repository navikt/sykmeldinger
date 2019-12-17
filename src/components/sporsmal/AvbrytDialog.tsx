import React, { useState } from 'react';
import PanelBase from 'nav-frontend-paneler';
import Tekstomrade from 'nav-frontend-tekstomrade';
import tekster from './sporsmal-tekster';
import { Fareknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';

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
                onClick={e => {
                    e.preventDefault();
                    onAvbryt();
                }}
            >
                {tekster['avbrytdialog.avbryt-knapp']}
            </Fareknapp>
            <Lenke
                href="_blank"
                onClick={e => {
                    e.preventDefault();
                    setVisAvbrytDialog(navarendeVerdi => !navarendeVerdi);
                }}
            >
                {tekster['avbrytdialog.angre-knapp']}
            </Lenke>
        </PanelBase>
    );
};

export default AvbrytDialog;
