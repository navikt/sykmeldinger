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

### Tilgang til Github Package Registry

Siden vi bruker avhengigheter som ligger i GPR, så må man sette opp tilgang til GPR med en PAT (personal access token) som har `read:packages`. Du kan [opprette PAT her](https://github.com/settings/tokens). Dersom du har en PAT som du bruker for tilgang til maven-packages i github kan du gjenbruke denne.

I din `.bashrc` eller `.zshrc`, sett følgende miljøvariabel:

`export NPM_AUTH_TOKEN=<din PAT med read:packages>`

### Kjør appen

Installer avhengigheter, dette trenger du kun å gjøre når avhengigheter endrer seg:

```bash
yarn
```

Kjør appen i utviklingsmodus:

```bash
yarn start
```

## Test-miljø

[www-gcp.dev.nav.no/syk/sykmeldinger](www-gcp.dev.nav.no/syk/sykmeldinger) nås lokalt dersom man er pålogget Naisdevice.
