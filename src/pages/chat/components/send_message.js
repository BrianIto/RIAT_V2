import React from "react"
import {connect} from "react-redux";
import "../styles/send_message.sass"
import axios from "axios";

const SendMessage = (props) => {

    const onSubmitHandle = (e) => {

        const form = e.target;

        e.preventDefault();

        axios.post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/paciente/incoming_webhook/addMessage', { pacienteId: props.selectedRoom._id, message: form.message.value, sender: 'Adm - '+props.userData.name})
            .then(res => {
                console.log('message');
            })
            .catch((err) => {
                alert(err);
            })

    }

    return (
        <div className={'send_message_container'}>
            <form onSubmit={onSubmitHandle}>
                <input
                    name={'message'}
                    type={'text'}
                    placeholder={'Informe aqui sua mensagem...'}/>
                <button type={'submit'}><i className={'fas fa-paper-plane'}/></button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedRoom: state.chat.selectedRoom,
    userData: state.login.userData
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage)