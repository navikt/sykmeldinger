import React, { ReactNode, useRef } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element } from 'nav-frontend-typografi';
import './TidslinjeElement.less';
import klokke from './svg/klokke.svg';
import plaster from './svg/plaster.svg';
import sirkel from './svg/sirkel.svg';

interface TidslinjeElementProps {
    erEkspanderbar?: boolean;
    erForsteElement?: boolean;
    erSisteElement?: boolean;
    innhold?: ReactNode;
    erApen?: boolean;
    bilde?: string;
    tittel: string;
}

const TidslinjeElement = ({
    erEkspanderbar = false,
    erForsteElement = false,
    erSisteElement = false,
    erApen = false,
    bilde,
    tittel,
    innhold,
}: TidslinjeElementProps) => {
    const panelRef = useRef<HTMLDivElement>(document.createElement('div'));

    const scrollTilAktueltPanel = (): void => {
        setTimeout(() => {
            window.scrollTo({ top: panelRef.current.offsetTop, behavior: 'smooth' });
        }, 300);
    };

    return (
        <div className="tidslinje-element">
            {erForsteElement && (
                <div className="tidslinje-element tidslinje-element__linje tidslinje-element__linje--forste"></div>
            )}
            {erSisteElement && (
                <div className="tidslinje-element tidslinje-element__linje tidslinje-element__linje--siste"></div>
            )}
            {!erForsteElement && !erSisteElement && <div className="tidslinje-element tidslinje-element__linje"></div>}

            <div className="tidslinje-element tidslinje-element__stegindikator">
                {erForsteElement && (
                    <div className="tidslinje-element__stegindikator--plaster">
                        <img src={plaster} alt="plasterikon" width={25} />
                    </div>
                )}
                {erEkspanderbar && (
                    <div className="tidslinje-element__stegindikator--sirkel">
                        <img src={sirkel} alt="sirkelikon" width={15} />
                    </div>
                )}
                {!erEkspanderbar && !erForsteElement && <img src={klokke} alt="klokkeikon" width={25} />}
            </div>

            {erEkspanderbar ? (
                <div ref={panelRef} className="tidslinje-element tidslinje-element__ekspanderbar">
                    <Ekspanderbartpanel
                        onClick={scrollTilAktueltPanel}
                        tittel={tittel}
                        apen={erApen}
                        renderContentWhenClosed
                        className="ekspanderbar"
                    >
                        <img
                            src={bilde}
                            alt="bilde i ekspanderbart panel"
                            className="ekspanderbar__bilde"
                            width={500}
                        />
                        {innhold}
                    </Ekspanderbartpanel>
                </div>
            ) : (
                <div className="tidslinje-element tidslinje-element__ukeNummer">
                    <Element>{tittel}</Element>
                </div>
            )}
        </div>
    );
};

export default TidslinjeElement;
