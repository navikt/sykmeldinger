import Veilederpanel from 'nav-frontend-veilederpanel';
import { Alert, BodyLong, Heading, Link } from '@navikt/ds-react';

import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import Spacing from '../../../../components/Spacing/Spacing';
import InformationBanner from '../../../../components/InformationBanner/InformationBanner';
import VeilederMaleSvg from '../../../../components/Veileder/svg/VeilederMaleSvg';

import AvbrytPanel from './AvbrytPanel/AvbrytPanel';
import AvbrytContextProvider from './AvbrytContext';
import PapirInfoheader from './PapirInfoheader';
import Form from './Form/Form';


interface OkApenSykmeldingProps {
    sykmelding: Sykmelding;
    olderSykmeldingId: string | null;
}

const OkApenSykmelding: React.FC<OkApenSykmeldingProps> = ({ sykmelding, olderSykmeldingId }) => {
    useHotjarTrigger('SYKMELDING_OK_APEN');

    if (sykmelding.egenmeldt) {
        return (
            <div>
                <Spacing amount="large">
                    <Veilederpanel kompakt fargetema="info" svg={<VeilederMaleSvg />}>
                        Hei, denne egenmeldingen er utløpt og kan derfor ikke benyttes. Du kan fortsatt se opplysninger
                        fra egenmeldingen under.
                    </Veilederpanel>
                </Spacing>

                <Sykmeldingsopplysninger sykmelding={sykmelding} />
            </div>
        );
    }

    return (
        <AvbrytContextProvider>
            <div className="sykmelding-container">
                {!olderSykmeldingId && (
                    <Spacing>
                        <InformationBanner
                            merknader={sykmelding.merknader}
                            papirsykmelding={sykmelding.papirsykmelding}
                        />
                    </Spacing>
                )}

                {Boolean(sykmelding.papirsykmelding) && (
                    <Spacing amount="large">
                        <PapirInfoheader />
                    </Spacing>
                )}

                <Spacing>
                    <Sykmeldingsopplysninger sykmelding={sykmelding} />
                </Spacing>

                {olderSykmeldingId && (
                    <Alert variant="warning">
                        <Heading spacing size="small" level="2">
                            Du har en tidligere sykmelding du ikke har sendt inn enda.
                        </Heading>
                        <BodyLong>
                            For å kunne sende inn denne sykmeldingen må du først sende inn eller avbryte tidligere
                            sykmeldinger.
                        </BodyLong>
                        <BodyLong>
                            <Link href={`/syk/sykmeldinger/${olderSykmeldingId}`}>Her</Link> finner du sykmeldingen du
                            ikke har sendt inn.
                        </BodyLong>
                    </Alert>
                )}

                <Form sykmelding={sykmelding} disable={!!olderSykmeldingId} />
                <AvbrytPanel disable={!!olderSykmeldingId} />
            </div>
        </AvbrytContextProvider>
    );
};

export default OkApenSykmelding;
