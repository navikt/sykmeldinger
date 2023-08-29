interface State {
    activeResponseType: 'JA' | 'NEI' | 'FORBEDRING' | null
    textValue: string | null
    errorMessage: string | null
    isComplete: boolean
}

export const initialState = {
    activeResponseType: null,
    textValue: null,
    errorMessage: null,
    isComplete: false,
}
type FeedbackActions =
    | { type: 'error'; message: string }
    | { type: 'complete' }
    | { type: 'feedback-type'; value: State['activeResponseType'] }
    | { type: 'input'; value: string }

export function feedbackReducer(state: State, action: FeedbackActions): State {
    switch (action.type) {
        case 'error':
            return { ...state, errorMessage: action.message }
        case 'feedback-type':
            return { ...state, activeResponseType: action.value }
        case 'input':
            return { ...state, textValue: action.value }
        case 'complete':
            return { ...initialState, isComplete: true }
    }
}
