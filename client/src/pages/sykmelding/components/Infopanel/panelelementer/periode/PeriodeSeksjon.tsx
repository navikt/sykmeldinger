import './PeriodeSeksjon.less';

import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

import { hentDagerMellomDatoer, tilLesbarPeriodeMedArstall } from '../../../../../../utils/datoUtils';
import { Periode } from '../../../../../../types/sykmelding';

interface PeriodeSeksjonProps {
    periode: Periode;
    understrek: boolean;
}

// TODO: needs refactor
const PeriodeSeksjon = ({ periode, understrek }: PeriodeSeksjonProps) => {
    const antallDager = hentDagerMellomDatoer(periode.fom, periode.tom);
    return (
        <div className="periodeseksjon">
            <EtikettLiten>Periode</EtikettLiten>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Normaltekst>
                    <strong>{tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}</strong>
                </Normaltekst>
                <Normaltekst>
                    &nbsp;&bull; {antallDager} {antallDager === 1 ? 'dag' : 'dager'}
                </Normaltekst>
            </div>
            {periode.gradert && periode.gradert.grad && (
                <div style={{ display: 'flex' }}>
                    <Normaltekst>{periode.gradert.grad}% sykmeldt</Normaltekst>
                    {periode.gradert.reisetilskudd && periode.gradert.grad > 0 && periode.gradert.grad < 100 && (
                        <Normaltekst>&nbsp;med reisetilskudd</Normaltekst>
                    )}
                </div>
            )}
            {periode.behandlingsdager && <Normaltekst>{periode.behandlingsdager} behandlingsdager</Normaltekst>}
            {periode.type === 'REISETILSKUDD' && !periode.gradert && <Normaltekst>Reisetilskudd</Normaltekst>}
            {periode.innspillTilArbeidsgiver && (
                <>
                    <Normaltekst>Avventende sykmelding</Normaltekst>
                    <EtikettLiten>Innspill til arbeidsgiver om tilrettelegging</EtikettLiten>
                    <Normaltekst>{periode.innspillTilArbeidsgiver}</Normaltekst>
                </>
            )}
            {understrek && <hr />}
        </div>
    );
};

export default PeriodeSeksjon;
