import React, {useEffect, useState} from "react"
import "./confirm_email.sass"
import { Button } from "@material-ui/core"
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {RemoteMongoClient, Stitch, UserPasswordAuthProviderClient} from "mongodb-stitch-browser-sdk"
import * as qs from 'query-string';
let i = 0;

const ConfirmEmailPage = (props) => {

    const [counter, updateCounter] = useState(10);
    const [message, setMessage] = useState('Algo deu errado...')

    useEffect(() => {
            setTimeout(() => {
                updateCounter(counter - 1);
            }, 1000)
    });

    //get the tokens params
    useEffect(() => {

        if (props.connectedToDB && i === 0) {
            // eslint-disable-next-line no-restricted-globals
            const params = new URLSearchParams(location.search);
            let x = qs.parse(window.location.hash);
            const token = x['/confirmEmail?token'];
            const tokenId = x['tokenId'];
            //confirm user by token and tokenId
            const emailPasswordClient = Stitch.defaultAppClient.auth
                .getProviderClient(UserPasswordAuthProviderClient.factory, "userpass")

            emailPasswordClient.confirmUser(token, tokenId)
                .then(() => { setMessage('E-mail confirmado com sucesso!'); i = 1; })
                .catch((err) => {
                    console.log('HASH------');
                    console.log(x);
                    console.log(window.location);
                    console.log('----URLSearchParams-----');
                    console.log(params);
                    console.log('----TOKEN-----');
                    console.log(token);
                    console.log('----TOKEN-ID--------');
                    console.log(tokenId);
                    setMessage('Erro: '+err);
                    i = 1;
                });
        }
    });



    if (counter === -1) {
        return (<Redirect to={'/'}/>);
    } else {
        return (
            <div className={'container_confirm_email'}>
                <div className={'card_confirm_email'}>
                    <h1><img src={require('../../../assets/logo2.png')}/></h1>
                    <h1>{message}</h1>
                    <p><Button variant={'contained'} color={'primary'}>Ir para página de Login</Button></p>
                    <span className={'secondary_style'}>Vocè será redirecionado automaticamente em {counter}s</span>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    connectedToDB: state.general.connectedToDB
})

export default connect(mapStateToProps)(ConfirmEmailPage)
