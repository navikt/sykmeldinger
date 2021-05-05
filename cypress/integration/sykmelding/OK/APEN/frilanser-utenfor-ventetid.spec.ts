/// <reference types="cypress" />
import sykmeldingApen from '../../../../fixtures/sykmeldinger/sykmelding-apen.json';
// import sykmeldingBekreftet from '../../../../fixtures/sykmeldinger/sykmelding-bekreftet.json';

describe('Frilanser utenfor ventetid', () => {
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
        cy.contains('Se hele sykmeldingen din').should('be.visible');
    });

    it('Fyller ut skjema', () => {
        cy.get('#apen-sykmelding-form')
            .scrollIntoView()
            .within(() => {
                cy.contains('Er opplysningene riktige').should('be.visible');
                cy.get('input[name="erOpplysnigeneRiktige.svar"][value=JA]').click({ force: true });

                cy.contains('Jeg er sykmeldt som').should('be.visible');
                cy.get('input[name="arbeidssituasjon.svar"][value=FRILANSER]').click({ force: true });

                cy.contains('Brukte du egenmelding eller noen annen sykmelding før denne datoen?').should('not.exist');
                cy.get(`input[name="harBruktEgenmelding.svar"]`).should('not.exist');

                cy.contains('Har du forsikring som gjelder for de første 16 dagene av sykefraværet?').should(
                    'not.exist',
                );
                cy.get('input[name="harForsikring.svar"]').should('not.exist');
            });
    });

    it('Sender skjema', () => {
        cy.intercept('POST', `**/api/v2/sykmelding/${sykmeldingApen.id}/send`).as('postSend');
        cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, {
            body: {
                ...sykmeldingApen,
                sykmeldingStatus: { ...sykmeldingApen.sykmeldingStatus, statusEvent: 'BEKREFTET' },
            },
        });

        cy.get('button[type=submit]').contains('Bekreft sykmelding').click();
        cy.wait('@postSend')
            .its('request.body')
            .should(
                'equal',
                JSON.stringify({
                    erOpplysnigeneRiktige: {
                        svar: 'JA',
                        sporsmaltekst: 'Er opplysningene riktige',
                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                    },
                    arbeidssituasjon: {
                        svar: 'FRILANSER',
                        sporsmaltekst: 'Jeg er sykmeldt som',
                        svartekster:
                            '{"ARBEIDSTAKER":"arbeidstaker","FRILANSER":"frilanser","SELVSTENDIG_NARINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig","PERMITTERT":"permittert","ANNET":"annet"}',
                    },
                }),
            );
    });

    it('Får riktig statusbanner', () => {
        cy.contains('Sykmeldingen er sendt til NAV');
    });
});
