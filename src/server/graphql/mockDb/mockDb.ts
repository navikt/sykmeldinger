import { Arbeidsgiver } from '../../api-models/Arbeidsgiver'
import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { sykmeldingApen } from '../mockData/sykmelding-apen'
import { sykmeldingApenPapir } from '../mockData/sykmelding-apen-papir'
import { sykmeldingSendt } from '../mockData/sykmelding-sendt'
import { sykmeldingSendt2 } from '../mockData/sykmelding-sendt-2'
import { sykmeldingSendt3 } from '../mockData/sykmelding-sendt-3'
import { sykmeldingBekreftet } from '../mockData/sykmelding-bekreftet'
import { sykmeldingAvvist } from '../mockData/sykmelding-avvist'
import { sykmeldingAvvistBekreftet } from '../mockData/sykmelding-avvist-bekreftet'
import { sykmeldingAvbrutt } from '../mockData/sykmelding-avbrutt'
import { sykmeldingUtgatt } from '../mockData/sykmelding-utgatt'
import { sykmeldingEgenmeldt } from '../mockData/sykmelding-egenmeldt'
import { sykmeldingUnderbehandlingTilbakedatering } from '../mockData/sykmelding-under-behandling-tilbakedatering'
import { sykmeldingUgyldigTilbakedatering } from '../mockData/sykmelding-ugyldig-tilbakedatering'
import { dateSub } from '../../../utils/dateUtils'
import { StatusEvent, SykmeldingChangeStatus } from '../resolver-types.generated'
import arbeidsgivereMock from '../mockData/arbeidsgivereMock'
import { Brukerinformasjon } from '../../api-models/Brukerinformasjon'

export class FakeMockDB {
    private readonly sykmeldingerByUser: Record<string, Sykmelding[]> = {
        tom: [],
        standard: [
            sykmeldingApen(),
            sykmeldingApen(dateSub(new Date(), { hours: 1 }), 'APENNI'),
            sykmeldingApenPapir(),
            sykmeldingSendt(),
            sykmeldingSendt2,
            sykmeldingSendt3,
            sykmeldingBekreftet,
            sykmeldingAvvist(),
            sykmeldingAvvistBekreftet,
            sykmeldingAvbrutt(),
            sykmeldingUtgatt,
            sykmeldingEgenmeldt,
            sykmeldingUnderbehandlingTilbakedatering(),
            sykmeldingUgyldigTilbakedatering,
        ],
    }
    private readonly arbeidsgiverByUser: Record<string, Arbeidsgiver[]> = {}

    public getSykmeldinger(user: string | undefined): Sykmelding[] {
        if (!user) {
            return this.sykmeldingerByUser['standard']
        }

        if (!this.sykmeldingerByUser[user]) {
            this.sykmeldingerByUser[user] = []
        }

        return this.sykmeldingerByUser[user ?? 'standard']
    }

    public getSykmelding(id: string, user: string | undefined): Sykmelding {
        const relevantSykmelding = this.sykmeldingerByUser[user ?? 'standard'].find((it) => it.id === id)

        if (!relevantSykmelding) {
            throw new Error(`Unable to find sykmelding by id: ${id} for user ${user}`)
        }
        return relevantSykmelding
    }

    public getSykmeldingById(sykmeldingId: string): Sykmelding {
        const relevantSykmelding = Object.values(this.sykmeldingerByUser)
            .flatMap((it) => it)
            .find((it) => it.id === sykmeldingId)

        if (!relevantSykmelding) {
            throw new Error(`Unable to find sykmelding by id: ${sykmeldingId}`)
        }

        return relevantSykmelding
    }

    public changeSykmeldingStatus(
        sykmeldingId: string,
        status: SykmeldingChangeStatus,
        user: string | undefined,
    ): Sykmelding {
        const sykmelding = this.getSykmelding(sykmeldingId, user)

        const inputStatusToZodStatus = (status: SykmeldingChangeStatus): StatusEvent =>
            status === SykmeldingChangeStatus.Avbryt
                ? StatusEvent.Avbrutt
                : status === SykmeldingChangeStatus.BekreftAvvist
                ? StatusEvent.Bekreftet
                : StatusEvent.Apen

        sykmelding.sykmeldingStatus.statusEvent = inputStatusToZodStatus(status)

        return sykmelding
    }

    public submitSykmelding(sykmeldingId: string, user: string | undefined): Sykmelding {
        const sykmelding = this.getSykmelding(sykmeldingId, user)

        sykmelding.sykmeldingStatus.statusEvent = StatusEvent.Sendt
        sykmelding.sykmeldingStatus.arbeidsgiver = {
            orgNavn: sykmelding.arbeidsgiver?.navn ?? 'Eksempelarbeidsgiver AS',
            juridiskOrgnummer: '12345',
            orgnummer: '12345',
        }

        return sykmelding
    }

    public getBrukerinformasjon(user: string | undefined): Brukerinformasjon {
        return {
            strengtFortroligAdresse: false,
            arbeidsgivere: user ? this.arbeidsgiverByUser[user] ?? arbeidsgivereMock : arbeidsgivereMock,
        }
    }

    public getMockUsers(): string[] {
        return Object.keys(this.sykmeldingerByUser)
    }

    public hasUser(user: string | undefined): boolean {
        return this.sykmeldingerByUser[user ?? ''] != null
    }

    public addSykmelding(user: string, sykmelding: Sykmelding): void {
        this.sykmeldingerByUser[user].push(sykmelding)
    }

    public addArbeidsgiver(user: string, arbeidsgiver: Arbeidsgiver): void {
        if (this.arbeidsgiverByUser[user] == null) {
            this.arbeidsgiverByUser[user] = []
        }

        if (this.arbeidsgiverByUser[user].find((it) => it.navn === arbeidsgiver.navn)) {
            return
        }

        this.arbeidsgiverByUser[user].push(arbeidsgiver)
    }

    public deleteUser(user: string): void {
        delete this.sykmeldingerByUser[user]
        delete this.arbeidsgiverByUser[user]
    }
}
