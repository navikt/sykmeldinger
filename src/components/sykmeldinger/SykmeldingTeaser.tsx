import React, { useState, useRef } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import './SykmeldingTeaser.less';

export enum SykmeldingTeaserTekstTyper {
    NY = '',
    BEKREFTET_AV_DEG = 'Bekreftet av deg',
    SENDT_TIL_AVBEIDSGIVER = 'Sendt til arbeidsgiver',
    AVBRUTT_AV_DEG = 'Avbrutt av deg',
    AVVIST_AV_NAV = 'Avvist av nav',
}

interface SykmeldingTeaserProps {
    sykmelding: any;
}

const SykmeldingTeaser: React.FC<SykmeldingTeaserProps> = ({ sykmelding }: SykmeldingTeaserProps) => {
    const [sykmeldingTypeTekst, setSykmeldingTypeTekst] = useState<SykmeldingTeaserTekstTyper>(
        SykmeldingTeaserTekstTyper.AVVIST_AV_NAV,
    );
    const teaserContainer = useRef<HTMLDivElement>(document.createElement("div"));

    return (
        <div
            ref={teaserContainer}
            className="teaser"
            onMouseEnter={() => {
                teaserContainer.current.classList.add('teaser--hover');
            }}
            onMouseLeave={() => {
                teaserContainer.current.classList.remove('teaser--hover');
            }}
        >
            <div className="teaser-venstre">
                <img src="" alt="bildetekst" className="teaser-ikon" />
                <div className="teaser-info">
                    <Normaltekst className="teaser-info__periode">30.05.94-25.15.48</Normaltekst>
                    <Undertittel className="teaser-info__tittel">Sykmelding</Undertittel>
                    {/* LISTE MED INFO */}
                </div>
            </div>
            <div className="teaser-hoyre">
                <Normaltekst className="teaser-sykmelding-type">{sykmeldingTypeTekst}</Normaltekst>
                <HoyreChevron className="teaser-chevron" />
            </div>
        </div>
    );
};

export default SykmeldingTeaser;
