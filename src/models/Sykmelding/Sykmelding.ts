import 'reflect-metadata';
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
import { ArrayNotEmpty, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import dayjs from 'dayjs';
import { transformAndValidateSync } from 'class-transformer-validator';

export enum DiagnosekodeSystem {
    '2.16.578.1.12.4.1.1.7110' = 'ICD-10',
    '2.16.578.1.12.4.1.1.7170' = 'ICPC-2',
}

export class Sykmelding {
    @IsString()
    readonly id: string;

    @Type(() => Date)
    readonly mottattTidspunkt: Date;

    @ValidateNested()
    @Type(() => Behandlingsutfall)
    readonly behandlingsutfall: Behandlingsutfall;

    @IsOptional()
    @IsString()
    readonly legekontorOrgnummer?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ArbeidsgiverSykmelding)
    readonly arbeidsgiver?: ArbeidsgiverSykmelding;

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Periode)
    readonly sykmeldingsperioder: Periode[];

    @ValidateNested()
    @Type(() => SykmeldingStatus)
    readonly sykmeldingStatus: SykmeldingStatus;

    @ValidateNested()
    @Type(() => MedisinskVurdering)
    readonly medisinskVurdering?: MedisinskVurdering;

    @IsBoolean()
    readonly skjermesForPasient: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => Prognose)
    readonly prognose?: Prognose;

    @ValidateNested({ each: true })
    @Transform(
        ({ value }) => {
            const outerMap = new Map<string, Map<string, UtdypendeOpplysning>>();
            if (value && value instanceof Object) {
                for (const [outerKey, outerValue] of Object.entries(value)) {
                    if (outerValue && outerValue instanceof Object) {
                        const innerMap = new Map<string, UtdypendeOpplysning>();
                        for (const [innerKey, innerValue] of Object.entries(outerValue)) {
                            const utdypendeOpplysning = transformAndValidateSync(
                                UtdypendeOpplysning,
                                innerValue as UtdypendeOpplysning,
                                { validator: { validationError: { target: false, value: false } } },
                            );
                            innerMap.set(innerKey, utdypendeOpplysning);
                        }
                        outerMap.set(outerKey, innerMap);
                    }
                }
            }
            return outerMap;
        },
        { toClassOnly: true },
    )
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
    @Type(() => MeldingTilNAV)
    readonly meldingTilNAV?: MeldingTilNAV;

    @IsOptional()
    @IsString()
    readonly meldingTilArbeidsgiver?: string;

    @ValidateNested()
    @Type(() => KontaktMedPasient)
    readonly kontaktMedPasient: KontaktMedPasient;

    @Type(() => Date)
    readonly behandletTidspunkt: Date;

    @ValidateNested()
    @Type(() => Behandler)
    readonly behandler: Behandler;

    @IsOptional()
    @Type(() => Date)
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

    @ValidateNested({ each: true })
    @Type(() => Merknad)
    readonly merknader?: Merknad[];

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
