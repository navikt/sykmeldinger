import { getDuration } from './datoUtils';

it('Beregner riktig antall dager mellom to datoer', () => {
    const fom = new Date('2018-10-18');
    const tom = new Date('2018-11-01');

    const expected = 15;

    const durationInDays = getDuration(fom, tom);

    expect(durationInDays).toEqual(expected);
});
