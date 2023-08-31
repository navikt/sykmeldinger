import { describe, expect, it } from 'vitest'

import { inferSegment } from './flexService'

describe('flexService', () => {
    describe('inferSegment', () => {
        const createFnr = (year: number): string => `0101${year.toString().slice(-2)}12345`

        it('should infer age correctly', () => {
            expect(inferSegment(createFnr(1989))).toEqual('30-39')
            expect(inferSegment(createFnr(2001))).toEqual('20-29')
        })
    })
})
