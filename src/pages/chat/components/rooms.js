import React, {useEffect} from 'react'
import "../styles/rooms.sass"
import { connect } from "react-redux";

const Room = (props) => {
    return (
        <div className={ props.room.nombreCompleto === props.selectedRoom.nombreCompleto ? 'selected room' : 'room'} onClick={props.onClick}>
            <h3>{props.room.nombreCompleto}</h3>
        </div>
    )
}

const ChatRooms = (props) => {
    return (
        <div className={'chat_rooms'}>
            <h2>Pacientes</h2>
            {
                props.pacientes.map((paciente, index) => (
                    <Room
                        onClick={() => { props.selectRoom(paciente); } }
                        selectedRoom={props.selectedRoom}
                        room={paciente} />
                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedRoom: state.chat.selectedRoom,
    pacientes: state.pacientes.pacientes
})

const mapDispatchToProps = (dispatch) => ({
    selectRoom: (room) => dispatch({type: 'SELECT_ROOM', payload: room}),
    setPacientes: (pacientes) => dispatch({type: 'SET_PACIENTES', payload: pacientes})
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatRooms)