import { getSykefravaerUrl, getUrlTilSykmeldinger, getUrlTilSykmelding } from '../../utils/url-utils';

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
        erKlikkbar: false,
    };

    return [dittSykefravaerSmule, sykmeldingerSmule, sykmeldingSmule];
};

export default beregnBrodsmulesti;
