const initialState = {
    actualPage: 'DASHBOARD',
    showModal: false,
    modalType: '',
    users: [],
    modalSize: 'sm',
    connectedToDB: false,
    sidebarOpen: false
}

const GeneralReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return { ...state, users: action.payload }
        case 'SIDEBAR_TOGGLE':
            return {...state, sidebarOpen: !state.sidebarOpen }
        case 'CHANGE_PAGE':
            return { ...state, actualPage: action.payload }
        case 'SHOW_MODAL':
            return { ...state, showModal: true, modalType: action.payload, modalSize: action.size }
        case 'CLOSE_MODAL':
            return { ...state, showModal: false }
        case 'CONNECTED_TO_DB':
            return { ...state, connectedToDB: true}
        default:
            return state
    }
}

export default GeneralReducer