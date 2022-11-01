import React, { useEffect, useState } from 'react'
import { Alert, BodyLong, Button, Label, Radio, RadioGroup } from '@navikt/ds-react'

import Spacing from '../../../Spacing/Spacing'
import useGetSykmeldingIdParam from '../../../../hooks/useGetSykmeldingIdParam'
import { useChangeSykmeldingStatus } from '../../../../hooks/useMutations'
import { SykmeldingChangeStatus } from '../../../../fetching/graphql.generated'
import { useAmplitude } from '../../../../amplitude/amplitude'

const skjemanavn = 'avbryt åpen papirsykmelding'

function PapirInfoheader(): JSX.Element {
    const sykmeldingId = useGetSykmeldingIdParam()
    const logEvent = useAmplitude()
    const [{ loading, error }, avbryt] = useChangeSykmeldingStatus(
        sykmeldingId,
        SykmeldingChangeStatus.Avbryt,
        () => logEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    )
    const [harGittVidere, setHarGittVidere] = useState<'Ja' | 'Nei' | null>(null)

    useEffect(() => {
        if (harGittVidere) {
            logEvent({ eventName: 'skjema åpnet', data: { skjemanavn } })
        }
    }, [harGittVidere, logEvent])

    return (
        <>
            <RadioGroup
                name="harDuGittPapirsykmeldingenVidere"
                legend="Har du allerede gitt papirsykmeldingen videre?"
                value={harGittVidere}
                onChange={(value: 'Ja' | 'Nei') => {
                    if (harGittVidere) {
                        logEvent({ eventName: 'skjema startet', data: { skjemanavn } }, { 'har gitt videre': value })
                    }

                    setHarGittVidere(value)
                }}
            >
                <Radio value="Ja">Ja</Radio>
                <Radio value="Nei">Nei</Radio>
            </RadioGroup>

            {harGittVidere === 'Ja' && (
                <Spacing direction="top">
                    <Spacing amount="small">
                        <Alert variant="info">
                            <Spacing amount="small">
                                <BodyLong>
                                    Hør med arbeidsgiveren din om det er greit at du sender sykmeldingen herfra i
                                    stedet. Det er en fordel for begge: Da får dere alt her, både sykepengesøknaden og
                                    andre meldinger som handler om sykefraværet. Papirsykmeldingen kan du legge bort.
                                    Det du gjør her, erstatter papiret.
                                </BodyLong>
                            </Spacing>
                            <Label>
                                Hvis du får ja fra arbeidsgiveren din kan du fortsette utfyllingen på denne siden. Hvis
                                du i stedet skal fortsette med papiret må du avbryte denne sykmeldingen.
                            </Label>
                        </Alert>
                    </Spacing>

                    <Button loading={loading} onClick={() => avbryt()}>
                        Avbryt sykmeldingen
                    </Button>

                    {error && (
                        <Spacing direction="top">
                            <Alert variant="error">
                                En feil oppstod som gjorde at sykmeldingen ikke kunne avbrytes. Prøv igjen senere.
                            </Alert>
                        </Spacing>
                    )}
                </Spacing>
            )}

            {harGittVidere === 'Nei' && (
                <Spacing direction="top">
                    <Alert variant="info">
                        <Label>Da kan du sende sykmeldingen herfra</Label>
                        <BodyLong>
                            Under sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige
                            om? Du velger selv om du vil bruke sykmeldingen.
                        </BodyLong>
                    </Alert>
                </Spacing>
            )}
        </>
    )
}

export default PapirInfoheader
