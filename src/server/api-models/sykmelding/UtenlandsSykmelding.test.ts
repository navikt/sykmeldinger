import { describe, it, expect } from 'vitest'

import { UtenlandskSykmeldingSchema } from './UtenlandskSykmelding'

describe('UtenlandsSykmelding', () => {
    it('should map from alpha-3 code to norwegian country name', () => {
        expect(
            UtenlandskSykmeldingSchema.parse({
                land: 'NOR',
            }).land,
        ).toEqual('Norge')
        expect(
            UtenlandskSykmeldingSchema.parse({
                land: 'pol',
            }).land,
        ).toEqual('Polen')
    })
})
