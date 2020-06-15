import './Breadcrumbs.less';

import React from 'react';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';

import person from './person.svg';

export interface BreadcrumbProps {
    path?: string;
    title: string;
}

const Breadcrumb = ({ path, title }: BreadcrumbProps) => {
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

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
    return (
        <nav className="breadcrumbs" aria-label="Du er her: ">
            <img src={person} alt="Du" className="breadcrumbs__icon" />
            <Normaltekst tag="ul" className="breadcrumbs__crumbs">
                <Breadcrumb path="/dittnav" title="Ditt NAV" />
                {breadcrumbs.map(({ path, title }, index) => {
                    return <Breadcrumb key={index} path={path} title={title} />;
                })}
            </Normaltekst>
        </nav>
    );
};

export default Breadcrumbs;
