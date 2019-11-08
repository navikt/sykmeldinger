import React from 'react';
import { Periode } from '../../../../types/sykmeldingTypes';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

import { tilLesbarPeriodeMedArstall, getDuration } from '../../../../utils/datoUtils';
import tekster from './periodeseksjon-tekster';
import './periodeseksjon.less';

interface PeriodeSeksjonProps {
    periode: Periode;
}

const PeriodeSeksjon = ({ periode }: PeriodeSeksjonProps) => {
    const antallDager = getDuration(periode.fom, periode.tom);
    return (
        <div className="periodeseksjon">
            <EtikettLiten>Periode</EtikettLiten>
            <div style={{ display: 'flex' }}>
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
                    {periode.gradert.reisetilskudd && (periode.gradert.grad > 0 && periode.gradert.grad < 100) && (
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
            <hr />
        </div>
    );
};

export default PeriodeSeksjon;
