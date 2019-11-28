const initialState = {
    familiares: []
}

const FamiliaresReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FAMILIARES':
            return {...state, familiares: action.payload};
        default:
            return state
    }
}

export default FamiliaresReducer;