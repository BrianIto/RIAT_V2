const initialState = {
    selectedRoom: {}
}

const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_ROOM':
            return {...state, selectedRoom: action.payload }
        default:
            return state
    }
}

export default ChatReducer