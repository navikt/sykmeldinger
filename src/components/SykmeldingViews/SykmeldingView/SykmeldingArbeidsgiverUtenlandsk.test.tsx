import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { createSykmelding } from '../../../utils/test/dataUtils'

import SykmeldingArbeidsgiverUtenlandsk from './SykmeldingArbeidsgiverUtenlandsk'

describe('SykmeldingArbeidsgiverUtenlandsk', () => {
    it('should show country for utenlandsk sykmelding', () => {
        render(
            <SykmeldingArbeidsgiverUtenlandsk
                sykmelding={{
                    ...createSykmelding(),
                    utenlandskSykmelding: {
                        __typename: 'UtenlandskSykmelding',
                        land: 'Polen',
                    },
                }}
            />,
        )

        expect(screen.getByRole('heading', { name: 'Landet sykmeldingen ble skrevet' })).toBeInTheDocument()
        expect(screen.getByText('Polen')).toBeInTheDocument()
    })
})
