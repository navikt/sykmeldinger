import { ReactElement, useState } from 'react'
import { Alert, BodyLong, Button, Heading, Radio, RadioGroup } from '@navikt/ds-react'

import { SykmeldingChangeStatus } from 'queries'

import useGetSykmeldingIdParam from '../../../../hooks/useGetSykmeldingIdParam'
import { useChangeSykmeldingStatus } from '../../../../hooks/useMutations'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'

const skjemanavn = 'avbryt åpen papirsykmelding'

function PapirInfoheader(): ReactElement {
    const sykmeldingId = useGetSykmeldingIdParam()
    const [{ loading, error }, avbryt] = useChangeSykmeldingStatus(
        sykmeldingId,
        SykmeldingChangeStatus.AVBRYT,
        () => logAmplitudeEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logAmplitudeEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    )
    const [harGittVidere, setHarGittVidere] = useState<'Ja' | 'Nei' | null>(null)
    return (
        <section aria-labelledby="har-gitt-papirsykmelding-videre-group">
            <RadioGroup
                id="har-gitt-papirsykmelding-videre-group"
                name="harDuGittPapirsykmeldingenVidere"
                legend="Har du allerede gitt papirsykmeldingen videre?"
                value={harGittVidere}
                onChange={(value: 'Ja' | 'Nei') => {
                    setHarGittVidere(value)
                }}
            >
                <Radio value="Ja">Ja</Radio>
                <Radio value="Nei">Nei</Radio>
            </RadioGroup>

            {harGittVidere === 'Ja' && (
                <div className="mt-8">
                    <Alert className="mb-4" variant="info">
                        <BodyLong className="mb-4">
                            Hør med arbeidsgiveren din om det er greit at du sender sykmeldingen herfra i stedet. Det er
                            en fordel for begge: Da får dere alt her, både sykepengesøknaden og andre meldinger som
                            handler om sykefraværet. Papirsykmeldingen kan du legge bort. Det du gjør her, erstatter
                            papiret.
                        </BodyLong>
                        <BodyLong className="font-bold">
                            Hvis du får ja fra arbeidsgiveren din kan du fortsette utfyllingen på denne siden. Hvis du i
                            stedet skal fortsette med papiret må du avbryte denne sykmeldingen.
                        </BodyLong>
                    </Alert>

                    <Button loading={loading} onClick={() => avbryt()}>
                        Avbryt sykmeldingen
                    </Button>

                    {error && (
                        <Alert className="mt-8" variant="error" role="alert">
                            En feil oppstod som gjorde at sykmeldingen ikke kunne avbrytes. Prøv igjen senere.
                        </Alert>
                    )}
                </div>
            )}

            {harGittVidere === 'Nei' && (
                <Alert className="mt-8" variant="info">
                    <Heading level="2" size="xsmall">
                        Da kan du sende sykmeldingen herfra
                    </Heading>
                    <BodyLong>
                        Under sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige om?
                        Du velger selv om du vil bruke sykmeldingen.
                    </BodyLong>
                </Alert>
            )}
        </section>
    )
}

export default PapirInfoheader
