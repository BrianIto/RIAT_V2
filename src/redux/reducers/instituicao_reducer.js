const initialState = {
    instituicoes: [],
    instituicaoSelected: {},
};

const InstituicaoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INSTITUICOES':
            return {...state, instituicoes: action.payload};
        case 'SELECT_INSTITUICAO':
            return {...state, instituicaoSelected: action.payload};
        default:
            return state;
    }

}

export default InstituicaoReducer