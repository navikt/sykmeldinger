```mermaid
stateDiagram-v2
    [*] --> Sykmeldingliste: /sykmeldinger
    [*] --> Sykmeldingvisning: /sykmeldinger/{sykmeldingId}
    Sykmeldingliste --> Sykmeldingvisning: /sykmeldinger/{sykmeldingId}
    Sykmeldingvisning --> Sykmeldingliste: /sykmeldinger

    state Sykmeldingvisning {
        state BEHANDLINGSUTFALL <<fork>>
        state OK_STATUS <<fork>>
        state INVALID_STATUS <<fork>>

        [*] --> BEHANDLINGSUTFALL
        BEHANDLINGSUTFALL --> OK_STATUS: Behandlingsutfall OK
        BEHANDLINGSUTFALL --> INVALID_STATUS: Behandlingsutfall INVALID

        OK_STATUS --> OK_APEN: Status APEN
        OK_STATUS --> OK_SENDT: Status SENDT
        OK_STATUS --> OK_BEKREFTET: Status BEKREFTET
        OK_STATUS --> OK_AVBRUTT: Status AVBRUTT
        OK_STATUS --> OK_UTGATT: Status UTGATT

        INVALID_STATUS --> INVALID_APEN: Status APEN
        INVALID_STATUS --> INVALID_BEKREFTET: Status BEKREFTET

        OK_BEKREFTET --> OK_APEN: gjenapne()
        OK_AVBRUTT --> OK_APEN: gjenapne()

        OK_APEN --> OK_BEKREFTET: bekreft()
        OK_APEN --> OK_AVBRUTT: avbryt()
        OK_APEN --> OK_SENDT: send()

        INVALID_APEN --> INVALID_BEKREFTET: bekreft()

        state OK_APEN {
            state KODE6 <<fork>>
            state ARBEIDSGIVER <<fork>>
            state BEKREFT <<join>>
            state AVBRYT <<join>>

            [*] --> KODE6
            KODE6 --> OK_APEN_KODE6: Strengt fortrolig adresse
            KODE6 --> ARBEIDSGIVER: Ikke strengt fortrolig adresse

            ARBEIDSGIVER --> OK_APEN_ARBEIDSGIVER: Har arbeidsgiver
            ARBEIDSGIVER --> OK_APEN_DEFAULT: Har ikke arbeidsgiver

            OK_APEN_KODE6 --> BEKREFT
            OK_APEN_ARBEIDSGIVER --> BEKREFT
            OK_APEN_DEFAULT --> BEKREFT

            OK_APEN_KODE6 --> AVBRYT
            OK_APEN_ARBEIDSGIVER --> AVBRYT
            OK_APEN_DEFAULT --> AVBRYT

            BEKREFT --> [*]: bekreft()
            AVBRYT --> [*]: avbryt()
            OK_APEN_ARBEIDSGIVER --> [*]: send()
        }
    }
```