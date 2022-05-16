# Sykmeldinger 📝

Frontend for visning og behandling av sykmeldinger.

Lever under:

-   prod-gcp: https://www.nav.no/syk/sykmeldinger
-   dev-gcp: https://www-gcp.dev.nav.no/syk/sykmeldinger
-   labs-gcp (demo): https://sykmeldinger.labs.nais.io/syk/sykmeldinger/

Tekniske valg:

-   NextJS
-   React-query for håndtering av server state.
-   zod for validering av "ukjent" data fra diverse API.
-   react-testing-library for enhetstesting av enkeltkomponenter.

## Kjør lokalt

```bash
yarn
```

```bash
yarn start
```

## Test-miljø

[www-gcp.dev.nav.no/syk/sykmeldinger](www-gcp.dev.nav.no/syk/sykmeldinger) nås lokalt dersom man er pålogget Naisdevice.
