import './PeriodeSeksjon.less';

import { Element, Normaltekst } from 'nav-frontend-typografi';

import Periode from '../../../../../../models/Sykmelding/Periode';

interface PeriodeSeksjonProps {
    periode: Periode;
    understrek: boolean;
}

// TODO: needs refactor
const PeriodeSeksjon = ({ periode, understrek }: PeriodeSeksjonProps) => {
    const antallDager = periode.getLength();

    return (
        <div className="periodeseksjon">
            <Element>Periode</Element>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Normaltekst>
                    <strong>{periode.getReadablePeriod()}</strong>
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
                    <Element>Innspill til arbeidsgiver om tilrettelegging</Element>
                    <Normaltekst>{periode.innspillTilArbeidsgiver}</Normaltekst>
                </>
            )}
            {understrek && <hr />}
        </div>
    );
};

export default PeriodeSeksjon;
