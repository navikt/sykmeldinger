/// <reference types="cypress" />
import sykmeldingApen from '../../../../fixtures/sykmeldinger/sykmelding-apen.json';

describe('Uriktige opplysninger', () => {
    describe('Uriktig periode', () => {
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
                    cy.get('input[name="erOpplysningeneRiktige.svar"][value=NEI]').click({ force: true });

                    cy.contains('Hvilke opplysninger stemmer ikke?').should('be.visible');
                    cy.get('input[type=checkbox][value=PERIODE]').click({ force: true });

                    cy.contains('Jeg er sykmeldt som').should('not.exist');
                });
        });

        it('Viser feilmelding om at man ikke bruke sykmelding med uriktig periode', () => {
            cy.contains(
                'Siden du sier at perioden er feil må du be den som sykmeldte deg om å skrive en ny sykmelding.',
            );
        });

        it('Viser ikke submitknapp', () => {
            cy.get('#apen-sykmelding-form')
                .scrollIntoView()
                .within(() => {
                    cy.get('button[type=submit]').should('not.exist');
                });
        });

        it('Viser avbrytpanel', () => {
            cy.get('button').contains('Avbryt sykmelding').should('be.visible');
            cy.contains(
                'Selv om du avbryter sykmeldingen nå, har du mulighet til å gjenåpne den på et senere tidspunkt.',
            );
        });

        it('Avbryter sykmeldingen', () => {
            cy.intercept('POST', `**/api/v1/sykmelding/${sykmeldingApen.id}/actions/avbryt`).as('postAvbryt');
            cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, {
                body: {
                    ...sykmeldingApen,
                    sykmeldingStatus: { ...sykmeldingApen.sykmeldingStatus, statusEvent: 'AVBRUTT' },
                },
            });

            cy.get('button').contains('Avbryt sykmelding').click();
            cy.wait('@postAvbryt');
        });

        it('Får riktig statusbanner', () => {
            cy.contains('Sykmeldingen ble avbrutt av deg');
        });
    });

    describe('Sykmeldingsgraden er for høy', () => {
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
                    cy.get('input[name="erOpplysningeneRiktige.svar"][value=NEI]').click({ force: true });

                    cy.contains('Hvilke opplysninger stemmer ikke?').should('be.visible');
                    cy.get('input[type=checkbox][value=SYKMELDINGSGRAD_FOR_HOY]').click({ force: true });

                    cy.contains('Jeg er sykmeldt som').should('not.exist');
                });
        });

        it('Viser feilmelding om at man ikke bruke sykmelding med for høy sykmeldingsgrad', () => {
            cy.contains(
                'Siden du sier at sykmeldingsgraden er for høy er feil må du be den som sykmeldte deg om å skrive en ny sykmelding.',
            );
        });

        it('Viser ikke submitknapp', () => {
            cy.get('#apen-sykmelding-form')
                .scrollIntoView()
                .within(() => {
                    cy.get('button[type=submit]').should('not.exist');
                });
        });

        it('Viser avbrytpanel', () => {
            cy.get('button').contains('Avbryt sykmelding').should('be.visible');
            cy.contains(
                'Selv om du avbryter sykmeldingen nå, har du mulighet til å gjenåpne den på et senere tidspunkt.',
            );
        });

        it('Avbryter sykmeldingen', () => {
            cy.intercept('POST', `**/api/v1/sykmelding/${sykmeldingApen.id}/actions/avbryt`).as('postAvbryt');
            cy.intercept(`**/api/v1/sykmeldinger/${sykmeldingApen.id}`, {
                body: {
                    ...sykmeldingApen,
                    sykmeldingStatus: { ...sykmeldingApen.sykmeldingStatus, statusEvent: 'AVBRUTT' },
                },
            });

            cy.get('button').contains('Avbryt sykmelding').click();
            cy.wait('@postAvbryt');
        });

        it('Får riktig statusbanner', () => {
            cy.contains('Sykmeldingen ble avbrutt av deg');
        });
    });

    describe('Sykmeldingsgraden er for lav', () => {
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
                    cy.get('input[name="erOpplysningeneRiktige.svar"][value=NEI]').click({ force: true });

                    cy.contains('Hvilke opplysninger stemmer ikke?').should('be.visible');
                    cy.get('input[type=checkbox][value=SYKMELDINGSGRAD_FOR_LAV]').click({ force: true });

                    cy.contains('Jeg er sykmeldt som').should('be.visible');
                });
        });

        it('Viser infomelding om at man kan bruke en sykmelding med for lav sykmeldingsgrad', () => {
            cy.contains(
                'Du kan fortsatt bruke sykmeldingen. Hvis du ender opp med å jobbe mer enn graden på sykmeldingen sier du fra om det ved utfyllingen av søknaden.',
            );
        });

        it('Viser submitknapp', () => {
            cy.get('#apen-sykmelding-form')
                .scrollIntoView()
                .within(() => {
                    cy.get('button[type=submit]').should('be.visible');
                });
        });
    });

    describe('Uriktig arbeisdgiver', () => {
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
                    cy.get('input[name="erOpplysningeneRiktige.svar"][value=NEI]').click({ force: true });

                    cy.contains('Hvilke opplysninger stemmer ikke?').should('be.visible');
                    cy.get('input[type=checkbox][value=ARBEIDSGIVER]').click({ force: true });

                    cy.contains('Jeg er sykmeldt som').should('be.visible');
                });
        });

        it('Viser infomelding om at man kan bruke en sykmelding med for lav sykmeldingsgrad', () => {
            cy.contains('Du kan fortsatt bruke sykmeldingen.');
        });

        it('Viser submitknapp', () => {
            cy.get('#apen-sykmelding-form')
                .scrollIntoView()
                .within(() => {
                    cy.get('button[type=submit]').should('be.visible');
                });
        });
    });

    describe('Uriktig diagnose', () => {
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
                    cy.get('input[name="erOpplysningeneRiktige.svar"][value=NEI]').click({ force: true });

                    cy.contains('Hvilke opplysninger stemmer ikke?').should('be.visible');
                    cy.get('input[type=checkbox][value=DIAGNOSE]').click({ force: true });

                    cy.contains('Jeg er sykmeldt som').should('be.visible');
                });
        });

        it('Viser infomelding om at man kan bruke en sykmelding med for lav sykmeldingsgrad', () => {
            cy.contains('Du kan fortsatt bruke sykmeldingen.');
        });

        it('Viser submitknapp', () => {
            cy.get('#apen-sykmelding-form')
                .scrollIntoView()
                .within(() => {
                    cy.get('button[type=submit]').should('be.visible');
                });
        });
    });

    describe('Andre opplysninger er uriktige', () => {
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
                    cy.get('input[name="erOpplysningeneRiktige.svar"][value=NEI]').click({ force: true });

                    cy.contains('Hvilke opplysninger stemmer ikke?').should('be.visible');
                    cy.get('input[type=checkbox][value=ANDRE_OPPLYSNINGER]').click({ force: true });

                    cy.contains('Jeg er sykmeldt som').should('be.visible');
                });
        });

        it('Viser infomelding om at man kan bruke en sykmelding med for lav sykmeldingsgrad', () => {
            cy.contains('Du kan fortsatt bruke sykmeldingen.');
        });

        it('Viser submitknapp', () => {
            cy.get('#apen-sykmelding-form')
                .scrollIntoView()
                .within(() => {
                    cy.get('button[type=submit]').should('be.visible');
                });
        });
    });
});
