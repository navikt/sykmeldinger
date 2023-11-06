import { describe, it, expect } from 'vitest'

import { Behandler } from 'queries'

import { getBehandlerName } from './behandlerUtils'

describe('behandlerUtils', () => {
    describe('getName', () => {
        it('Gets full name if mellomnavn is defined', () => {
            const behandler: Behandler = {
                __typename: 'Behandler',
                fornavn: 'Ola',
                mellomnavn: 'Robert',
                etternavn: 'Normann',
                adresse: {
                    __typename: 'Adresse',
                    gate: null,
                    postnummer: null,
                    kommune: null,
                    postboks: null,
                    land: null,
                },
                tlf: null,
            }

            expect(getBehandlerName(behandler)).toBe('Ola Robert Normann')
        })

        it('Gets partial name if mellomnavn is null', () => {
            const behandler: Behandler = {
                __typename: 'Behandler',
                fornavn: 'Ola',
                mellomnavn: null,
                etternavn: 'Normann',
                adresse: {
                    __typename: 'Adresse',
                    gate: null,
                    postnummer: null,
                    kommune: null,
                    postboks: null,
                    land: null,
                },
                tlf: null,
            }

            expect(getBehandlerName(behandler)).toBe('Ola Normann')
        })
    })
})
