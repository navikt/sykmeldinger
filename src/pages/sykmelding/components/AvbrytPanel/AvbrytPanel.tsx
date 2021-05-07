import React, { useContext, useState } from 'react';
import './AvbrytPanel.less';
import { Xknapp } from 'nav-frontend-ikonknapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { AvbrytContext } from '../../OK/APEN/AvbrytContext';
import useAvbryt from '../../../../hooks/useAvbryt';
import { useParams } from 'react-router-dom';
import Spacing from '../../../commonComponents/Spacing/Spacing';
import CenterItems from '../../../commonComponents/CenterItems/CenterItems';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

const AvbrytPanel: React.FC = () => {
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();

    // maAvbryte overrules isOpen
    const { maAvbryte } = useContext(AvbrytContext);
    const [isOpen, setIsOpen] = useState(false);

    // TODO: error state
    const { isLoading, mutate: avbryt, error } = useAvbryt(sykmeldingId);

    if (maAvbryte) {
        return (
            <div className="avbryt-panel">
                <Knapp
                    htmlType="button"
                    type="fare"
                    className="avbryt-panel__avbryt-knapp"
                    spinner={isLoading}
                    onClick={() => avbryt()}
                >
                    Avbryt sykmelding
                </Knapp>
                <Normaltekst>
                    Selv om du avbryter sykmeldingen nå, har du mulighet til å gjenåpne den på et senere tidspunkt.
                </Normaltekst>
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
                    <Knapp htmlType="button" type="flat" mini onClick={() => setIsOpen((prev) => !prev)}>
                        Jeg vil avbryte sykmeldingen
                    </Knapp>
                </CenterItems>
            </Spacing>

            {isOpen && (
                <div className="avbryt-panel">
                    {maAvbryte === false && (
                        <Xknapp
                            htmlType="button"
                            className="avbryt-panel__cross"
                            onClick={() => setIsOpen((prev) => !prev)}
                        />
                    )}

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
