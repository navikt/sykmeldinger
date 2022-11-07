import { NextApiRequest, NextApiResponse } from 'next'

import { sykmeldingApen } from '../../../server/graphql/mockData/sykmelding-apen'
import {
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
    Periodetype,
} from '../../../server/graphql/resolver-types.generated'
import mockDb from '../../../server/graphql/mockDb'
import { SykmeldingSchema } from '../../../server/api-models/sykmelding/Sykmelding'
import { isLocalOrDemo } from '../../../utils/env'

type Input =
    | {
          isAdvanced: false
          user: string
          id: string
          arbeidsgiverNavn: string
          periodeFom: string
          periodeTom: string
      }
    | {
          isAdvanced: true
          user: string
          sykmelding: string
      }

const createMockData = (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method !== 'POST' || !isLocalOrDemo) {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }

    const values: Input = JSON.parse(req.body)

    if (!mockDb().hasUser(values.user)) {
        res.status(400).json({ message: 'User not found' })
        return
    }

    if (!values.isAdvanced) {
        const sykmelding = sykmeldingApen()
        sykmelding.id = values.id
        sykmelding.arbeidsgiver = {
            navn: values.arbeidsgiverNavn,
            stillingsprosent: 100,
        }
        sykmelding.sykmeldingsperioder = [
            {
                fom: values.periodeFom,
                tom: values.periodeTom,
                type: Periodetype.AktivitetIkkeMulig,
                behandlingsdager: null,
                gradert: null,
                innspillTilArbeidsgiver: null,
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        arsak: [MedisinskArsakType.Annet, MedisinskArsakType.AktivitetForverrerTilstand],
                        beskrivelse: 'Dette er en beskrivelse av den medisinske årsaken.',
                    },
                    arbeidsrelatertArsak: {
                        arsak: [ArbeidsrelatertArsakType.Annet],
                        beskrivelse: 'Dette er en beskrivelse av den arbeidsrelaterte årsaken',
                    },
                },
                reisetilskudd: false,
            },
        ]

        const safeParse = SykmeldingSchema.safeParse(sykmelding)
        if (!safeParse.success) {
            res.status(400).json({ message: 'Invalid data', error: safeParse.error })
            return
        }

        const newArbeidsgiverOrgNummer = `${Math.floor(100000000 + Math.random() * 900000000)}`
        mockDb().addSykmelding(values.user, sykmelding)
        mockDb().addArbeidsgiver(values.user, {
            navn: values.arbeidsgiverNavn,
            stillingsprosent: '100%',
            orgnummer: newArbeidsgiverOrgNummer,
            juridiskOrgnummer: newArbeidsgiverOrgNummer,
            aktivtArbeidsforhold: true,
            stilling: 'Arbeider',
            naermesteLeder: {
                navn: 'Din Nærmeste Leder',
                epost: 'test@example.com',
                aktoerId: '1101101101102',
                mobil: '110',
                orgnummer: '110110110',
                organisasjonsnavn: 'Brannstasjon',
                aktivTom: null,
                arbeidsgiverForskuttererLoenn: true,
            },
        })

        res.status(200).json({
            message: `OK2K`,
            id: values.id,
        })
    } else {
        const safeParse = SykmeldingSchema.safeParse(JSON.parse(values.sykmelding))
        if (!safeParse.success) {
            res.status(400).json({ message: 'Invalid data', error: safeParse.error })
            return
        }

        const newArbeidsgiverOrgNummer = `${Math.floor(100000000 + Math.random() * 900000000)}`
        mockDb().addSykmelding(values.user, safeParse.data)
        mockDb().addArbeidsgiver(values.user, {
            navn: safeParse.data.arbeidsgiver?.navn ?? 'Arbeid Giversen AS',
            stillingsprosent: '100%',
            orgnummer: newArbeidsgiverOrgNummer,
            juridiskOrgnummer: newArbeidsgiverOrgNummer,
            aktivtArbeidsforhold: true,
            stilling: 'Arbeider',
            naermesteLeder: {
                navn: 'Din Nærmeste Leder',
                epost: 'test@example.com',
                aktoerId: '1101101101102',
                mobil: '110',
                orgnummer: '110110110',
                organisasjonsnavn: 'Brannstasjon',
                aktivTom: null,
                arbeidsgiverForskuttererLoenn: true,
            },
        })

        res.status(200).json({
            message: `OK2K`,
            id: safeParse.data.id,
        })
    }
}

export default createMockData
