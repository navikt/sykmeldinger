# Sykmeldinger

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Frontend-app for visning og behandling av enkeltsykmeldinger.

-   Laget med [Create React App](https://github.com/facebook/create-react-app)
-   Craco for konfigurasjon av utvidelser
-   Less for styling
-   Prettier er brukt lokalt i VSCode med config `.prettierrc.js`

## Environment-variabler
Alle environment-variabler som er prefix-et med `REACT_APP_` injeseres 

## Kjør lokalt
Appen består av en `/client`-mappe og en `/server`-mappe, hvor henholdsvis frontend- og node-backend-applikasjonen lever. Node-backend bruker for å serve statiske filer.

### Utvikling av frontend
```
cd client
npm install
npm start # starter development-server med hot-reloading
```

### Utvikling av Node backend 
```
cd server
npm install
npm run dev
```

## Bygg til produksjon

```
npm run build
```

Bygger statiske filer til `build`-mappen.
