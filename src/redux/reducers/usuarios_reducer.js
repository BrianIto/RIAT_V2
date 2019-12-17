import {Actions} from "../actions";

const initialState = {
    usuarios: [],
    isLoadingUsuarios: false
}

const UsuariosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_USUARIOS':
            return { ...state, isLoadingUsuarios: true };
        case Actions.setUsuarios:
            return { ...state, usuarios: action.payload, isLoadingUsuarios: false };
        default:
            return state;
    }
}

export default UsuariosReducer