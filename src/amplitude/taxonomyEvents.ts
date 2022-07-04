// Basert på https://github.com/navikt/analytics-taxonomy
export type AmplitudeTaxonomyEvents =
    | { eventName: 'accordion lukket'; data: { tekst: string } }
    | { eventName: 'accordion åpnet'; data: { tekst: string } }
    | { eventName: 'alert vist'; data: { variant: string; tekst: string } }
    | { eventName: 'besøk' }
    | { eventName: 'chat avsluttet'; data: { komponent: string } }
    | { eventName: 'chat startet'; data: { komponent: string } }
    | { eventName: 'last ned'; data: { type: string; tema: string; tittel: string } }
    | { eventName: 'modal lukket'; data: { tekst: string } }
    | { eventName: 'modal åpnet'; data: { tekst: string } }
    | { eventName: 'navigere'; data: { lenketekst: string; destinasjon: string } }
    | { eventName: 'skjema fullført'; data: { skjemanavn: string /* skjemaId: number */ } }
    | { eventName: 'skjema innsending feilet'; data: { skjemanavn: string /* skjemaId: number */ } }
    | {
          eventName: 'skjema spørsmål besvart';
          data: { skjemanavn: string; spørsmål: string; svar: string /* skjemaId: number */ };
      }
    | { eventName: 'skjema startet'; data: { skjemanavn: string /* skjemaId: number */ } }
    | { eventName: 'skjema steg fullført'; data: { skjemanavn: string; steg: string /* skjemaId: number */ } }
    | { eventName: 'skjema validering feilet'; data: { skjemanavn: string /* skjemaId: number */ } }
    | { eventName: 'skjema åpnet'; data: { skjemanavn: string /* skjemaId: number */ } }
    | { eventName: 'guidepanel vist'; data: { komponent: string; tekst?: string } };
