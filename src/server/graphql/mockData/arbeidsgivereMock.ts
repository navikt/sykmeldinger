import { Arbeidsgiver } from '../../api-models/Arbeidsgiver'

const arbeidsgivereMock: Arbeidsgiver[] = [
    {
        naermesteLeder: {
            navn: 'Station Officer Steele',
        },
        navn: 'PONTYPANDY FIRE SERVICE',
        orgnummer: '110110110',
        aktivtArbeidsforhold: true,
    },
    {
        naermesteLeder: {
            navn: 'Brannmann Sam',
        },
        navn: 'ANDEBY BRANNSTATION',
        orgnummer: '110110112',
        aktivtArbeidsforhold: false,
    },
]

export default arbeidsgivereMock
