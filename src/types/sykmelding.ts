import ArbeidsgiverSykmelding from './sykmelding/ArbeidsgiverSykmelding';
import Behandler from './sykmelding/Behandler';
import Behandlingsutfall from './sykmelding/Behandlingsutfall';
import KontaktMedPasient from './sykmelding/KontaktMedPasient';
import MedisinskVurdering from './sykmelding/MedisinskVurdering';
import MeldingTilNAV from './sykmelding/MeldingTilNav';
import Merknad from './sykmelding/Merknad';
import Periode from './sykmelding/Periode';
import Prognose from './sykmelding/Prognose';
import SykmeldingStatus from './sykmelding/SykmeldingStatus';
import UtdypendeOpplysning from './sykmelding/UtdypendeOpplysninger';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum DiagnosekodeSystem {
    '2.16.578.1.12.4.1.1.7110' = 'ICD-10',
    '2.16.578.1.12.4.1.1.7170' = 'ICPC-2',
}

export class Sykmelding {
    @IsString()
    id: string;

    @Type(() => Date)
    mottattTidspunkt: Date;

    @ValidateNested()
    @Type(() => Behandlingsutfall)
    behandlingsutfall: Behandlingsutfall;

    @IsOptional()
    @IsString()
    legekontorOrgnummer?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ArbeidsgiverSykmelding)
    arbeidsgiver?: ArbeidsgiverSykmelding;

    @ValidateNested({ each: true })
    @Type(() => Periode)
    sykmeldingsperioder: Periode[];

    @ValidateNested()
    @Type(() => SykmeldingStatus)
    sykmeldingStatus: SykmeldingStatus;

    @ValidateNested()
    @Type(() => MedisinskVurdering)
    medisinskVurdering?: MedisinskVurdering;

    @IsBoolean()
    skjermesForPasient: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => Prognose)
    prognose?: Prognose;

    // @ValidateNested({ each: true })
    utdypendeOpplysninger: Map<string, Map<string, UtdypendeOpplysning>>;

    @IsOptional()
    @IsString()
    tiltakArbeidsplassen?: string;

    @IsOptional()
    @IsString()
    tiltakNAV?: string;

    @IsOptional()
    @IsString()
    andreTiltak?: string;
    meldingTilNAV?: MeldingTilNAV;

    @IsOptional()
    @IsString()
    meldingTilArbeidsgiver?: string;

    @ValidateNested()
    @Type(() => KontaktMedPasient)
    kontaktMedPasient: KontaktMedPasient;

    @Type(() => Date)
    behandletTidspunkt: Date;

    @ValidateNested()
    @Type(() => Behandler)
    behandler: Behandler;

    @IsOptional()
    @Type(() => Date)
    syketilfelleStartDato?: Date;

    @IsOptional()
    @IsString()
    navnFastlege?: string;

    @IsOptional()
    @IsBoolean()
    egenmeldt?: boolean;

    @IsOptional()
    @IsBoolean()
    papirsykmelding?: boolean;

    @IsOptional()
    @IsBoolean()
    harRedusertArbeidsgiverperiode?: boolean;

    @ValidateNested({ each: true })
    @Type(() => Merknad)
    merknader?: Merknad[];
}
