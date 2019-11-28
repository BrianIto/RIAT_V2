const initialState = {
    pacientes: [],
    pacienteSelected: {}
}

const PacientesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_PACIENTE':
            return { ...state, pacienteSelected: action.payload }
        case 'SET_PACIENTES':
            return {...state, pacientes: action.payload}
        default:
            return state;
    }
}

export default PacientesReducer