import React, { useState } from "react";
import {connect} from 'react-redux';
import {Stitch, UserPasswordAuthProviderClient } from "mongodb-stitch-browser-sdk"
import {Button, Select, TextField} from "@material-ui/core";



const ModalForgetPassword = (props) => {

    const [isLoading, load] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        load(true);

        const form = e.target;

        const emailPassClient = Stitch.defaultAppClient.auth
            .getProviderClient(UserPasswordAuthProviderClient.factory);

        emailPassClient.sendResetPasswordEmail(form.email_resend.value).then(() => {
            alert("Successfully sent password reset email!");
            load(false);
        }).catch(err => {
            load(false);
            alert("Error sending password reset email:", err);
        });
    }

    return (
        <div>
            <div className={'modal_header'}>
                <h2>Recuperar Senha <i className={'fa fa-times'} onClick={props.closeModal}/></h2>
            </div>
            <div className={'modal_body'}>
                <form onSubmit={handleSubmit}>
                    <p>Enviaremos um link de recuperação para o seu e-mail cadastrado, por favor, informe seu e-mail
                        abaixo.</p>
                    <TextField
                        label={'E-mail'}
                        name={'email_resend'}
                        variant={'outlined'}
                        fullWidth
                        required/>
                    <p align={'right'}>
                        <Button disabled={isLoading} type={'submit'} color={'primary'} variant={'contained'}>
                            {isLoading ? 'Carregando...' : 'Enviar Email' }
                        </Button>
                    </p>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({type: "CLOSE_MODAL"})
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForgetPassword)