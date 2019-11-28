import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Stitch, RemoteMongoClient} from "mongodb-stitch-browser-sdk"
import "../styles/messages.sass"
import ScrollToBottom from "react-scroll-to-bottom"

const Message = (props) => {
    if (props.message) {
        return (
            <div>
                <div className={'message_container'}><span>{props.message.message}</span></div>
                <i><p className={'sender_p'}>{props.message.sender}</p></i>
            </div>
        )
    } else {
        return (<></>)
    }
}

const Messages = (props) => {

    useEffect(() => {
        const streaming = async () => {
            const app = Stitch.defaultAppClient;
            const mongoDB = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
            const pacientesCollection = mongoDB.db('RIAT_DB').collection('pacientes');

            const stream = await pacientesCollection.watch();
            stream.onNext((event) => {
                let pacientesToUpdate = props.pacientes.slice();
                for (let i = 0; i < pacientesToUpdate.length; i++) {
                    if (pacientesToUpdate[i].nome === event.fullDocument.nome) {
                        pacientesToUpdate[i].chat = event.fullDocument.chat;
                    }
                    if (props.selectedRoom.nome === event.fullDocument.nome) {
                        props.selectRoom(pacientesToUpdate[i])
                    }
                    props.setPacientes(pacientesToUpdate)
                }
            })
        }
        streaming();
    });

    if (props.selectedRoom.chat) {
        return (
            <ScrollToBottom mode={'bottom'} className={'messages_chat'}>
                {"messages" in props.selectedRoom.chat ? props.selectedRoom.chat.messages.map((message) => (
                    <Message message={message}/>
                )): <></>}
            </ScrollToBottom>
        )
    } else {
        return (<p>Not found</p>)
    }

};

const mapStateToProps = (state) => ({
    selectedRoom: state.chat.selectedRoom,
    pacientes: state.pacientes.pacientes
});

const mapDispatchToProps = (dispatch) => ({
    setPacientes: (pacientes) => dispatch({type: 'SET_PACIENTES', payload: pacientes}),
    selectRoom: (room) => dispatch({type: 'SELECT_ROOM', payload: room})
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages)