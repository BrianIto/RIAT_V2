const initialState = {
    medicos: []
}

const MedicosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MEDICOS':
            return {...state, medicos: action.payload}
        default:
            return state;
    }
}

export default MedicosReducer