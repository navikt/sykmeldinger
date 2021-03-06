/// <reference types="cypress" />
import sykmeldingApen from '../../../../fixtures/sykmeldinger/sykmelding-apen.json';
import sykmeldingBekreftet from '../../../../fixtures/sykmeldinger/sykmelding-bekreftet.json';

describe('Selvstendig næringsdrivende utenfor ventetid', () => {
    beforeEach(() => {
        cy.intercept('**/api/v1/sykmeldinger', { body: [sykmeldingApen] });
        cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, { body: sykmeldingApen }).as('sykmelding');
        cy.intercept('**/api/v1/brukerinformasjon', {
            body: { arbeidsgivere: [], strengtFortroligAdresse: false },
        }).as('brukerinformasjon');
        cy.intercept(`**/syfosoknad/api/sykmeldinger/${sykmeldingApen.id}/actions/v2/erUtenforVentetid`, {
            body: { erUtenforVentetid: true },
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
        cy.contains('Din sykmelding').should('be.visible');
    });

    it('Fyller ut skjema', () => {
        cy.get('#apen-sykmelding-form')
            .scrollIntoView()
            .within(() => {
                cy.contains('Er opplysningene riktige?').should('be.visible');
                cy.get('input[name="erOpplysningeneRiktige.svar"][value=JA]').click({ force: true });

                cy.contains('Jeg er sykmeldt som').should('be.visible');
                cy.get('input[name="arbeidssituasjon.svar"][value=NAERINGSDRIVENDE]').click({
                    force: true,
                });

                cy.contains('Brukte du egenmelding eller noen annen sykmelding før denne datoen?').should('not.exist');
                cy.get(`input[name="harBruktEgenmelding.svar"]`).should('not.exist');

                cy.contains('Har du forsikring som gjelder for de første 16 dagene av sykefraværet?').should(
                    'not.exist',
                );
                cy.get('input[name="harForsikring.svar"]').should('not.exist');
            });
    });

    it('Sender skjema', () => {
        cy.intercept('POST', `**/api/v2/sykmeldinger/${sykmeldingApen.id}/send`, { statusCode: 203 }).as('postSend');
        cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, { body: sykmeldingBekreftet });

        cy.get('button[type=submit]').contains('Bekreft sykmelding').click();
        cy.wait('@postSend')
            .its('request.body')
            .should('deep.equal', {
                erOpplysningeneRiktige: {
                    svar: 'JA',
                    sporsmaltekst: 'Er opplysningene riktige?',
                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
                },
                arbeidssituasjon: {
                    svar: 'NAERINGSDRIVENDE',
                    sporsmaltekst: 'Jeg er sykmeldt som',
                    svartekster:
                        '{"ARBEIDSTAKER":"arbeidstaker","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig eller permittert","ANNET":"annet"}',
                },
            });
    });

    it('Får riktig statusbanner', () => {
        cy.contains('Sykmeldingen ble sendt til NAV');
    });
});
