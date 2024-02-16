import { ReactElement, useEffect, useState } from 'react'
import { Alert, BodyLong, Button, Label, Radio, RadioGroup } from '@navikt/ds-react'

import { SykmeldingChangeStatus } from 'queries'

import useGetSykmeldingIdParam from '../../../../hooks/useGetSykmeldingIdParam'
import { useChangeSykmeldingStatus } from '../../../../hooks/useMutations'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'

const skjemanavn = 'avbryt åpen papirsykmelding'

function PapirInfoheader(): ReactElement {
    const harIkkeGittVidereId = 'har-ikke-gitt-videre'
    const sykmeldingId = useGetSykmeldingIdParam()
    const [{ loading, error }, avbryt] = useChangeSykmeldingStatus(
        sykmeldingId,
        SykmeldingChangeStatus.AVBRYT,
        () => logAmplitudeEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logAmplitudeEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    )
    const [harGittVidere, setHarGittVidere] = useState<'Ja' | 'Nei' | null>(null)

    useEffect(() => {
        if (harGittVidere) {
            logAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } })
        }
    }, [harGittVidere])

    return (
        <section aria-labelledby="har-gitt-papirsykmelding-videre-group">
            <RadioGroup
                id="har-gitt-papirsykmelding-videre-group"
                name="harDuGittPapirsykmeldingenVidere"
                legend="Har du allerede gitt papirsykmeldingen videre?"
                value={harGittVidere}
                onChange={(value: 'Ja' | 'Nei') => {
                    if (harGittVidere) {
                        logAmplitudeEvent(
                            { eventName: 'skjema startet', data: { skjemanavn } },
                            { 'har gitt videre': value },
                        )
                    }

                    setHarGittVidere(value)
                }}
            >
                <Radio value="Ja">Ja</Radio>
                <Radio value="Nei">Nei</Radio>
            </RadioGroup>

            {harGittVidere === 'Ja' && (
                <div className="mt-8">
                    <div className="mb-4">
                        <Alert variant="info">
                            <div className="mb-4">
                                <BodyLong>
                                    Hør med arbeidsgiveren din om det er greit at du sender sykmeldingen herfra i
                                    stedet. Det er en fordel for begge: Da får dere alt her, både sykepengesøknaden og
                                    andre meldinger som handler om sykefraværet. Papirsykmeldingen kan du legge bort.
                                    Det du gjør her, erstatter papiret.
                                </BodyLong>
                            </div>
                            <BodyLong className="font-bold">
                                Hvis du får ja fra arbeidsgiveren din kan du fortsette utfyllingen på denne siden. Hvis
                                du i stedet skal fortsette med papiret må du avbryte denne sykmeldingen.
                            </BodyLong>
                        </Alert>
                    </div>

                    <Button loading={loading} onClick={() => avbryt()}>
                        Avbryt sykmeldingen
                    </Button>

                    {error && (
                        <div className="mt-8">
                            <Alert variant="error">
                                En feil oppstod som gjorde at sykmeldingen ikke kunne avbrytes. Prøv igjen senere.
                            </Alert>
                        </div>
                    )}
                </div>
            )}

            {harGittVidere === 'Nei' && (
                <div className="mt-8">
                    <Alert variant="info">
                        <Label id={harIkkeGittVidereId}>Da kan du sende sykmeldingen herfra</Label>
                        <BodyLong aria-labelledby={harIkkeGittVidereId}>
                            Under sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige
                            om? Du velger selv om du vil bruke sykmeldingen.
                        </BodyLong>
                    </Alert>
                </div>
            )}
        </section>
    )
}

export default PapirInfoheader
