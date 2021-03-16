<!-- generated by mermaid compile action - START -->
![~mermaid diagram 1~](/.diagrams/form-state-md-1.png)
<details>
  <summary>Mermaid markup</summary>

```mermaid
graph TB
    %% STATES
    OK_APEN[åpen sykmelding]
    OPPLYSNINGER{ Er opplysningene <br/> riktige? }
    SYKMELDT_FRA{ Mitt arbeidsforhold <br/> for denne sykmeldingen}
    URIKTIGE_OPPLYSNINGER{ Hvilke opplysniger <br/> er ikke riktige? }
    VELG_ARBEIDSGIVER{ Velg arbeidsgiver }
    UTENFOR_VENTETID{ Utenfor ventetiden? }
    NAERMESTE_LEDER{ Er det NL som skal <br/> følge deg opp på <br/> jobben når du er syk? }
    UTENFOR_AG_PERIODE{ Utenfor arb.g. periode? }
    EGENMELDINGSDAGER{ Brukte du <br/>egenmeldingsdager <br/> før dato? }
    BEKREFT( Bekreft sykmeldingen )
    SEND( Send sykmeldingen)
    NY_PERIODE{Legg til <br/> periode?}
    AVBRYT( Avbryt sykmeldingen)
    FORSIKRING{Har du foriskring <br/> som gjelder for <br/> de første 16 dagene <br/> av sykefraværet?}

    OK_APEN --> OPPLYSNINGER;

    OPPLYSNINGER -->|Ja| SYKMELDT_FRA
    OPPLYSNINGER -->|Nei| URIKTIGE_OPPLYSNINGER

    URIKTIGE_OPPLYSNINGER -->|Sykmeldingsgraden <br/> er for høy| SYKMELDT_FRA
    URIKTIGE_OPPLYSNINGER -->|Arbeidsgiver| SYKMELDT_FRA
    URIKTIGE_OPPLYSNINGER -->|Diagnose| SYKMELDT_FRA
    URIKTIGE_OPPLYSNINGER -->|Andre opplysninger| SYKMELDT_FRA
    URIKTIGE_OPPLYSNINGER -->|Periode| AVBRYT
    URIKTIGE_OPPLYSNINGER -->|Sykmeldingsgraden <br/> er for lav| AVBRYT

    SYKMELDT_FRA -->|Arbeidstaker| VELG_ARBEIDSGIVER
    SYKMELDT_FRA -->|Selvstendig næringsdrivende| UTENFOR_VENTETID
    SYKMELDT_FRA -->|Frilanser| UTENFOR_VENTETID
    SYKMELDT_FRA -->|Arbeidsledig| BEKREFT
    SYKMELDT_FRA -->|Permittert| BEKREFT
    SYKMELDT_FRA -->|Jeg finner ingenting <br/> som passer for meg| BEKREFT

    VELG_ARBEIDSGIVER -->|Ingen arbeidsforhold| AVBRYT;
    VELG_ARBEIDSGIVER --> NAERMESTE_LEDER;
    NAERMESTE_LEDER --> UTENFOR_AG_PERIODE

    UTENFOR_VENTETID -->|Nei| EGENMELDINGSDAGER
    UTENFOR_VENTETID -->|Ja| BEKREFT

    EGENMELDINGSDAGER -->|Ja| FOM
    EGENMELDINGSDAGER -->|Nei| FORSIKRING

    subgraph Egenmeldingsdager
    %% STATES
    FOM[Velg FOM]
    TOM[Velg TOM]

    FOM --> TOM --> NY_PERIODE -->|Ja| FOM
    end

    NY_PERIODE -->|"Nei (arb.g.)"| SEND
    NY_PERIODE -->|Nei| FORSIKRING

    FORSIKRING --> BEKREFT

    UTENFOR_AG_PERIODE -->|Ja| SEND
    UTENFOR_AG_PERIODE -->|Nei| EGENMELDINGSDAGER

    style AVBRYT fill:#de7a7a
    style BEKREFT fill:#7ade82
    style SEND fill:#7ade82
    style UTENFOR_VENTETID stroke:#f66,stroke-width:2px,stroke-dasharray: 5 5
    style UTENFOR_AG_PERIODE stroke:#f66,stroke-width:2px,stroke-dasharray: 5 5
```

</details>
<!-- generated by mermaid compile action - END -->