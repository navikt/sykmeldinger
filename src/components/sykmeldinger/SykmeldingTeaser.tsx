import React, { useState } from 'react';

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

    return (<div className="teaser-innhold">
        {sykmeldingTypeTekst}
    </div>);
};

export default SykmeldingTeaser;
