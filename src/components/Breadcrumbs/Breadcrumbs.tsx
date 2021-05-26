import './Breadcrumbs.less';

import React from 'react';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

const PersonIcon = () => {
    return (
        <svg
            width="30"
            height="30"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <defs></defs>
            <title>personikon</title>
            <path
                className="cls-1"
                d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM1,12a11,11,0,1,1,19.07,7.46,23.33,23.33,0,0,0-4.29-1.83l-1.25-.46V15.3a6.25,6.25,0,0,0,2.54-5.2c0-3.31-2.28-6-5.07-6s-5.07,2.69-5.07,6a6.23,6.23,0,0,0,2.66,5.28v1.79l-1.27.46A23.91,23.91,0,0,0,4,19.49,11,11,0,0,1,1,12Zm6.89-1.9c0-2.74,1.84-5,4.11-5s4.11,2.3,4.11,5-1.84,5-4.11,5S7.89,12.84,7.89,10.1ZM4.68,20.19a23.56,23.56,0,0,1,4-1.65l1.6-.59a0.48,0.48,0,0,0,.31-0.45V15.86a4.31,4.31,0,0,0,2.94,0v1.63a0.48,0.48,0,0,0,.31.45l1.57,0.58a23,23,0,0,1,3.94,1.69A11,11,0,0,1,4.68,20.19Z"
            />
        </svg>
    );
};

export interface BreadcrumbProps {
    path?: string;
    title: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, title }) => {
    if (path) {
        return (
            <li className="breadcrumbs__crumb">
                <Link to={path} className="lenke">
                    {title}
                </Link>
            </li>
        );
    }

    return (
        <li className="breadcrumbs__crumb">
            <span>{title}</span>
        </li>
    );
};

interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbProps[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
    return (
        <nav className="breadcrumbs" aria-label="Du er her: ">
            <div className="breadcrumbs__icon">
                <PersonIcon />
            </div>
            <Normaltekst tag="ul" className="breadcrumbs__crumbs">
                <li className="breadcrumbs__crumb">
                    <Lenke href={window._env_?.DITT_NAV_ROOT || '#'} className="lenke">
                        Ditt NAV
                    </Lenke>
                </li>
                <li className="breadcrumbs__crumb">
                    <Lenke href={window._env_?.SYKEFRAVAER_ROOT || '#'} className="lenke">
                        Sykefravær
                    </Lenke>
                </li>
                {breadcrumbs.map(({ path, title }, index) => {
                    return <Breadcrumb key={index} path={path} title={title} />;
                })}
            </Normaltekst>
        </nav>
    );
};

export default Breadcrumbs;
