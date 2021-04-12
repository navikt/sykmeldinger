import NavFrontendChevron from 'nav-frontend-chevron';
import { Element } from 'nav-frontend-typografi';
import { useRef, useState } from 'react';
import './FlereOpplysninger.less';

const FlereOpplysninger: React.FC = ({ children }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const elementRef = useRef(document.createElement('div'));

    return (
        <div ref={elementRef} className="flere-opplysninger">
            <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded((prev) => !prev)}
                className="flere-opplysninger__toggle"
            >
                <Element className="toggle-text">{expanded ? 'Færre' : 'Flere'} opplysninger</Element>
                <NavFrontendChevron type={expanded ? 'opp' : 'ned'} />
            </button>
            {expanded && (
                <div className="flere-opplysninger__content">
                    {children}
                    <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setExpanded((prev) => !prev)}
                        className="flere-opplysninger__toggle--center"
                    >
                        <Element className="toggle-text">Lukk</Element>
                        <NavFrontendChevron type="opp" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FlereOpplysninger;
