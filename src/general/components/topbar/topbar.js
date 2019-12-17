import React, {useState} from 'react';
import "./topbar.sass";
import { connect } from "react-redux";
import { IconButton, MenuItem } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import MoreVert from "@material-ui/icons/MoreVert"
import Menu from "@material-ui/core/Menu";
import {Actions} from "../../../redux/actions";
import {getMedicos} from "../../../DAOs/MedicoDAO";
import {getInstituicao} from "../../../DAOs/InstituicaoDAO";
import {getFamiliares} from "../../../DAOs/FamiliarDAO";
import Financeiro from "../../../DAOs/FinanceiroDAO";
import {setPacientes} from "../../../DAOs/PacienteDAO";
import {getProfissionais} from "../../../DAOs/ProfissionalDAO";

const Topbar = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const updateAllData = () => {
        setCarregando(true);
        //tela de loading
        let promiseMedicos = getMedicos(props);
        let promiseInstituicao =getInstituicao(props);
        let promiseFamiliares = getFamiliares(props);

        let promiseFinanceirosMesesFechados = Financeiro.getMesesFechados(res => {
            props.setMesesFechados(res)
        }, error => {
            alert("ERRO AO RECUPERAR MESES FECHADOS. INFO: "+error)
        }, () => {});
        let promiseSessoesFinanceiro = Financeiro.getSessoes(res => {
            props.setSessoes(res.data);
        }, err => alert('Erro ao recuperar sessoes. Erro: '+err));
        let promiseSaidasDb = Financeiro.getSaidasFromDB(res => {
            props.setSaidas(res.data);
        }, () => {
            alert("Erro ao recuperar as saídas do banco.")
        });
        let promiseSetPacientes = setPacientes(props);
        let promiseGetProfissionais = getProfissionais(props);
        const arrayDePromises = [promiseSaidasDb, promiseSessoesFinanceiro, promiseSetPacientes,
            promiseFamiliares, promiseMedicos, promiseInstituicao, promiseFinanceirosMesesFechados,
            promiseGetProfissionais];

        Promise.all(arrayDePromises).then(()=> {
            setCarregando(false);
        }).catch((err)=>{
            console.error(err);
        })
    }

    const handleClick = (e) => { setAnchorEl(e.target) };

    const handleClose = (e) => { setAnchorEl(null) };

    const logout = () => {
        localStorage.removeItem('login_user');
        localStorage.removeItem('login_password');
        props.setUser(null);
    }

    return (
    <div className={'topbar_container'}>
        <img alt='RIAT' src={require('../../../assets/logo2.png')} />
        <div className={'user_data'}>
            <div><IconButton className={carregando ? 'rotating' : ''} disabled={carregando} onClick={() => {
                updateAllData();
            }}>
                <i className={'fa fa-sync-alt'}/>
            </IconButton>{props.userData.name} <IconButton onClick={handleClick}><Icon><MoreVert /></Icon></IconButton> </div>
            <Menu open={Boolean(anchorEl)} keepMounted anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem  onClick={logout}>Sair &nbsp; &nbsp;</MenuItem>
            </Menu>
        </div>
    </div>
)}

const mapStateToProps = (state) => ({
    userData: state.login.userData
})

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch({type: 'SET_USER', payload: user}),
    setUserData: (userData) => dispatch({type: 'SET_USER', payload: userData}),
    setInstituicoes: (instituicoes) => dispatch({type: Actions.setInstituicoes, payload: instituicoes}),
    setMedicos: (medicos) => dispatch({type: 'SET_MEDICOS', payload: medicos}),
    setPacientes: (pacientes) => dispatch({type: 'SET_PACIENTES', payload: pacientes }),
    startGettingProfissionais: () => dispatch({type: 'START_GETTING_PROFISSIONAIS'}),
    setSaidas: saidas => dispatch({type: Actions.getSaidas, payload: saidas}),
    setSessoes: sessoes => dispatch({type: Actions.setSessoes, payload: sessoes}),
    getProfissionais: (profissionais) => dispatch({type: 'SET_PROFISSIONAIS', payload: profissionais}),
    setFamiliares: (familiares) => dispatch({type: 'SET_FAMILIARES', payload: familiares}),
    setMesesFechados: (mesesFechados) => dispatch({type: Actions.setMesesFechados, payload: mesesFechados})
})

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)