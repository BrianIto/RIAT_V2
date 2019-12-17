import {Actions} from "../actions";

const initialState = {
    profissionais: [],
    isLoadingGetting: false,
    profissionalSelected: {},
}

const ProfissionaisReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_GETTING_PROFISSIONAIS':
            return { ...state, isLoadingGetting: true }
        case Actions.setProfissionais:
            return { ...state, profissionais: action.payload, isLoadingGetting: false }
        case Actions.selectProfissional:
            return { ...state, profissionalSelected: action.payload};
            default:
            return state
    }
}

export default ProfissionaisReducer