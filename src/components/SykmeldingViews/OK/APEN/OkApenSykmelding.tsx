import Veilederpanel from 'nav-frontend-veilederpanel';
import { Alert, BodyLong, Heading, Link as DsLink } from '@navikt/ds-react';
import Link from 'next/link';
import { WarningFilled } from '@navikt/ds-icons';

import { Sykmelding } from '../../../../fetching/graphql.generated';
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger';
import Sykmeldingsopplysninger from '../../SykmeldingView/SykmeldingsopplysningerContainer';
import Spacing from '../../../Spacing/Spacing';
import InformationBanner, { Merknadtype } from '../../../InformationBanner/InformationBanner';
import VeilederMaleSvg from '../../../Veileder/svg/VeilederMaleSvg';
import SykmeldingStatusPrint from '../../SykmeldingView/Layout/SykmeldingStatusPrint/SykmeldingStatusPrint';

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
                    <div className="hide-on-print">
                        <Spacing>
                            <InformationBanner
                                merknader={sykmelding.merknader}
                                papirsykmelding={sykmelding.papirsykmelding}
                            />
                        </Spacing>
                    </div>
                )}
                {sykmelding.merknader?.some((merknad) => merknad.type === Merknadtype.UGYLDIG_TILBAKEDATERING) && (
                    <SykmeldingStatusPrint
                        title="Avvist sykmelding"
                        Icon={WarningFilled}
                        list={sykmelding.behandlingsutfall.ruleHits}
                    />
                )}

                {Boolean(sykmelding.papirsykmelding) && (
                    <Spacing amount="large">
                        <PapirInfoheader />
                    </Spacing>
                )}

                <Spacing>
                    <Sykmeldingsopplysninger sykmelding={sykmelding} />
                </Spacing>
                <div className="hide-on-print">
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
                                <Link href={`/${olderSykmeldingId}`} passHref>
                                    <DsLink>Her</DsLink>
                                </Link>{' '}
                                finner du sykmeldingen du ikke har sendt inn.
                            </BodyLong>
                        </Alert>
                    )}
                    <Form sykmelding={sykmelding} disable={!!olderSykmeldingId} />
                    <AvbrytPanel disable={!!olderSykmeldingId} />
                </div>
            </div>
        </AvbrytContextProvider>
    );
};

export default OkApenSykmelding;
