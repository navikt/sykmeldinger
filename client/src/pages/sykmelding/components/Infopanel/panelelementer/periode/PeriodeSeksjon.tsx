import './PeriodeSeksjon.less';

import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

import { Periode } from '../../../../../../types/sykmeldingTypes';
import { hentDagerMellomDatoer, tilLesbarPeriodeMedArstall } from '../../../../../../utils/datoUtils';

interface PeriodeSeksjonProps {
    periode: Periode;
    understrek: boolean;
}

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
            {periode.reisetilskudd && !periode.gradert && <Normaltekst>Reisetilskudd</Normaltekst>}
            {periode.avventendeInnspillTilArbeidsgiver && (
                <>
                    <Normaltekst>Avventende sykmelding</Normaltekst>
                    <EtikettLiten>Innspill til arbeidsgiver om tilrettelegging</EtikettLiten>
                    <Normaltekst>{periode.avventendeInnspillTilArbeidsgiver}</Normaltekst>
                </>
            )}
            {understrek && <hr />}
        </div>
    );
};

export default PeriodeSeksjon;
