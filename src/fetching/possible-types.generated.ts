export interface PossibleTypesResultData {
    possibleTypes: {
        [key: string]: string[]
    }
}
const result: PossibleTypesResultData = {
    possibleTypes: {
        SvarTypeUnion: ['ArbeidssituasjonSvar', 'DagerSvar', 'JaNeiSvar', 'PerioderSvar'],
    },
}
export default result
