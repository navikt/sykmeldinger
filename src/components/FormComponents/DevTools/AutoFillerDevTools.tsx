import * as R from 'remeda'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { PaperclipIcon } from '@navikt/aksel-icons'
import { Chat } from '@navikt/ds-react'

import { FormValues } from '../../SendSykmelding/SendSykmeldingForm'
import { raise } from '../../../utils/ts-utils'
import useBrukerinformasjonById from '../../../hooks/useBrukerinformasjonById'

interface Props {
    sykmeldingId: string
}

function AutoFillerDevTools({ sykmeldingId }: Props): ReactElement | null {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [shouldShow, setShouldShow] = useState(false)
    const { setValue } = useFormContext<FormValues>()
    const extraFormDataQuery = useBrukerinformasjonById(sykmeldingId)

    const handleAutoFill = useCallback((): void => {
        const values = {
            erOpplysningeneRiktige: 'YES',
            arbeidssituasjon: 'ARBEIDSTAKER',
            arbeidsgiverOrgnummer:
                extraFormDataQuery.data?.brukerinformasjon.arbeidsgivere[0].orgnummer ??
                raise('Tried to devtool-auto-fill without arbeidsgiver'),
            riktigNarmesteLeder: 'YES',
            egenmeldingsdager: [{ harPerioder: 'NO', datoer: null, hasClickedVidere: null }],
            focusButton: true,
        }

        R.keys(values).forEach((key, index) => {
            setTimeout(() => {
                if (key === 'focusButton') {
                    // last step
                    const button = document.getElementById('send-sykmelding-button')
                    button?.focus()
                    button?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    return
                }

                setValue(key, values[key] as never, { shouldDirty: true, shouldTouch: true })
                document.getElementById(key)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 250 * index)
        })
    }, [extraFormDataQuery.data?.brukerinformasjon.arbeidsgivere, setValue])

    // enable when user presses Y, remember to clean up effects
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'y') {
                if (shouldShow) {
                    handleAutoFill()
                    return
                } else {
                    setShouldShow(true)
                    return
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [handleAutoFill, shouldShow])

    useEffect(() => {
        buttonRef.current?.focus()
        buttonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [shouldShow])

    if (!shouldShow) return null

    return (
        <button ref={buttonRef} className="rounded-3xl p-8 focus:shadow-2xl" role="button" onClick={handleAutoFill}>
            <Chat avatar={<PaperclipIcon className="animate-bounce" />} name="Clippy" timestamp="Akkurat nå">
                <Chat.Bubble>
                    Hei! Det ser ut som du fyller ut et skjema i dev. Vil du at jeg skal fylle det ut automatisk for
                    deg? Trykk på Y eller klikk på meg. :-)
                </Chat.Bubble>
            </Chat>
        </button>
    )
}

export default AutoFillerDevTools
