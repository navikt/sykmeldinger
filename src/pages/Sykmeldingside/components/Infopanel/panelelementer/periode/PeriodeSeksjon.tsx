import React from 'react';
import { Periode } from '../../../../../../types/sykmeldingTypes';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

import { tilLesbarPeriodeMedArstall, hentDagerMellomDatoer } from '../../../../../../utils/datoUtils';
import tekster from '../../Infopanel-tekster';
import './PeriodeSeksjon.less';

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
                        <Normaltekst>&nbsp;{tekster['periode.reisetilskudd']}</Normaltekst>
                    )}
                </div>
            )}
            {periode.behandlingsdager && (
                <Normaltekst>
                    {periode.behandlingsdager} {tekster['periode.behandlingsdager']}
                </Normaltekst>
            )}
            {periode.reisetilskudd && !periode.gradert && (
                <Normaltekst>{tekster['periode.reisetilskudd.tittel']}</Normaltekst>
            )}
            {periode.avventendeInnspillTilArbeidsgiver && (
                <>
                    <Normaltekst>{tekster['periode.avventende']}</Normaltekst>
                    <EtikettLiten>{tekster['periode.avventende.innspill']}</EtikettLiten>
                    <Normaltekst>{periode.avventendeInnspillTilArbeidsgiver}</Normaltekst>
                </>
            )}
            {understrek && <hr />}
        </div>
    );
};

export default PeriodeSeksjon;
