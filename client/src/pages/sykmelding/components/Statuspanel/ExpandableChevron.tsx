import React, { useState } from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import '../../../../../node_modules/nav-frontend-lenker-style/src/lenker-style.less';
import './ExpandableChevron.less';

interface ExpandableChevronProps {
    buttonText: string;
    children: React.ReactChild | React.ReactChildren | React.ReactNode;
}

const ExpandableChevron = ({ buttonText, children }: ExpandableChevronProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <div className="expandable-chevron">
            <button className="lenke" onClick={() => setExpanded((previous) => !previous)}>
                {buttonText}
                <NavFrontendChevron className="expandable-chevron__chevron" type={expanded ? 'opp' : 'ned'} />
            </button>
            {expanded && <AlertStripeInfo className="expandable-chevron__information">{children}</AlertStripeInfo>}
        </div>
    );
};

export default ExpandableChevron;
