import { describe, expect, it } from 'vitest'

import { prettifyOrgName } from './orgUtils'

describe('orgUtils', () => {
    it('should map correctly', () => {
        expect(prettifyOrgName('TANNHELSETJENESTENS,EPLESNEKKERTJENESTE,FLASKEHALSFABRIKK MO')).toEqual(
            'Tannhelsetjenestens Eplesnekkertjeneste Flaskehalsfabrikk Mo',
        )
        expect(prettifyOrgName('NAMBDA KOMMUNE,SKULEHELSESTASJON/JORDMORTENESTE')).toEqual(
            'Nambda kommune Skulehelsestasjon/Jordmorteneste',
        )
        expect(prettifyOrgName('HJEMMESYKEPLEIE,LOLSTAD/KEKNES/ROFLSTAD')).toEqual(
            'Hjemmesykepleie Lolstad/Keknes/Roflstad',
        )
        expect(prettifyOrgName('ANDREASSEN,EPLESLANGTJENESTE/OPP-NES,OPPSTANDELSESBYRÅ AS')).toEqual(
            'Andreassen Epleslangtjeneste/Opp-nes Oppstandelsesbyrå AS',
        )
    })
})
