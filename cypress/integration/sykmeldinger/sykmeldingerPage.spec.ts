/// <reference types="cypress" />
import sykmeldingApen from '../../fixtures/sykmeldinger/sykmelding-apen.json';
import sykmeldingApenPapir from '../../fixtures/sykmeldinger/sykmelding-apen-papir.json';
import sykmeldingApenEgenmeldt from '../../fixtures/sykmeldinger/sykmelding-apen-egenmeldt.json';
import sykmeldingAvvist from '../../fixtures/sykmeldinger/sykmelding-avvist.json';
import sykmeldingBekreftet from '../../fixtures/sykmeldinger/sykmelding-bekreftet.json';
import sykmeldingSendt from '../../fixtures/sykmeldinger/sykmelding-sendt.json';
import sykmeldingAvbrutt from '../../fixtures/sykmeldinger/sykmelding-avbrutt.json';
import sykmeldingAvvistBekreftet from '../../fixtures/sykmeldinger/sykmelding-avvist-bekreftet.json';
import sykmeldingUtgatt from '../../fixtures/sykmeldinger/sykmelding-utgatt.json';

describe('SykmeldingerPage: /syk/sykmeldinger', () => {
    it('Fails with error message on API error', () => {
        cy.intercept('**/api/v1/sykmeldinger', { statusCode: 500, delay: 1000 });
        cy.visit('/syk/sykmeldinger');

        cy.contains('Vi har problemer med baksystemene for øyeblikket.').should('be.visible');
    });

    it('Tom liste med sykmeldinger', () => {
        cy.intercept('**/api/v1/sykmeldinger', { body: [] });
        cy.visit('/syk/sykmeldinger');

        cy.contains('Du har ingen nye sykmeldinger');
    });

    it('Kun tidligere sykmeldinger', () => {
        cy.intercept('**/api/v1/sykmeldinger', {
            body: [
                sykmeldingBekreftet,
                sykmeldingSendt,
                sykmeldingAvbrutt,
                sykmeldingAvvistBekreftet,
                sykmeldingUtgatt,
            ],
        });
        cy.visit('/syk/sykmeldinger');

        cy.contains('Du har ingen nye sykmeldinger');
        cy.contains('Tidligere sykmeldinger');
        cy.get('.etikett').contains('Sendt til NAV');
        cy.get('.etikett').contains('Sendt til arbeidsgiver');
        cy.get('.etikett').contains('Avbrutt av deg');
        cy.get('.etikett').contains('Avvist av NAV');
        cy.get('.etikett').contains('Utgått');
    });

    it('Kun nye sykmeldinger', () => {
        cy.intercept('**/api/v1/sykmeldinger', {
            body: [sykmeldingApen, sykmeldingApenPapir, sykmeldingApenEgenmeldt, sykmeldingAvvist],
        });
        cy.visit('/syk/sykmeldinger');

        cy.contains('Du har ingen nye sykmeldinger').should('not.exist');
        cy.contains('Nye sykmeldinger');
        cy.contains('Papirsykmelding');
        cy.contains('Egenmelding');
        cy.get('.etikett').should('have.length', 1).contains('Avvist av NAV');
    });

    it('Nye og tidligere sykmeldinger', () => {
        cy.intercept('**/api/v1/sykmeldinger', {
            body: [sykmeldingApen, sykmeldingBekreftet],
        });
        cy.visit('/syk/sykmeldinger');

        cy.contains('Du har ingen nye sykmeldinger').should('not.exist');
        cy.contains('Nye sykmeldinger');
        cy.contains('Tidligere sykmeldinger');
    });
});
