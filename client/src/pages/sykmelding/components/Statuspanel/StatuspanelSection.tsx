import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './Statuspanel.less';

interface StatuspanelSectionProps {
    show?: boolean;
    title: React.ReactNode | React.ReactChild | React.ReactChildren;
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
}

const StatuspanelSection = ({ show = true, title, children }: StatuspanelSectionProps) => {
    if (!show) {
        return null;
    }

    return (
        <div className="statuspanel__section">
            <Element className="statuspanel__section-title">{title}</Element>
            <Normaltekst>{children}</Normaltekst>
        </div>
    );
};

export default StatuspanelSection;
