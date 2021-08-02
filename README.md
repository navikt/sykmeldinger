# Sykmeldinger 📝

Frontend for visning og behandling av sykmeldinger.

Lever under:

-   prod-gcp: https://www.nav.no/syk/sykmeldinger
-   dev-gcp: https://www-gcp.dev.nav.no/syk/sykmeldinger
-   labs-gcp (demo): https://sykmeldinger.labs.nais.io/syk/sykmeldinger/

Tekniske valg:

-   Laget med [Create React App](https://github.com/facebook/create-react-app)
-   Craco for konfigurasjon av utvidelser slik at man kan bruke craco-less for kompilering av less-filer. Dette fordi designbiblioteket bruker Less til styling.
-   React-query for håndtering av server state.
-   Class-validator for validering av "ukjent" data fra diverse API.
-   React-testing-library for enhetstesting av enkeltkomponenter.

## Environment-variabler

Environment-variable settes på `window._env_` i brukerens browser via scriptet `/env-config.js`. Her blir variable som er definert i `.env`-filen ved root av dette repoet hentet fra environment variablene definert i poden. På denne holder det å bygge ett docker image selv om det skal deployes til flere miljøer. Se `nais-*.yaml` i root for finne ut hvilke varible som er satt i forskjellige miljø.

## Kjør lokalt

```bash
npm run dev
```

## Test-miljø

[www-gcp.dev.nav.no/syk/sykmeldinger](www-gcp.dev.nav.no/syk/sykmeldinger) nås lokalt dersom man er pålogget Naisdevice.
