import { hentDagerMellomDatoer } from './datoUtils';

it('Beregner riktig antall dager mellom to datoer', () => {
    const fom = new Date('2018-10-18');
    const tom = new Date('2018-11-01');

    const expected = 15;

    const durationInDays = hentDagerMellomDatoer(fom, tom);
    expect(durationInDays).toEqual(expected);

    const fom2 = new Date('Thu Oct 18 2018 00:00:00 GMT+0200 (Central European Summer Time)');
    const tom2 = new Date('Mon Nov 12 2018 00:00:00 GMT+0100 (Central European Standard Time)');

    // TODO: Denne skulle potensielt vært 26. Endre algoritmen til å ignorere tidsoner?
    const expected2 = 27;

    const durationInDays2 = hentDagerMellomDatoer(fom2, tom2);
    expect(durationInDays2).toEqual(expected2);

    const fom3 = new Date('2020-02-29');
    const tom3 = new Date('2020-02-29');

    const expected3 = 1;

    const durationInDays3 = hentDagerMellomDatoer(fom3, tom3);
    expect(durationInDays3).toEqual(expected3);

    const fom4 = new Date('2018-12-31');
    const tom4 = new Date('2019-01-01');

    const expected4 = 2;

    const durationInDays4 = hentDagerMellomDatoer(fom4, tom4);
    expect(durationInDays4).toEqual(expected4);
});
