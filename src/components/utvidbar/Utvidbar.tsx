import React, { useEffect, useRef, useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Chevron from 'nav-frontend-chevron';
import './utvidbar.less';

interface UtvidbarProps {
    apen?: boolean;
    tittel: React.ReactNode | string;
    children: React.ReactNode;
    ikon: string;
    ikonHover: string;
    ikonAltTekst?: string;
    visLukk?: boolean;
    fargetema?: string;
}

const Utvidbar = (props: UtvidbarProps) => {
    const [apen, setApen] = useState(props.apen);
    const [ikon, setIkon] = useState(props.ikon);

    const utvidKnapp = useRef<HTMLButtonElement>(null);
    const utvidbar = useRef<HTMLDivElement>(null);

    const innhold = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setApen(props.apen);
    }, [props.apen]);

    const scroll = async (isApen: boolean) => {
        if (!utvidbar.current || !utvidKnapp.current) {
            return;
        }

        if (isApen) {
            await new Promise(resolve => setTimeout(resolve, 200));
            window.scrollTo({ top: utvidbar.current.offsetTop, left: 0, behavior: 'smooth' });
        } else {
            utvidKnapp.current.focus();
        }
    };

    return (
        <div ref={utvidbar} className="utvidbar">
            <button
                aria-expanded={apen}
                ref={utvidKnapp}
                onMouseEnter={() => setIkon(props.ikonHover)}
                onMouseLeave={() => setIkon(props.ikon)}
                onClick={() => {
                    scroll(!apen);
                    setApen(!apen);
                }}
                className={`utvidbar__toggle ${props.fargetema ? `utvidbar__toggle-${props.fargetema}` : ''}`}
            >
                <img aria-hidden="true" className="utvidbar__ikon" width={30} alt={props.ikonAltTekst} src={ikon} />
                <Element tag="h3">{props.tittel}</Element>
                <div className="utvidbar__handling">
                    <Normaltekst tag="em">{apen ? 'Lukk' : 'Åpne'}</Normaltekst>
                    <Chevron type={apen ? 'opp' : 'ned'} />
                </div>
            </button>
            <div
                className={'utvidbar__innholdContainer' + (apen ? ' apen' : '')}
                style={{ maxHeight: apen ? 'fit-content' : '0' }}
            >
                <div ref={innhold} className="utvidbar__innhold">
                    {props.children}
                    <div className="lenkerad ikke-print">
                        <button
                            type="button"
                            className="lenke"
                            aria-pressed={!apen}
                            tabIndex={apen ? undefined : -1}
                            onClick={() => {
                                scroll(!apen);
                                setApen(!apen);
                            }}
                        >
                            <Normaltekst tag="span">Lukk</Normaltekst>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Utvidbar;
