# Sykmeldinger

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Frontend-app for visning og behandling av enkeltsykmeldinger.

-   Laget med [Create React App](https://github.com/facebook/create-react-app)
-   Craco for konfigurasjon av utvidelser
-   Less for styling
-   Prettier er brukt lokalt i VSCode med config `.prettierrc.js`

![State diagram][state-diagram-mermaid.png]

## Environment-variabler

Alle environment-variabler som er prefix-et med `REACT_APP_` injiseres i koden ved bygging av frontend. For utvikling lokalt settes disse i `./client/.env` (opprett fil selv), mens for bygg til dev, prod og gcp settes de i `./github/workflows/deploy-*.yml`. Liste over environment variabler som må settes:

-   REACT_APP_IS_GCP_LABS # Set only for instance running on gcp-labs
-   REACT_APP_SYKEFRAVAER_ROOT
-   REACT_APP_SYKMELDINGER_ROOT
-   REACT_APP_LOGINSERVICE_URL
-   REACT_APP_SM_REGISTER_URL
-   REACT_APP_SYFOREST_ROOT

Ved mangler i denne listen, gjør et søk i koden etter `REACT_APP_`

## Kjør lokalt

Appen består av en `./client/`-mappe og en `./server/`-mappe, hvor henholdsvis frontend- og node-backend-applikasjonen lever. Node-backend bruker for å serve statiske filer.

### Utvikling av frontend

```bash
cd client
npm install
npm start # starter development-server med hot-reloading
```

### Utvikling av Node backend

```bash
cd server
npm install
npm run dev # Starter Nodemon med hot-reloading
```

## Bygg til produksjon

### Produksjonsbygg av frontend

```bash
cd client
npm run build
```

Bygger statiske filer til `./client/build/`-mappen.

### Produksjonsbygg av Node backend

```bash
cd client
npm run build
```

Bygger statiske filer til `./server/build/`-mappen.
