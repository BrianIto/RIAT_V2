const initialState = {
    profissionais: [],
    isLoadingGetting: false
}

const ProfissionaisReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_GETTING_PROFISSIONAIS':
            return { ...state, isLoadingGetting: true }
        case 'SET_PROFISSIONAIS':
            return { ...state, profissionais: action.payload, isLoadingGetting: false }
        default:
            return state
    }
}

export default ProfissionaisReducer