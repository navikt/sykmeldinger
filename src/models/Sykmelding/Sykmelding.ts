import 'reflect-metadata';
import { ArrayNotEmpty, IsBoolean, IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import dayjs from 'dayjs';
import { parseISO } from 'date-fns';

import ArbeidsgiverSykmelding from './ArbeidsgiverSykmelding';
import Behandler from './Behandler';
import Behandlingsutfall from './Behandlingsutfall';
import KontaktMedPasient from './KontaktMedPasient';
import MedisinskVurdering from './MedisinskVurdering';
import MeldingTilNAV from './MeldingTilNav';
import Merknad from './Merknad';
import Periode from './Periode';
import Prognose from './Prognose';
import SykmeldingStatus from './SykmeldingStatus';
import UtdypendeOpplysning from './UtdypendeOpplysninger';
import Pasient from './Pasient';


export class Sykmelding {
    @IsString()
    readonly id: string;

    @IsDate()
    readonly mottattTidspunkt: Date;

    @ValidateNested()
    readonly behandlingsutfall: Behandlingsutfall;

    @IsOptional()
    @IsString()
    readonly legekontorOrgnummer?: string;

    @IsOptional()
    @ValidateNested()
    readonly arbeidsgiver?: ArbeidsgiverSykmelding;

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    readonly sykmeldingsperioder: Periode[];

    @ValidateNested()
    readonly sykmeldingStatus: SykmeldingStatus;

    @ValidateNested()
    readonly medisinskVurdering?: MedisinskVurdering;

    @IsBoolean()
    readonly skjermesForPasient: boolean;

    @IsOptional()
    @ValidateNested()
    readonly prognose?: Prognose;

    @ValidateNested({ each: true })
    readonly utdypendeOpplysninger: Map<string, Map<string, UtdypendeOpplysning>>;

    @IsOptional()
    @IsString()
    readonly tiltakArbeidsplassen?: string;

    @IsOptional()
    @IsString()
    readonly tiltakNAV?: string;

    @IsOptional()
    @IsString()
    readonly andreTiltak?: string;

    @IsOptional()
    @ValidateNested()
    readonly meldingTilNAV?: MeldingTilNAV;

    @IsOptional()
    @IsString()
    readonly meldingTilArbeidsgiver?: string;

    @ValidateNested()
    readonly kontaktMedPasient: KontaktMedPasient;

    @IsDate()
    readonly behandletTidspunkt: Date;

    @ValidateNested()
    readonly behandler: Behandler;

    @IsOptional()
    @IsDate()
    readonly syketilfelleStartDato?: Date;

    @IsOptional()
    @IsString()
    readonly navnFastlege?: string;

    @IsOptional()
    @IsBoolean()
    readonly egenmeldt?: boolean;

    @IsOptional()
    @IsBoolean()
    readonly papirsykmelding?: boolean;

    @IsOptional()
    @IsBoolean()
    readonly harRedusertArbeidsgiverperiode?: boolean;

    @IsOptional()
    @ValidateNested({ each: true })
    readonly merknader?: Merknad[];

    @IsOptional()
    @ValidateNested()
    readonly pasient?: Pasient;

    constructor(data: any) {
        this.id = data.id;
        this.mottattTidspunkt = parseISO(data.mottattTidspunkt);
        this.behandlingsutfall = new Behandlingsutfall(data.behandlingsutfall);
        this.legekontorOrgnummer = data.legekontorOrgnummer ?? undefined;
        this.arbeidsgiver = data.arbeidsgiver ? new ArbeidsgiverSykmelding(data.arbeidsgiver) : undefined;
        this.sykmeldingsperioder = data.sykmeldingsperioder.map((periode: any) => new Periode(periode));
        this.sykmeldingStatus = new SykmeldingStatus(data.sykmeldingStatus);
        this.medisinskVurdering = data.medisinskVurdering ? new MedisinskVurdering(data.medisinskVurdering) : undefined;
        this.skjermesForPasient = data.skjermesForPasient;
        this.prognose = data.prognose ? new Prognose(data.prognose) : undefined;
        this.utdypendeOpplysninger = this.getUtdypendeOpplysninger(data.utdypendeOpplysninger);
        this.tiltakArbeidsplassen = data.tiltakArbeidsplassen ?? undefined;
        this.tiltakNAV = data.tiltakNAV ?? undefined;
        this.andreTiltak = data.andreTiltak ?? undefined;
        this.meldingTilNAV = data.meldingTilNAV ? new MeldingTilNAV(data.meldingTilNAV) : undefined;
        this.meldingTilArbeidsgiver = data.meldingTilArbeidsgiver ?? undefined;
        this.kontaktMedPasient = new KontaktMedPasient(data.kontaktMedPasient);
        this.behandletTidspunkt = parseISO(data.behandletTidspunkt);
        this.behandler = new Behandler(data.behandler);
        this.syketilfelleStartDato = data.syketilfelleStartDato ? parseISO(data.syketilfelleStartDato) : undefined;
        this.navnFastlege = data.navnFastlege ?? undefined;
        this.egenmeldt = typeof data.egenmeldt === 'boolean' ? data.egenmeldt : undefined;
        this.papirsykmelding = typeof data.papirsykmelding === 'boolean' ? data.papirsykmelding : undefined;
        this.harRedusertArbeidsgiverperiode = data.harRedusertArbeidsgiverperiode ?? undefined;
        this.merknader = data.merknader ? data.merknader.map((merknad: any) => new Merknad(merknad)) : undefined;
        this.pasient = data.pasient ? new Pasient(data.pasient) : undefined;
    }

    private getUtdypendeOpplysninger(value: unknown): Map<string, Map<string, UtdypendeOpplysning>> {
        const outerMap = new Map<string, Map<string, UtdypendeOpplysning>>();
        if (value && value instanceof Object) {
            for (const [outerKey, outerValue] of Object.entries(value)) {
                if (outerValue && outerValue instanceof Object) {
                    const innerMap = new Map<string, UtdypendeOpplysning>();
                    for (const [innerKey, innerValue] of Object.entries(outerValue)) {
                        innerMap.set(innerKey, new UtdypendeOpplysning(innerValue));
                    }
                    outerMap.set(outerKey, innerMap);
                }
            }
        }
        return outerMap;
    }

    /**
     * Get the type of sykmelding
     * Used for displaying the title.
     * @return {string}
     */
    getSykmeldingTitle(): 'Sykmelding' | 'Papirsykmelding' | 'Egenmelding' {
        if (this.papirsykmelding) {
            return 'Papirsykmelding';
        }
        if (this.egenmeldt) {
            return 'Egenmelding';
        }
        return 'Sykmelding';
    }

    /**
     * Get the first fom date of the earliest sykmelding period
     * @return {Date} The start date
     */
    getSykmeldingStartDate(): Date {
        return this.sykmeldingsperioder.reduce((acc, value) => {
            if (dayjs(value.fom).isBefore(dayjs(acc.fom))) {
                return value;
            }

            return acc;
        }).fom;
    }

    /**
     * Get the last tom date of the last sykmelding period
     * @return {Date} The end date
     */
    getSykmeldingEndDate(): Date {
        return this.sykmeldingsperioder.reduce((acc, value) => {
            if (dayjs(value.fom).isAfter(dayjs(acc.fom))) {
                return value;
            }

            return acc;
        }).tom;
    }

    /**
     * Get the periods of the sykmelding sorted by newest first
     * @return {Periode[]} The sorted sykmelding periods
     */
    getSykmeldingperioderSorted(): Periode[] {
        return this.sykmeldingsperioder.sort(({ fom }, { tom }) => {
            if (dayjs(fom).isBefore(tom)) {
                return -1;
            } else if (dayjs(fom).isSame(tom)) {
                return 0;
            }
            return 1;
        });
    }

    /**
     * Get the text representation of the sykmelding length from start date to end date
     * @return {string} The sykmelding length
     */
    getReadableSykmeldingLength(): string {
        const startDate = this.getSykmeldingStartDate();
        const endDate = this.getSykmeldingEndDate();

        if (dayjs(startDate).isSame(endDate)) {
            return dayjs(startDate).format('D. MMMM YYYY');
        }

        if (dayjs(startDate).isSame(endDate, 'year')) {
            if (dayjs(startDate).isSame(endDate, 'month')) {
                return `${dayjs(startDate).format('D.')} - ${dayjs(endDate).format('D. MMMM YYYY')}`;
            }
            return `${dayjs(startDate).format('D. MMMM')} - ${dayjs(endDate).format('D. MMMM YYYY')}`;
        }

        return `${dayjs(startDate).format('D. MMMM YYYY')} - ${dayjs(endDate).format('D. MMMM YYYY')}`;
    }
}
