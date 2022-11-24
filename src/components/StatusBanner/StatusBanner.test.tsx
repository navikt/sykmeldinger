import { render, screen } from '@testing-library/react'

import { Behandlingsutfall, RegelStatus, StatusEvent, SykmeldingStatus } from '../../fetching/graphql.generated'

import StatusBanner from './StatusBanner'

describe('StatusBanner', () => {
    it('Renders Sendt banner with arbeidsgiver', () => {
        const sykmeldingStatus: SykmeldingStatus = {
            __typename: 'SykmeldingStatus',
            statusEvent: StatusEvent.Sendt,
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
            status: RegelStatus.Ok,
            ruleHits: [],
        }

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />)
        expect(screen.getByText('Sykmeldingen ble sendt til Politiet')).toBeInTheDocument()
    })

    it('Renders Bekreftet banner', () => {
        const sykmeldingStatus: SykmeldingStatus = {
            __typename: 'SykmeldingStatus',
            statusEvent: StatusEvent.Bekreftet,
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        }
        const behandlingsutfall: Behandlingsutfall = {
            __typename: 'Behandlingsutfall',
            status: RegelStatus.Ok,
            ruleHits: [],
        }

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />)
        expect(screen.getByText('Sykmeldingen ble sendt til NAV')).toBeInTheDocument()
    })

    it('Renders Bekreftet egenmelding banner', () => {
        const sykmeldingStatus: SykmeldingStatus = {
            __typename: 'SykmeldingStatus',
            statusEvent: StatusEvent.Bekreftet,
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        }
        const behandlingsutfall: Behandlingsutfall = {
            __typename: 'Behandlingsutfall',
            status: RegelStatus.Ok,
            ruleHits: [],
        }

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} egenmeldt />)
        expect(screen.getByText('Egenmeldingen ble sendt til NAV')).toBeInTheDocument()
    })

    it('Renders bekreftet avvist banner', () => {
        const sykmeldingStatus: SykmeldingStatus = {
            __typename: 'SykmeldingStatus',
            statusEvent: StatusEvent.Bekreftet,
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        }
        const behandlingsutfall: Behandlingsutfall = {
            __typename: 'Behandlingsutfall',
            status: RegelStatus.Invalid,
            ruleHits: [],
        }

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />)
        expect(screen.getByText(/Du bekreftet at du har lest at sykmeldingen er avvist/)).toBeInTheDocument()
    })
})
