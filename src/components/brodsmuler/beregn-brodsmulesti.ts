import {
    getSykefravaerUrl,
    getUrlTilSykmeldinger,
    getUrlTilSykmelding,
    getUrlTilTidslinje,
} from '../../utils/url-utils';

interface BrodSmule {
    tittel: string;
    sti: string;
    erKlikkbar: boolean;
}

const beregnBrodsmulesti = (sti: string, id: string) => {
    const dittSykefravaerSmule: BrodSmule = {
        tittel: 'Ditt sykefravær',
        sti: getSykefravaerUrl(),
        erKlikkbar: true,
    };

    const sykmeldingerSmule: BrodSmule = {
        tittel: 'Dine sykmeldinger',
        sti: getUrlTilSykmeldinger(),
        erKlikkbar: true,
    };

    const sykmeldingSmule: BrodSmule = {
        tittel: 'Sykmelding',
        sti: getUrlTilSykmelding(id),
        erKlikkbar: true,
    };

    const tidslinjeSmule: BrodSmule = {
        tittel: 'Hva skjer under sykefraværet?',
        sti: getUrlTilTidslinje(),
        erKlikkbar: true,
    };

    return [dittSykefravaerSmule, sykmeldingerSmule, sykmeldingSmule];
};

export default beregnBrodsmulesti;
