import { KontaktMedPasient, AnnenFraversArsak } from '../types/sykmelding';

describe('sykmelding', () => {
    it('Parser kontaktmedPasient ', () => {
        const obj = {
            kontaktDato: '10-02-2020',
            begrunnelseIkkeKontakt: 'Kunne ikke',
        };
        const kontaktMedPasient = new KontaktMedPasient(obj);
        expect(kontaktMedPasient).toBeTruthy();
    });

    it('Parser kontaktmedPasient når begrunnelse mangler', () => {
        const ojb = {
            kontaktDato: '10-02-2020',
        };
        const kontaktMedPasient = new KontaktMedPasient(ojb);
        expect(kontaktMedPasient).toBeTruthy();
    });

    it('Annenfraversarask', () => {
        const obj = {
            beskrivelse: 'Helt ok',
            grunn: ['GODKJENT_HELSEINSTITUSJON', 'MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND'],
        };
        const annnefravaersArsak = new AnnenFraversArsak(obj);
        expect(annnefravaersArsak.grunn).toEqual([
            'Når vedkommende er innlagt i en godkjent helseinstitusjon',
            'Når vedkommende på grunn av sykdom, skade eller lyte får tilskott når vedkommende på grunn av sykdom, skade eller lyte får tilskott',
        ]);
        expect(annnefravaersArsak.beskrivelse).toEqual('Helt ok');
    });
});
