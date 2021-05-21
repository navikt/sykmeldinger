/// <reference types="cypress" />
import sykmeldingAvvist from '../../../../fixtures/sykmeldinger/sykmelding-avvist.json';

describe('Bekreft avvist sykmelding som lest', () => {
    beforeEach(() => {
        cy.intercept('**/api/v1/sykmeldinger', { body: [sykmeldingAvvist] });
        cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingAvvist.id}`, { body: sykmeldingAvvist }).as('sykmelding');
    });

    it('Laster landingsside', () => {
        cy.visit('/syk/sykmeldinger');
        cy.contains('Sykmelding').should('be.visible');
    });

    it('Navigerer til sykmeldingen', () => {
        cy.get('.lenkepanel-container__sykmelding').click();
        cy.url().should('contain', `/syk/sykmeldinger/${sykmeldingAvvist.id}`);
        cy.wait('@sykmelding');
    });

    it('Opplyser om avvisningsgrunn(er)', () => {
        sykmeldingAvvist.behandlingsutfall.ruleHits.forEach((regel) => {
            cy.contains(regel.messageForUser).should('be.visible');
        });
    });

    it('Viser sykmeldingsopplysninger', () => {
        cy.contains('Din sykmelding');
    });

    it('Får feilmelding ved å bekrefte uten å ha trykket på checkbox', () => {
        cy.get('form').within(() => {
            cy.get('button[type=submit]').contains('Bekreft').click();
            cy.contains('Du må bekrefte at du har lest at sykmeldingen er avvist').should('be.visible');
        });
    });

    it('Feilmelding forsvinner når man retter feilen', () => {
        cy.get('form').within(() => {
            cy.contains('Jeg bekrefter at jeg har lest at sykmeldingen er avvist').should('be.visible');
            cy.get('input[type=checkbox]').check({ force: true }).should('be.checked');
            cy.contains('Du må bekrefte at du har lest at sykmeldingen er avvist').should('not.exist');
        });
    });

    it('Bekrefter lest', () => {
        cy.intercept('POST', `**/api/v1/sykmeldinger/${sykmeldingAvvist.id}/bekreftAvvist`).as('postBekreft');
        cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingAvvist.id}`, {
            body: {
                ...sykmeldingAvvist,
                sykmeldingStatus: { ...sykmeldingAvvist.sykmeldingStatus, statusEvent: 'BEKREFTET' },
            },
        });

        cy.get('form').within(() => {
            cy.get('button[type=submit]').contains('Bekreft').click();
        });

        cy.wait('@postBekreft');
    });

    it('Får riktig statusbanner', () => {
        cy.contains('Du bekreftet at du har lest at sykmeldingen er avvist').should('be.visible');
    });
});
