/// <reference types="cypress" />
import sykmeldingApen from '../../../../fixtures/sykmeldinger/sykmelding-apen.json';
import sykmeldingSendt from '../../../../fixtures/sykmeldinger/sykmelding-sendt.json';
import arbeidsgiverAktiv from '../../../../fixtures/arbeidsgiver/arbeidsgiver-aktiv.json';

describe('Arbeidstaker med aktiv arbeidsgiver uten diskresjonskode', () => {
    beforeEach(() => {
        cy.intercept('**/api/v1/sykmeldinger', { body: [sykmeldingApen] });
        cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, { body: sykmeldingApen }).as('sykmelding');
        cy.intercept('**/api/v1/brukerinformasjon', {
            body: { arbeidsgivere: [arbeidsgiverAktiv], strengtFortroligAdresse: false },
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
        cy.get('#apen-sykmelding-form')
            .scrollIntoView()
            .within(() => {
                cy.contains('Er opplysningene riktige').should('be.visible');
                cy.get('input[name="erOpplysningeneRiktige.svar"][value=JA]').click({ force: true });

                cy.contains('Jeg er sykmeldt som').should('be.visible');
                cy.get('input[name="arbeidssituasjon.svar"][value=ARBEIDSTAKER]').click({ force: true });

                cy.contains('Min arbeidsgiver').should('be.visible');
                cy.get(`input[name="arbeidsgiverOrgnummer.svar"][value=${arbeidsgiverAktiv.orgnummer}]`).click({
                    force: true,
                });

                cy.contains(
                    `Er det ${arbeidsgiverAktiv.naermesteLeder.navn} som skal følge deg opp på jobben mens du er syk?`,
                ).should('be.visible');
                cy.get('input[name="nyNarmesteLeder.svar"][value=JA]').click({
                    force: true,
                });
            });
    });

    it('Sender skjema', () => {
        cy.intercept('POST', `**/api/v2/sykmeldinger/${sykmeldingApen.id}/send`).as('postSend');
        cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, { body: sykmeldingSendt });

        cy.get('button[type=submit]').contains('Send sykmelding').click();
        cy.wait('@postSend')
            .its('request.body')
            .should('deep.equal', {
                erOpplysningeneRiktige: {
                    svar: 'JA',
                    sporsmaltekst: 'Er opplysningene riktige',
                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
                },
                arbeidssituasjon: {
                    svar: 'ARBEIDSTAKER',
                    sporsmaltekst: 'Jeg er sykmeldt som',
                    svartekster:
                        '{"ARBEIDSTAKER":"arbeidstaker","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig","PERMITTERT":"permittert","ANNET":"annet"}',
                },
                arbeidsgiverOrgnummer: {
                    svar: arbeidsgiverAktiv.orgnummer,
                    sporsmaltekst: 'Min arbeidsgiver',
                    svartekster: `[{"navn":"${arbeidsgiverAktiv.navn}","orgnummer":"${arbeidsgiverAktiv.orgnummer}"}]`,
                },
                nyNarmesteLeder: {
                    svar: 'JA',
                    sporsmaltekst: `Er det ${arbeidsgiverAktiv.naermesteLeder.navn} som skal følge deg opp på jobben mens du er syk?`,
                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
                },
            });
    });

    it('Får riktig statusbanner', () => {
        cy.contains(`Sykmeldingen ble sendt til`);
    });
});
