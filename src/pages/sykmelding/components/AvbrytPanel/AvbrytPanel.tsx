import React, { useContext, useRef, useState } from 'react';
import './AvbrytPanel.less';
import { Xknapp } from 'nav-frontend-ikonknapper';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { AvbrytContext } from '../../OK/APEN/AvbrytContext';
import useAvbryt from '../../../../hooks/useAvbryt';
import { useParams } from 'react-router-dom';
import Spacing from '../../../../components/Spacing/Spacing';
import CenterItems from '../../../../components/CenterItems/CenterItems';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

const AvbrytPanel: React.FC = () => {
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();

    // maAvbryte overrules isOpen
    const { maAvbryte } = useContext(AvbrytContext);
    const [isOpen, setIsOpen] = useState(false);

    const avbrytPanelRef = useRef<HTMLDivElement>(null);

    const { isLoading, mutate: avbryt, error } = useAvbryt(sykmeldingId);

    if (maAvbryte) {
        return (
            <div className="avbryt-panel">
                <Undertittel tag="h3" className="avbryt-panel__title">
                    Du kan ikke bruke denne sykmeldingen
                </Undertittel>
                <Element className="avbryt-panel__info">
                    Du må avbryte denne sykmeldingen og kontakte den som har sykmeldt deg for å få en ny.
                </Element>
                <Knapp
                    htmlType="button"
                    type="fare"
                    className="avbryt-panel__avbryt-knapp"
                    spinner={isLoading}
                    onClick={() => avbryt()}
                >
                    Avbryt sykmelding
                </Knapp>

                {error && (
                    <Spacing direction="top">
                        <AlertStripeFeil>
                            Det oppsto en feil ved avbryting av sykmeldingen. Vennligst prøv igjen senere.
                        </AlertStripeFeil>
                    </Spacing>
                )}
            </div>
        );
    }

    return (
        <>
            <Spacing amount="small">
                <CenterItems horizontal>
                    <Knapp
                        htmlType="button"
                        type="flat"
                        mini
                        onClick={() => {
                            setIsOpen((prev) => !prev);
                            setTimeout(() => {
                                avbrytPanelRef.current?.focus();
                            }, 100);
                        }}
                    >
                        Jeg vil avbryte sykmeldingen
                    </Knapp>
                </CenterItems>
            </Spacing>

            {isOpen && (
                <div className="avbryt-panel" ref={avbrytPanelRef}>
                    <Xknapp
                        htmlType="button"
                        className="avbryt-panel__cross"
                        onClick={() => setIsOpen((prev) => !prev)}
                    />

                    <Normaltekst className="avbryt-panel__er-du-sikker">
                        Er du sikker på at du vil avbryte sykmeldingen?
                    </Normaltekst>
                    <Knapp htmlType="button" type="fare" spinner={isLoading} onClick={() => avbryt()}>
                        Ja, jeg er sikker
                    </Knapp>

                    {error && (
                        <Spacing direction="top">
                            <AlertStripeFeil>
                                Det oppsto en feil ved avbryting av sykmeldingen. Vennligst prøv igjen senere.
                            </AlertStripeFeil>
                        </Spacing>
                    )}
                </div>
            )}
        </>
    );
};

export default AvbrytPanel;
