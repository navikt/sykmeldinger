/// <reference types="cypress" />
import sykmeldingApen from '../../../../fixtures/sykmeldinger/sykmelding-apen.json';

describe('Arbeidstaker med diskresjonskode', () => {
    beforeEach(() => {
        cy.intercept('**/api/v1/sykmeldinger', { body: [sykmeldingApen] });
        cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, { body: sykmeldingApen }).as('sykmelding');
        cy.intercept('**/api/v1/brukerinformasjon', {
            body: { arbeidsgivere: [], strengtFortroligAdresse: true },
        }).as('brukerinformasjon');
        cy.intercept(`**/syfosoknad/api/sykmeldinger/${sykmeldingApen.id}/actions/v2/erUtenforVentetid`, {
            body: { erUtenforVentetid: false },
        }).as('ventetid');
    });

    it('Laster landingsside', () => {
        cy.visit('/syk/sykmeldinger');
        cy.contains('Sykmelding').should('be.visible');
    });

    it('Navigerer til sykmeldingen', () => {
        cy.get('.lenkepanel-container__sykmelding').click();
        cy.url().should('contain', `/syk/sykmeldinger/${sykmeldingApen.id}`);
        cy.wait('@sykmelding');
        cy.wait('@brukerinformasjon');
        cy.wait('@ventetid');
    });

    it('Viser opplysninger fra sykmeldingen', () => {
        cy.contains('Se hele sykmeldingen din').should('be.visible');
    });

    it('Fyller ut skjema', () => {
        cy.get('#apen-sykmelding-form').within(() => {
            cy.contains('Er opplysningene riktige').should('be.visible');
            cy.get('input[name="erOpplysnigeneRiktige.svar"][value=JA]').click({ force: true });

            cy.contains('Jeg er sykmeldt som').should('be.visible');
            cy.get('input[name="arbeidssituasjon.svar"][value=ARBEIDSTAKER]').click({ force: true });
        });
    });

    it('Får feilmelding om at sykmelding ikke kan sendes til arbeidsgiver pga strengt fortrolig adresse', () => {
        cy.contains(
            'Du er registrert med adressesperre strengt fortrolig. Du kan derfor ikke sende sykmeldingen til arbeidsgiveren din fra nav.no.',
        );
    });

    it('Viser ikke arbeidsgiverspørsmål', () => {
        cy.contains('Min arbeidsgiver').should('not.exist');
    });

    it('Viser ikke submit-knapp', () => {
        cy.get('button[type=submit]').contains('Send sykmelding').should('not.exist');
    });
});
