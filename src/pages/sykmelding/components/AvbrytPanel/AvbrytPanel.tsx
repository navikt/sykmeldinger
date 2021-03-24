import React, { useContext, useState } from 'react';
import './AvbrytPanel.less';
import { Xknapp } from 'nav-frontend-ikonknapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { AvbrytContext } from '../../OK/APEN/AvbrytContext';
import useAvbryt from '../../../commonComponents/hooks/useAvbryt';
import { useParams } from 'react-router-dom';

const AvbrytPanel: React.FC = () => {
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();

    // maAvbryte overrules isOpen
    const { maAvbryte } = useContext(AvbrytContext);
    const [isOpen, setIsOpen] = useState(false);

    // TODO: error state
    const { isLoading, mutate: avbryt } = useAvbryt(sykmeldingId);

    if (maAvbryte) {
        return (
            <div className="avbryt-panel">
                <Knapp
                    htmlType="button"
                    type="fare"
                    className="margin-bottom--2"
                    spinner={isLoading}
                    onClick={() => avbryt()}
                >
                    Avbryt sykmelding
                </Knapp>
                <br />
                <Normaltekst>
                    Selv om du avbryter sykmeldingen nå, har du mulighet til å gjenåpne den på et senere tidspunkt.
                </Normaltekst>
            </div>
        );
    }

    return (
        <>
            <div className="avbryt-toggle" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <Knapp htmlType="button" type="flat" mini onClick={() => setIsOpen((prev) => !prev)}>
                    Jeg vil avbryte sykmeldingen
                </Knapp>
            </div>

            {isOpen && (
                <div className="avbryt-panel">
                    {maAvbryte === false && (
                        <Xknapp
                            htmlType="button"
                            className="avbryt-panel__cross"
                            onClick={() => setIsOpen((prev) => !prev)}
                        />
                    )}
                    <Normaltekst>Er du sikker på at du vil avbryte sykmeldingen?</Normaltekst>
                    <br />
                    <Knapp htmlType="button" type="fare" spinner={isLoading} onClick={() => avbryt()}>
                        Ja, jeg er sikker
                    </Knapp>
                </div>
            )}
        </>
    );
};

export default AvbrytPanel;
