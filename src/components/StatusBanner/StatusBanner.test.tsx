import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Behandlingsutfall, RegelStatus, StatusEvent, SykmeldingStatusFragment } from 'queries'

import StatusBanner from './StatusBanner'

describe('StatusBanner', () => {
    it('Renders Sendt banner with arbeidsgiver', () => {
        const sykmeldingStatus: SykmeldingStatusFragment = {
            __typename: 'SykmeldingStatus',
            statusEvent: StatusEvent.SENDT,
            timestamp: '2021-05-01',
            arbeidsgiver: {
                __typename: 'ArbeidsgiverStatus',
                orgnummer: '123456',
                orgNavn: 'Politiet',
            },
            sporsmalOgSvarListe: [],
        }
        const behandlingsutfall: Behandlingsutfall = {
            __typename: 'Behandlingsutfall',
            status: RegelStatus.OK,
            ruleHits: [],
        }

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />)
        expect(screen.getByText(/Sykmeldingen ble sendt til Politiet./)).toBeInTheDocument()
    })

    it('Renders Bekreftet banner', () => {
        const sykmeldingStatus: SykmeldingStatusFragment = {
            __typename: 'SykmeldingStatus',
            statusEvent: StatusEvent.BEKREFTET,
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        }
        const behandlingsutfall: Behandlingsutfall = {
            __typename: 'Behandlingsutfall',
            status: RegelStatus.OK,
            ruleHits: [],
        }

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />)
        expect(screen.getByText(/Sykmeldingen ble sendt til NAV./)).toBeInTheDocument()
    })

    it('Renders Bekreftet egenmelding banner', () => {
        const sykmeldingStatus: SykmeldingStatusFragment = {
            __typename: 'SykmeldingStatus',
            statusEvent: StatusEvent.BEKREFTET,
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        }
        const behandlingsutfall: Behandlingsutfall = {
            __typename: 'Behandlingsutfall',
            status: RegelStatus.OK,
            ruleHits: [],
        }

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} egenmeldt />)
        expect(screen.getByText(/Egenmeldingen ble sendt til NAV./)).toBeInTheDocument()
    })

    it('Renders bekreftet avvist banner', () => {
        const sykmeldingStatus: SykmeldingStatusFragment = {
            __typename: 'SykmeldingStatus',
            statusEvent: StatusEvent.BEKREFTET,
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        }
        const behandlingsutfall: Behandlingsutfall = {
            __typename: 'Behandlingsutfall',
            status: RegelStatus.INVALID,
            ruleHits: [],
        }

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />)
        expect(screen.getByText(/Du bekreftet at du har lest at sykmeldingen er avvist/)).toBeInTheDocument()
    })
})
