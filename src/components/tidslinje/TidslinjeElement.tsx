import React, { ReactNode, useRef } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element } from 'nav-frontend-typografi';
import './TidslinjeElement.less';
import klokke from './klokke.svg';
import plaster from './plaster.svg';
import sirkel from './sirkel.svg';

interface TidslinjeElementProps {
    erEkspanderbar: boolean;
    erForsteElement?: boolean;
    erSisteElement?: boolean;
    innhold?: ReactNode;
    erApen?: boolean;
    bilde?: string;
    tittel: string;
}

const TidslinjeElement: React.FC<TidslinjeElementProps> = ({
    erEkspanderbar,
    erForsteElement = false,
    erSisteElement = false,
    erApen = false,
    bilde,
    tittel,
    innhold,
}: TidslinjeElementProps) => {
    const panelRef = useRef<HTMLDivElement>(document.createElement("div"));

    const scrollTilAktueltPanel = (): void => {
        setTimeout(() => {
            window.scrollTo({ top: panelRef.current.offsetTop - 50, behavior: 'smooth' });
        }, 300);
    }

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
                        <img src={plaster} alt="plasterikon" width={30} />
                    </div>
                )}
                {erEkspanderbar && (
                    <div className="tidslinje-element__stegindikator--sirkel">
                        <img src={sirkel} alt="sirkelikon" width={15} />
                    </div>
                )}
                {!erEkspanderbar && !erForsteElement && <img src={klokke} alt="klokkeikon" width={30} />}
            </div>

            {erEkspanderbar && (
                <div ref={panelRef} className="tidslinje-element tidslinje-element__ekspanderbar">
                    <Ekspanderbartpanel onClick={scrollTilAktueltPanel} tittel={tittel} apen={erApen} className="ekspanderbar">
                        <img src={bilde} alt="bilde i ekspanderbart panel" className="ekspanderbar__bilde" width={500}/>
                        {innhold}
                    </Ekspanderbartpanel>
                </div>
            )}
            {!erEkspanderbar && (
                <div className="tidslinje-element tidslinje-element__ukeNummer">
                    <Element>{tittel}</Element>
                </div>
            )}
        </div>
    );
};

export default TidslinjeElement;
