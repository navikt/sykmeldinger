import { Periode } from '../types/sykmeldingTypes';
import { sorterPerioderEldsteFoerst } from './sorterSykemeldingUtils';

it('Sorterer perioder etter eldste først', () => {
    const perioder: Periode[] = [
        {
            fom: new Date('12/12/19'),
            tom: new Date('01/01/20'),
            reisetilskudd: false,
        },
        {
            fom: new Date('01/22/17'),
            tom: new Date('01/01/20'),
            reisetilskudd: false,
        },
        {
            fom: new Date('01/01/20'),
            tom: new Date('06/01/20'),
            reisetilskudd: false,
        },
    ];

    const expected: Periode[] = [
        {
            fom: new Date('01/22/17'),
            tom: new Date('01/01/20'),
            reisetilskudd: false,
        },
        {
            fom: new Date('12/12/19'),
            tom: new Date('01/01/20'),
            reisetilskudd: false,
        },
        {
            fom: new Date('01/01/20'),
            tom: new Date('06/01/20'),
            reisetilskudd: false,
        },
    ];

    const sortertePerioder = sorterPerioderEldsteFoerst(perioder);

    expect(sortertePerioder).toEqual(expected);
});
