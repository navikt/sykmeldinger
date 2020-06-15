import './Breadcrumbs.less';

import React from 'react';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';

import person from './person.svg';

export type Breadcrumb = {
    path?: string;
    title: string;
};

const Breadcrumb = ({ crumb: { path, title } }: { crumb: Breadcrumb }) => {
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

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
    return (
        <nav className="breadcrumbs" aria-label="Du er her: ">
            <img src={person} alt="Du" className="breadcrumbs__icon" />
            <Normaltekst tag="ul" className="breadcrumbs__crumbs">
                <Breadcrumb crumb={{ path: '/dittnav', title: 'Ditt NAV' }} />
                {breadcrumbs.map((crumb, index) => {
                    return <Breadcrumb key={index} crumb={crumb} />;
                })}
            </Normaltekst>
        </nav>
    );
};

export default Breadcrumbs;
