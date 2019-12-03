import {Actions} from "../actions";

const initialState = {
    saidas: [],
    mesSelected: {},
    sessoesInstituicao: [],
    sessoes: [],
    financialData: [],
    lucroFromInstMes: [],
    instituicoesComSessoes: [],
}

const FinanceiroReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.getSaidas:
            return {...state, saidas: action.payload }
        case Actions.setFinanceiroMes:
            return {...state, mesSelected: action.payload}
        case Actions.setSessoesInstituicao:
            return {...state, sessoesInstituicao: action.payload};
        case Actions.setSessoes:
            return {...state, sessoes: action.payload};
        case Actions.setFinancialData:
            return {...state, financialData: action.payload};
        case Actions.setLucroFromInstMes:
            return {...state, lucroFromInstMes: action.payload};
        case Actions.setInstituicoesComSessoes:
            return {...state, instituicoesComSessoes: action.payload};
        case Actions.setMesSelected:
            return {...state, mesSelected: action.payload};
            default:
            return state
    }
}

export default FinanceiroReducer