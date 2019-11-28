import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {RemoteMongoClient, Stitch, UserPasswordAuthProviderClient} from "mongodb-stitch-browser-sdk";
import axios from 'axios';
import * as qs from 'query-string';

const NewMedicoPage = props => {

  const [id, setId] = useState(qs.parse(props.location.search).id);

  const createNewUser = (email, password) => {
    try {

      const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory)

      emailPassClient.registerWithEmail(email, password)
          .then((res) => {
              alert('Pronto, você já pode logar no Aplicativo utilizando seu E-mail!');
            })
          .catch((err) => {
              alert('erro: ' + err);
          })
        } catch(err) {
          alert('try catch: '+ err);
        }
  };

  const handleSubmit = e => {
    const form = e.target;
    e.preventDefault();

    if (form.new_password.value === form.new_password_confirm.value) {
      axios
        .post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/psis/incoming_webhook/getPsiFromId',
        {medicoId: {$oid: id}})
        .then((res) => {
          createNewUser(res.data.email, form.new_password.value);
        })
        .catch(err => alert(err));
    } else {
      alert('Erro! Senhas não são compatíveis.');
    }
  }

  return (
    <div className={'container_reset_password'}>
        <div className={'card_reset_password'}>
            <h1><img src={require('../../../assets/logo2.png')}/></h1>
            <h1></h1>
            <h2>Cadastre sua senha</h2>
            <form onSubmit={handleSubmit}>

                <TextField
                  type={'password'}
                  label={'Senha'}
                  name='new_password'
                  variant={'outlined'}/>
                <br/><br/>
                <TextField
                  type={'password'}
                  label={'Confirmar Senha'}
                  name='new_password_confirm'
                  variant={'outlined'}/>
                <p>
                  <Button type={'submit'} variant={'contained'} color={'primary'}>Confirmar Senha</Button>
                </p>
            </form>
        </div>
    </div>
  )
}

export default NewMedicoPage;
