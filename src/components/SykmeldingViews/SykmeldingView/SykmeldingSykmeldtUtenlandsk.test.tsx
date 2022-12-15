import { render, screen } from '@testing-library/react'

import { createSykmelding } from '../../../utils/test/dataUtils'

import SykmeldingSykmeldtUtenlandsk from './SykmeldingSykmeldtUtenlandsk'

describe('SykmeldingSykmeldtUtenlandsk', () => {
    it('should show country for utenlandsk sykmelding', () => {
        render(
            <SykmeldingSykmeldtUtenlandsk
                sykmelding={createSykmelding({
                    utenlandskSykmelding: {
                        __typename: 'UtenlandskSykmelding',
                        land: 'Finnland',
                    },
                })}
            />,
        )

        expect(screen.getByRole('heading', { name: 'Landet sykmeldingen ble skrevet' })).toBeInTheDocument()
        expect(screen.getByText('Finnland')).toBeInTheDocument()
    })
})
