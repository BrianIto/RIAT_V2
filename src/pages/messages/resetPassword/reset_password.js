import React, {useState} from "react"
import {Button, TextField} from "@material-ui/core";
import {RemoteMongoClient, Stitch, UserPasswordAuthProviderClient} from "mongodb-stitch-browser-sdk"
import "./reset_password.sass"

const ResetPasswordPage = (props) => {

    const [message, setMessage] = useState('Informe sua nova senha abaixo');

    const onSubmitForm = (event) => {
        event.preventDefault();

        const form = event.target;

        const password = form.new_password.value;

        console.log(password);
// Parse the URL query parameters
        const url = window.location.search;
        const params = new URLSearchParams(url);

        const token = params.get('token');
        const tokenId = params.get('tokenId');
        const newPassword = password;

// Confirm the user's email/password account
        const emailPassClient = Stitch.defaultAppClient.auth
            .getProviderClient(UserPasswordAuthProviderClient.factory);

        emailPassClient.resetPassword(token, tokenId, newPassword).then(() => {
            console.log("Successfully reset password!");
            setMessage('Resetar Senha')
        }).catch(err => {
            setMessage('Erro! '+err)
            console.log("Error resetting password:", err);
        });
    };

    return (
        <div className={'container_reset_password'}>
            <div className={'card_reset_password'}>
                <h1><img src={require('../../../assets/logo2.png')}/></h1>
                <h1>{message}</h1>
                <h2>Recuperar senha</h2>
                <form onSubmit={onSubmitForm}>
                    <TextField label={'Nova Senha'} name='new_password' variant={'outlined'}/>
                    <p><Button type={'submit'} variant={'contained'} color={'primary'}>Confirmar Nova Senha</Button></p>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordPage
