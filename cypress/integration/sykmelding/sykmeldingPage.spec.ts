/// <reference types="cypress" />

describe('SykmeldingPage: /syk/sykmelding/{sykmeldingId}', () => {
    it('Fails with error message on API error', () => {
        cy.intercept('**/api/v1/sykmeldinger/test', { statusCode: 500, delay: 500 });
        cy.visit('/syk/sykmeldinger/test');
        cy.contains('Beklager, vi har problemer med baksystemene for øyeblikket.').should('be.visible');
    });
});
