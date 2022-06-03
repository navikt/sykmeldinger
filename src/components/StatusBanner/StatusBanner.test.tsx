import { render, screen } from '@testing-library/react';

import { BehandlingsutfallSchema, Behandlingsutfall, RegelStatus } from '../../models/Sykmelding/Behandlingsutfall';
import { StatusEvent, SykmeldingStatus, SykmeldingStatusSchema } from '../../models/Sykmelding/SykmeldingStatus';

import StatusBanner from './StatusBanner';

describe('StatusBanner', () => {
    it('Renders Sendt banner with arbeidsgiver', () => {
        const sykmeldingStatus: SykmeldingStatus = SykmeldingStatusSchema.parse({
            statusEvent: StatusEvent.SENDT,
            timestamp: '2021-05-01',
            arbeidsgiver: {
                orgnummer: '123456',
                orgNavn: 'Politiet',
                juridiskOrgnummer: null,
            },
            sporsmalOgSvarListe: [],
        });
        const behandlingsutfall: Behandlingsutfall = BehandlingsutfallSchema.parse({
            status: RegelStatus.OK,
            ruleHits: [],
        });

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />);
        expect(screen.getByText('Sykmeldingen ble sendt til Politiet')).toBeInTheDocument();
    });

    it('Renders Bekreftet banner', () => {
        const sykmeldingStatus: SykmeldingStatus = SykmeldingStatusSchema.parse({
            statusEvent: StatusEvent.BEKREFTET,
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        });
        const behandlingsutfall: Behandlingsutfall = BehandlingsutfallSchema.parse({
            status: RegelStatus.OK,
            ruleHits: [],
        });

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />);
        expect(screen.getByText('Sykmeldingen ble sendt til NAV')).toBeInTheDocument();
    });

    it('Renders Bekreftet egenmelding banner', () => {
        const sykmeldingStatus: SykmeldingStatus = SykmeldingStatusSchema.parse({
            statusEvent: StatusEvent.BEKREFTET,
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        });
        const behandlingsutfall: Behandlingsutfall = BehandlingsutfallSchema.parse({
            status: RegelStatus.OK,
            ruleHits: [],
        });

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} egenmeldt />);
        expect(screen.getByText('Egenmeldingen ble sendt til NAV')).toBeInTheDocument();
    });

    it('Renders bekreftet avvist banner', () => {
        const sykmeldingStatus: SykmeldingStatus = SykmeldingStatusSchema.parse({
            statusEvent: StatusEvent.BEKREFTET,
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        });
        const behandlingsutfall = BehandlingsutfallSchema.parse({
            status: RegelStatus.INVALID,
            ruleHits: [],
        });

        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />);
        expect(screen.getByText(/Du bekreftet at du har lest at sykmeldingen er avvist/)).toBeInTheDocument();
    });
});
