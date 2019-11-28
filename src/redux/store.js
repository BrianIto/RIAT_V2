import {combineReducers, createStore} from "redux";
import GeneralReducer from './reducers/general_reducer'
import ProfissionaisReducer from "./reducers/profissionais_reducer";
import LoginReducer from "./reducers/login_reducer";
import UsuariosReducer from "./reducers/usuarios_reducer";
import PacientesReducer from "./reducers/pacientes_reducer";
import ChatReducer from "./reducers/chat_reducer";
import InstituicaoReducer from "./reducers/instituicao_reducer";
import MedicosReducer from "./reducers/medicos_reducer";
import FamiliaresReducer from "./reducers/familiares_reducer";
import FinanceiroReducer from "./reducers/financeiro_reducer";

const Store = createStore(combineReducers({
    general: GeneralReducer,
    profissionais: ProfissionaisReducer,
    login: LoginReducer,
    pacientes: PacientesReducer,
    usuarios: UsuariosReducer,
    familiares: FamiliaresReducer,
    instituicoes: InstituicaoReducer,
    financeiro: FinanceiroReducer,
    chat: ChatReducer,
    medicos: MedicosReducer,
}));

export default Store;