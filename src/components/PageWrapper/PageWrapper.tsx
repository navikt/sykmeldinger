import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Sykmelding } from '../../models/Sykmelding/Sykmelding';
import { logger } from '../../utils/logger';
import Brodsmuler from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import Spacing from '../Spacing/Spacing';
import TilHovedsiden from '../TilHovedsiden/TilHovedsiden';

interface PageWrapperProps {
    sykmelding?: Sykmelding;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, sykmelding }) => {
    const { sykmeldingId } = useParams<{ sykmeldingId?: string }>();
    const { pathname } = useLocation();

    useEffect(() => {
        logger.info(pathname);
    }, [pathname]);

    const pathnameWithoutTrailingSlash =
        pathname.charAt(pathname.length - 1) === '/' ? pathname.slice(0, pathname.length - 1) : pathname;

    if (pathnameWithoutTrailingSlash === '/syk/sykmeldinger') {
        return (
            <>
                <Header title="Dine sykmeldinger" />
                <div className="limit">
                    <Brodsmuler
                        breadcrumbs={[
                            {
                                title: 'Sykmeldinger',
                            },
                        ]}
                    />
                    {children}
                    <Spacing direction="top" amount="large">
                        <TilHovedsiden />
                    </Spacing>
                </div>
            </>
        );
    }

    if (pathnameWithoutTrailingSlash === `/syk/sykmeldinger/${sykmeldingId}`) {
        return (
            <>
                <Header title={sykmelding?.getSykmeldingTitle()} subTitle={sykmelding?.getReadableSykmeldingLength()} />
                <div className="limit">
                    <Brodsmuler
                        breadcrumbs={[
                            {
                                title: 'Sykmeldinger',
                                path: window._env_?.SYKMELDINGER_ROOT || '#',
                            },
                            {
                                title: sykmelding?.getSykmeldingTitle() ?? 'Sykmelding',
                            },
                        ]}
                    />
                    {children}
                    <Spacing direction="top" amount="large">
                        <TilHovedsiden />
                    </Spacing>
                </div>
            </>
        );
    }

    if (pathnameWithoutTrailingSlash === `/syk/sykmeldinger/${sykmeldingId}/kvittering`) {
        return (
            <>
                <Header title={sykmelding?.getSykmeldingTitle()} subTitle={sykmelding?.getReadableSykmeldingLength()} />
                <div className="limit">
                    <Brodsmuler
                        breadcrumbs={[
                            {
                                title: 'Sykmeldinger',
                                path: window._env_?.SYKMELDINGER_ROOT || '#',
                            },
                            {
                                title: sykmelding?.getSykmeldingTitle() ?? 'Sykmelding',
                                path: window._env_?.SYKMELDINGER_ROOT + `/${sykmeldingId}` || '#',
                            },
                            {
                                title: 'Kvittering',
                            },
                        ]}
                    />
                    {children}
                    <Spacing direction="top" amount="large">
                        <TilHovedsiden />
                    </Spacing>
                </div>
            </>
        );
    }

    return null;
};

export default PageWrapper;
