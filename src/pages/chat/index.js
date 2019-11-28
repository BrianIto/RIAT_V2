import React from 'react';
import Topbar from "../../general/components/topbar/topbar";
import Sidebar from "../../general/components/sidebar/sidebar";
import { connect } from "react-redux"
import ChatRooms from "./components/rooms";
import {Redirect} from "react-router";
import Messages from "./components/messages";
import SendMessage from "./components/send_message";

const ChatPage = (props) => {
    if (props.userData) {
        return (
            <div className={'full_container'}>
                <Topbar/>
                <Sidebar/>
                <div className={'page_container chat_page'}>
                    <ChatRooms />
                    <Messages />
                    <SendMessage/>
                </div>
            </div>
        )
    } else {
        return (<Redirect to={'/'} />)
    }
}

const mapStateToProps = (state) => ({
    userData: state.login.userData
})

const mapDispatchToProps = (dispatch) => ({
    showModal: (modalType, modalSize) => dispatch({type: 'SHOW_MODAL', payload: modalType, size: modalSize})
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)