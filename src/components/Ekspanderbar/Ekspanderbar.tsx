import NavFrontendChevron from 'nav-frontend-chevron';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { useState } from 'react';
import './Ekspanderbar.less';

interface EkspanderbarProps {
    title: string;
}

const Ekspanderbar: React.FC<EkspanderbarProps> = ({ title, children }) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <div className="ekspanderbar">
            <button
                type="button"
                aria-expanded={expanded}
                onClick={() => {
                    setExpanded((prev) => !prev);
                }}
                className="ekspanderbar__toggle"
            >
                <Element className="toggle-text">{title}</Element>
                <NavFrontendChevron type={expanded ? 'opp' : 'ned'} />
            </button>
            <div style={{ display: expanded ? '' : 'none' }} aria-hidden={!expanded} className="ekspanderbar__content">
                {typeof children === 'string' ? <Normaltekst>{children}</Normaltekst> : children}
            </div>
        </div>
    );
};

export default Ekspanderbar;
