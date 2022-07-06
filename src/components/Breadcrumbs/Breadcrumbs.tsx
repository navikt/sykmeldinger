import React from 'react';
import Link from 'next/link';
import { Link as DsLink } from '@navikt/ds-react';
import { People } from '@navikt/ds-icons';

import { getPublicEnv } from '../../utils/env';

import styles from './Breadcrumbs.module.css';

const publicEnv = getPublicEnv();

export interface BreadcrumbProps {
    path?: string;
    title: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, title }) => {
    if (path) {
        return (
            <li className={styles.breadcrumbsCrumb}>
                <Link href={path} passHref>
                    <DsLink>{title}</DsLink>
                </Link>
            </li>
        );
    }

    return (
        <li className={styles.breadcrumbsCrumb}>
            <span>{title}</span>
        </li>
    );
};

interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbProps[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
    return (
        <nav className={styles.breadcrumbs} aria-label="Du er her: ">
            <div className={styles.breadcrumbsIcon}>
                <People />
            </div>
            <ul className={styles.breadcrumbsCrumbs}>
                <li className={styles.breadcrumbsCrumb}>
                    <DsLink href={publicEnv.DITT_NAV_ROOT || '#'} className="lenke">
                        Ditt NAV
                    </DsLink>
                </li>
                <li className={styles.breadcrumbsCrumb}>
                    <DsLink href={publicEnv.SYKEFRAVAER_ROOT || '#'} className="lenke">
                        Ditt sykefravær
                    </DsLink>
                </li>
                {breadcrumbs.map(({ path, title }, index) => {
                    return <Breadcrumb key={index} path={path} title={title} />;
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
