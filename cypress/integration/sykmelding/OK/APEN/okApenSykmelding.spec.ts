/// <reference types="cypress" />
import sykmeldingApen from '../../../../fixtures/sykmeldinger/sykmelding-apen.json';
import sykmeldingSendt from '../../../../fixtures/sykmeldinger/sykmelding-sendt.json';
import arbeidsgiverAktiv from '../../../../fixtures/arbeidsgiver/arbeidsgiver-aktiv.json';

describe('Behandlingsutfall: OK, Status: APEN', () => {
    describe('Viser feilmelding hvis brukerinformasjon ikke kan hentes', () => {
        beforeEach(() => {
            cy.intercept('**/api/v1/sykmeldinger', { body: [sykmeldingApen] });
            cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, { body: sykmeldingApen });
            cy.intercept('**/api/v1/brukerinformasjon', {
                statusCode: 404,
            });
            cy.intercept(`**/syfosoknad/api/sykmeldinger/${sykmeldingApen.id}/actions/v2/erUtenforVentetid`, {
                body: { erUtenforVentetid: false },
            });
        });

        it('Laster landingsside', () => {
            cy.visit('/syk/sykmeldinger');
            cy.contains('Sykmelding').should('be.visible');
        });

        it('Navigerer til sykmeldingen', () => {
            cy.get('.lenkepanel-container__sykmelding').click();
            cy.url().should('contain', `/syk/sykmeldinger/${sykmeldingApen.id}`);
            cy.contains('Opplysninger fra sykmeldingen');
        });

        it('Viser feilmelding og at skjema ikke kan fylles ut nå', () => {
            cy.contains(
                'Det oppsto en feil ved henting av av skjemadata. Du kan dessverre ikke ta i bruk sykmeldingen akkurat nå. Prøv igjen senere',
            );
        });
    });

    describe('Send sykmelding med aktiv arbeidsgiver uten diskresjonskode', () => {
        beforeEach(() => {
            cy.intercept('**/api/v1/sykmeldinger', { body: [sykmeldingApen] });
            cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, { body: sykmeldingApen });
            cy.intercept('**/api/v1/brukerinformasjon', {
                body: { arbeidsgivere: [arbeidsgiverAktiv], strengtFortroligAdresse: false },
            });
            cy.intercept(`**/syfosoknad/api/sykmeldinger/${sykmeldingApen.id}/actions/v2/erUtenforVentetid`, {
                body: { erUtenforVentetid: false },
            });
        });

        it('Laster landingsside', () => {
            cy.visit('/syk/sykmeldinger');
            cy.contains('Sykmelding').should('be.visible');
        });

        it('Navigerer til sykmeldingen', () => {
            cy.get('.lenkepanel-container__sykmelding').click();
            cy.url().should('contain', `/syk/sykmeldinger/${sykmeldingApen.id}`);
            cy.contains('Opplysninger fra sykmeldingen');
        });

        it('Fyller ut skjema', () => {
            cy.get('#apen-sykmelding-form').within(() => {
                cy.contains('Er opplysningene riktige').should('be.visible');
                cy.get('input[name="erOpplysnigeneRiktige.svar"][value=JA]').click({ force: true });

                cy.contains('Min arbeidssituasjon').should('be.visible');
                cy.get('input[name="arbeidssituasjon.svar"][value=ARBEIDSTAKER]').click({ force: true });

                cy.contains('Min arbeidsgiver').should('be.visible');
                cy.get(`input[name="arbeidsgiverOrgnummer.svar"][value=${arbeidsgiverAktiv.orgnummer}]`).click({
                    force: true,
                });

                cy.contains(
                    `Er det ${arbeidsgiverAktiv.naermesteLeder.navn} som skal følge deg opp på jobb mens du er syk?`,
                ).should('be.visible');
                cy.get('input[name="nyNarmesteLeder.svar"][value=JA]').click({
                    force: true,
                });
            });
        });

        it('Sender skjema', () => {
            cy.intercept('POST', `**/api/v1/sykmelding/${sykmeldingApen.id}/actions/send`).as('postSend');
            cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, { body: sykmeldingSendt });

            cy.get('button[type=submit]').contains('Send sykmelding').click();
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
                            svar: 'ARBEIDSTAKER',
                            sporsmaltekst: 'Min arbeidssituasjon',
                            svartekster:
                                '{"ARBEIDSTAKER":"Arbeidstaker","FRILANSER":"Frilanser","SELVSTENDIG_NARINGSDRIVENDE":"Selvstendig næringsdrivende","ARGBEIDSLEDIG":"Arbeidsledig","PERMITTERT":"Permittert","ANNET":"Annet"}',
                        },
                        arbeidsgiverOrgnummer: {
                            svar: arbeidsgiverAktiv.orgnummer,
                            sporsmaltekst: 'Min arbeidsgiver',
                            svartekster: `[{"navn":"${arbeidsgiverAktiv.navn}","orgnummer":"${arbeidsgiverAktiv.orgnummer}"}]`,
                        },
                        nyNarmesteLeder: {
                            svar: 'JA',
                            sporsmaltekst: `Er det ${arbeidsgiverAktiv.naermesteLeder.navn} som skal følge deg opp på jobb mens du er syk?`,
                            svartekster: '{"JA":"Ja","NEI":"Nei"}',
                        },
                    }),
                );

            cy.contains(`Sykmeldingen er sendt til`);
        });
    });

    describe('Kan ikke sende sykmelding til arbeidsgiver hvis bruker har diskresjonskode', () => {
        beforeEach(() => {
            cy.intercept('**/api/v1/sykmeldinger', { body: [sykmeldingApen] });
            cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, { body: sykmeldingApen });
            cy.intercept('**/api/v1/brukerinformasjon', {
                body: { arbeidsgivere: [], strengtFortroligAdresse: true },
            });
            cy.intercept(`**/syfosoknad/api/sykmeldinger/${sykmeldingApen.id}/actions/v2/erUtenforVentetid`, {
                body: { erUtenforVentetid: false },
            });
        });

        it('Laster landingsside', () => {
            cy.visit('/syk/sykmeldinger');
            cy.contains('Sykmelding').should('be.visible');
        });

        it('Navigerer til sykmeldingen', () => {
            cy.get('.lenkepanel-container__sykmelding').click();
            cy.url().should('contain', `/syk/sykmeldinger/${sykmeldingApen.id}`);
            cy.contains('Opplysninger fra sykmeldingen');
        });

        it('Fyller ut skjema', () => {
            cy.get('#apen-sykmelding-form').within(() => {
                cy.contains('Er opplysningene riktige').should('be.visible');
                cy.get('input[name="erOpplysnigeneRiktige.svar"][value=JA]').click({ force: true });

                cy.contains('Min arbeidssituasjon').should('be.visible');
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
});
