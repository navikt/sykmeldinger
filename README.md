# Sykmeldinger 📝

Frontend for visning og behandling av sykmeldinger.

Lever under:

-   prod-gcp: https://www.nav.no/syk/sykmeldinger
-   dev-gcp: https://www-gcp.dev.nav.no/syk/sykmeldinger
-   labs-gcp (demo): https://sykmeldinger.labs.nais.io/syk/sykmeldinger/

Tekniske valg:

-   NextJS
-   apollo-server for GraphQL API.
-   apollo-client for håndtering av fetching og server state.
-   zod for validering av "ukjent" data fra diverse API.
-   react-testing-library for enhetstesting av enkeltkomponenter.

Data-flyt:

```mermaid
graph TD
  browser[Browser] --> apollo
  subgraph next[NextJS App]
    apollo[Apollo Server] --> gql
    gql[GraphQL resolvers] --> ss.ts & fs.ts
  end
  ss.ts[sykmeldingerService.ts] --> sb
  fs.ts[flesService.ts] --> fg
  subgraph ext[External Services]
    sb[sykmeldinger-backend]
    fg[flex-gateway]
  end
```

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
