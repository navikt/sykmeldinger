import { z } from 'zod';

import { LocalDateSchema } from '../date';

const DiagnoseSchema = z.object({
    kode: z.string(),
    system: z.string(),
    tekst: z.string().nullable(),
});

export enum AnnenFraverGrunn {
    GODKJENT_HELSEINSTITUSJON = 'GODKJENT_HELSEINSTITUSJON',
    BEHANDLING_FORHINDRER_ARBEID = 'BEHANDLING_FORHINDRER_ARBEID',
    ARBEIDSRETTET_TILTAK = 'ARBEIDSRETTET_TILTAK',
    MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND = 'MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND',
    NODVENDIG_KONTROLLUNDENRSOKELSE = 'NODVENDIG_KONTROLLUNDENRSOKELSE',
    SMITTEFARE = 'SMITTEFARE',
    ABORT = 'ABORT',
    UFOR_GRUNNET_BARNLOSHET = 'UFOR_GRUNNET_BARNLOSHET',
    DONOR = 'DONOR',
    BEHANDLING_STERILISERING = 'BEHANDLING_STERILISERING',
}

function annenFraverGrunnToText(value: AnnenFraverGrunn): string {
    switch (value) {
        case AnnenFraverGrunn.GODKJENT_HELSEINSTITUSJON:
            return 'Når vedkommende er innlagt i en godkjent helseinstitusjon';
        case AnnenFraverGrunn.BEHANDLING_FORHINDRER_ARBEID:
            return 'Når vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider';
        case AnnenFraverGrunn.ARBEIDSRETTET_TILTAK:
            return 'Når vedkommende deltar på et arbeidsrettet tiltak';
        case AnnenFraverGrunn.MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND:
            return 'Når vedkommende på grunn av sykdom, skade eller lyte får tilskott når vedkommende på grunn av sykdom, skade eller lyte får tilskott';
        case AnnenFraverGrunn.NODVENDIG_KONTROLLUNDENRSOKELSE:
            return 'Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet';
        case AnnenFraverGrunn.SMITTEFARE:
            return 'Når vedkommende myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare';
        case AnnenFraverGrunn.ABORT:
            return 'Når vedkommende er arbeidsufør som følge av svangerskapsavbrudd';
        case AnnenFraverGrunn.UFOR_GRUNNET_BARNLOSHET:
            return 'Når vedkommende er arbeidsufør som følge av behandling for barnløshet';
        case AnnenFraverGrunn.DONOR:
            return 'Når vedkommende er donor eller er under vurdering som donor';
        case AnnenFraverGrunn.BEHANDLING_STERILISERING:
            return 'Når vedkommende er arbeidsufør som følge av behandling i forbindelse med sterilisering';
    }
}

const AnnenFraversArsakSchema = z.object({
    beskrivelse: z.string().nullable(),
    grunn: z.array(z.nativeEnum(AnnenFraverGrunn).transform(annenFraverGrunnToText)),
});

export type MedisinskVurdering = z.infer<typeof MedisinskVurderingSchema>;
export const MedisinskVurderingSchema = z.object({
    hovedDiagnose: DiagnoseSchema.nullable(),
    biDiagnoser: z.array(DiagnoseSchema),
    annenFraversArsak: AnnenFraversArsakSchema.nullable(),
    svangerskap: z.boolean(),
    yrkesskade: z.boolean(),
    yrkesskadeDato: LocalDateSchema.nullable(),
});
