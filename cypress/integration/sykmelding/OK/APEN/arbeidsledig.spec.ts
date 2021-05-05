/// <reference types="cypress" />
import sykmeldingApen from '../../../../fixtures/sykmeldinger/sykmelding-apen.json';

describe('Arbeidsledig', () => {
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
                cy.get('input[name="arbeidssituasjon.svar"][value=ARBEIDSLEDIG]').click({ force: true });
            });
    });

    it('Sender skjema', () => {
        cy.intercept('POST', `**/api/v2/sykmelding/${sykmeldingApen.id}/actions/send`).as('postSend');
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
                        svar: 'ARBEIDSLEDIG',
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
