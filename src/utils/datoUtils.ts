const maaneder = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
];
const SKILLETEGN_PERIODE = '–';

export const tilLesbarPeriodeMedArstall = (fom: Date, tom: Date): string => {
    const erSammeAar = fom.getFullYear() === tom.getFullYear();
    const erSammeMaaned = fom.getMonth() === tom.getMonth();
    return erSammeAar && erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
        : erSammeAar
        ? `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
        : `${tilLesbarDatoMedArstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`;
};

export const tilLesbarDatoMedArstall = (datoArg?: Date) => {
    if (!datoArg) {
        return undefined;
    }
    return `${tilLesbarDatoUtenAarstall(new Date(datoArg))} ${new Date(datoArg).getFullYear()}`;
};

export const tilLesbarPeriodeUtenArstall = (fomArg: string, tomArg: string): string => {
    const fom = new Date(fomArg);
    const tom = new Date(tomArg);
    const erSammeMaaned = fom.getMonth() === tom.getMonth();
    return erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
        : `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`;
};

export const tilLesbarDatoUtenAarstall = (datoArg: Date) => {
    if (datoArg) {
        const dato = new Date(datoArg);
        const dag = dato.getDate();
        const manedIndex = dato.getMonth();
        const maned = maaneder[manedIndex];
        return `${dag}. ${maned}`;
    }
    return null;
};

export function getDuration(from: Date, to: Date) {
    return Math.round(Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))) + 1;
}
