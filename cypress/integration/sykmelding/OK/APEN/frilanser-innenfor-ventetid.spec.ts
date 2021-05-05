/// <reference types="cypress" />
import sykmeldingApen from '../../../../fixtures/sykmeldinger/sykmelding-apen.json';
import sykmeldingBekreftet from '../../../../fixtures/sykmeldinger/sykmelding-bekreftet.json';

describe('Frilanser innenfor ventetid', () => {
    beforeEach(() => {
        cy.intercept('**/api/v1/sykmeldinger', { body: [sykmeldingApen] });
        cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, { body: sykmeldingApen }).as('sykmelding');
        cy.intercept('**/api/v1/brukerinformasjon', {
            body: { arbeidsgivere: [], strengtFortroligAdresse: false },
        }).as('brukerinformasjon');
        cy.intercept(`**/syfosoknad/api/sykmeldinger/${sykmeldingApen.id}/actions/v2/erUtenforVentetid`, {
            body: { erUtenforVentetid: false, oppfolgingsdato: '2021-04-20' },
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

                cy.contains('Brukte du egenmelding eller noen annen sykmelding før denne datoen?').should('be.visible');
                cy.get(`input[name="harBruktEgenmelding.svar"][value=JA]`).click({ force: true });

                cy.contains('Hvilke dager var du borte fra jobb').should('be.visible');
                cy.get('.egenmeldingsperiode__fom').within(() => {
                    cy.get('.nav-datovelger__kalenderknapp').click();
                    cy.get('.DayPicker-Day').contains('5').click();
                });
                cy.get('.egenmeldingsperiode__tom').within(() => {
                    cy.get('.nav-datovelger__kalenderknapp').click();
                    cy.get('.DayPicker-Day').contains('9').click();
                });

                cy.contains('Har du forsikring som gjelder for de første 16 dagene av sykefraværet?').should(
                    'be.visible',
                );
                cy.get('input[name="harForsikring.svar"][value=JA]').click({ force: true });
            });
    });

    it('Sender skjema', () => {
        cy.intercept('POST', `**/api/v2/sykmeldinger/${sykmeldingApen.id}/send`).as('postSend');
        cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, { body: sykmeldingBekreftet });

        cy.get('button[type=submit]').contains('Bekreft sykmelding').click();
        cy.wait('@postSend')
            .its('request.body')
            .should('deep.equal', {
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
                harBruktEgenmelding: {
                    svar: 'JA',
                    sporsmaltekst:
                        'Vi har registrert at du ble syk 20. april 2021. Brukte du egenmelding eller noen annen sykmelding før denne datoen?',
                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
                },
                harForsikring: {
                    svar: 'JA',
                    sporsmaltekst: 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
                },
                egenmeldingsperioder: {
                    sporsmaltekst: 'Hvilke dager var du borte fra jobb før 20. april 2021.',
                    svartekster: '"Fom, Tom"',
                    svar: [{ fom: '2021-04-05', tom: '2021-04-09' }],
                },
            });
    });

    it('Får riktig statusbanner', () => {
        cy.contains(`Sykmeldingen er sendt til NAV`);
    });
});
