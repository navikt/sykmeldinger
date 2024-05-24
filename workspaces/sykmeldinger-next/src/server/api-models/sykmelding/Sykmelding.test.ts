import { describe, it, expect } from 'vitest'

import { RulesetVersion } from './Sykmelding'

describe('Sykmelding', () => {
    describe('RulesetVersion', () => {
        it.each([
            ['', 2],
            [null, 2],
            ['1', 1],
            ['2', 2],
            ['3', 3],
        ])('should parse "%s" to %i', (input, output) => {
            expect(RulesetVersion.parse(input)).toBe(output)
        })
    })
})
