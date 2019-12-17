import React, {useEffect, useState} from "react"
import {TextField, Button} from "@material-ui/core";
import "../styles/form.sass";
import {connect} from "react-redux";
import {Stitch, UserPasswordCredential, RemoteMongoClient} from "mongodb-stitch-browser-sdk";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {getMedicos} from "../../../DAOs/MedicoDAO";
import {getInstituicao} from "../../../DAOs/InstituicaoDAO";
import {getFamiliares} from "../../../DAOs/FamiliarDAO";
import {setPacientes} from "../../../DAOs/PacienteDAO";
import {getProfissionais} from "../../../DAOs/ProfissionalDAO";
import Financeiro from "../../../DAOs/FinanceiroDAO";
import {Actions} from "../../../redux/actions";
const FormLogin = (props) => {

    const [isLoading, makeItLoad] = useState(false);
    const [keepConnectedState, changeKeepConn] = useState(false);

    useEffect(() => {
        const credential = { user: localStorage.getItem('login_user'), password: localStorage.getItem('login_password') };

        if (props.connectedToDB) {
            if (credential.user && credential.password) {
                makeItLoad(true);
                Stitch.defaultAppClient.auth.loginWithCredential(new UserPasswordCredential(credential.user, credential.password))
                    .then((user) => {
                        axios.post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/usuarios/incoming_webhook/admUpsert',
                            {_id: {$oid: user.id}, email: credential.user })
                            .then(res => {
                                props.setUserData(res.data);
                            })
                            .catch((err) => {
                                alert(err.message);
                            })
                    })
                    .catch(err => {
                        alert('Usuário ou senha inválidos!');
                        localStorage.removeItem('login_user');
                        localStorage.removeItem('login_password');
                        makeItLoad(false);
                    });
            }
        }
    });

    return (
        <div className={'box_form'}>
            <form id={'form_login'} style={{textAlign: 'center'}} onSubmit={async (e) => {

                e.preventDefault()

                const form = e.target;

                const credential = new UserPasswordCredential(form.input_user.value, form.input_password.value)
                makeItLoad(true);

                Stitch.defaultAppClient.auth.loginWithCredential(credential)
                    .then((user) => {
                        console.log(user);
                        axios.post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/usuarios/incoming_webhook/admUpsert', {_id: {$oid: user.id}, email: form.input_user.value })
                            .then(res => {
                                if (keepConnectedState) {
                                    localStorage.setItem('login_user', form.input_user.value );
                                    localStorage.setItem('login_password', form.input_password.value );
                                }
                                props.setUserData(res.data);
                                makeItLoad(false);
                            })
                            .catch((err) => {
                                alert(err.error);
                                makeItLoad(false);
                            })
                    })
                    .catch(err => {
                        makeItLoad(false);
                        alert('Usuário ou senha inválidos!')
                    });

            }}>
                <TextField
                    name={'input_user'}
                    label={'Usuário'}
                    variant={'outlined'}
                    placeholder={'Ex: carlosalberto'}
                    fullWidth
                    required/><br/><br/>
                <TextField
                    name={'input_password'}
                    type={'password'}
                    label={'Senha'}
                    variant={'outlined'}
                    placeholder={'Ex: carlosalberto'}
                    fullWidth
                    required/><br/>
                <FormControlLabel
                    control={<Checkbox
                        checked={keepConnectedState}
                        onChange={changeKeepConn}
                        color={'primary'}
                        value={'checked'}/>}
                    label={'Mantenha-me conectado'}/>
                <Button
                    variant={'contained'}
                    type={'submit'}
                    disabled={isLoading}
                    color={'primary'}
                    fullWidth>
                    {isLoading ? 'Carregando...' : 'Confirmar'}
                </Button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userData: state.login.userData,
    connectedToDB: state.general.connectedToDB,
    mesesFechados: state.financeiro.mesesFechados
})

const mapDispatchToProps = (dispatch) => ({
    setUserData: (userData) => dispatch({type: 'SET_USER', payload: userData}),
    setInstituicoes: (instituicoes) => dispatch({type: 'SET_INSTITUICOES', payload: instituicoes}),
    setMedicos: (medicos) => dispatch({type: 'SET_MEDICOS', payload: medicos}),
    setPacientes: (pacientes) => dispatch({type: 'SET_PACIENTES', payload: pacientes }),
    startGettingProfissionais: () => dispatch({type: 'START_GETTING_PROFISSIONAIS'}),
    setSaidas: saidas => dispatch({type: Actions.getSaidas, payload: saidas}),
    setSessoes: sessoes => dispatch({type: Actions.setSessoes, payload: sessoes}),
    getProfissionais: (profissionais) => dispatch({type: 'SET_PROFISSIONAIS', payload: profissionais}),
    setFamiliares: (familiares) => dispatch({type: 'SET_FAMILIARES', payload: familiares}),
    setMesesFechados: (mesesFechados) => dispatch({type: Actions.setMesesFechados, payload: mesesFechados})
})

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)