import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import "./styles/style.sass";
import {getMedicos} from "../../DAOs/MedicoDAO";
import {getInstituicao} from "../../DAOs/InstituicaoDAO";
import {getFamiliares} from "../../DAOs/FamiliarDAO";
import {setPacientes} from "../../DAOs/PacienteDAO";
import {getProfissionais} from "../../DAOs/ProfissionalDAO";
import Financeiro from "../../DAOs/FinanceiroDAO";

import {Actions} from "../../redux/actions";

import {connect} from "react-redux";

const LoadingPage = (props) => {

    const [carregando, setCarregando] = React.useState(0);

    useEffect(()=>{

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
            setCarregando(100)
        }).catch((err)=>{
            console.error(err);
        })
    }, []);

    if(carregando == 100){
        return (<Redirect to={'/dashboard'}/>)
    }else{
        return (<div className={"container_loading"}> 
            <img className={"spinner"} src ={require('../../assets/loading.png')}/>
            <p style={{color: '#FFF'}}>{carregando}</p>
        </div>)
    }
    
}

const mapDispatchToProps = (dispatch) => ({
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

export default connect(null, mapDispatchToProps)(LoadingPage);