import {Actions} from "../actions";

const initialState = {
    instituicoes: [],
    instituicaoSelected: {},
};

const InstituicaoReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.setInstituicoes:
            return {...state, instituicoes: action.payload};
        case 'SELECT_INSTITUICAO':
            return {...state, instituicaoSelected: action.payload};
        default:
            return state;
    }

}

export default InstituicaoReducer