import React, {useEffect} from "react"
import Sidebar from "../../general/components/sidebar/sidebar";
import Topbar from "../../general/components/topbar/topbar";
import {Redirect} from "react-router";
import { connect} from "react-redux";
import {makeStyles} from "@material-ui/core";
import TableInstituicoes from "./components/table_instituicoes";
import axios from "axios";

const InstituicoesPage = (props) => {

    useEffect(() => {
        if (props.instituicoes.length === 0) {
            axios.get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/instituicao/incoming_webhook/getInstituicaoComFuncionario')
                .then(res => {
                    res.data.forEach(instituicao => {
                        axios
                            .post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/instituicao/incoming_webhook/getPacientes',
                            {instituicaoId: instituicao._id})
                            .then(r => {
                                instituicao['pacientes'] = r.data;
                                props.setInstituicoes(res.data);
                            });
                    });
                })
                .catch(err => { alert(err)})
        }
    });

    if (props.userData) {
        return (
            <div className={'full_container'}>
                <Sidebar/>
                <Topbar/>
                <div className={'page_container container_pacientes'}>
                    <h1>Instituições Cadastradas</h1>
                    <p>Nesta página se localizam todas as instituições que estão cadastrados no sistema.</p>
                    <TableInstituicoes />
                </div>
            </div>
        )
    } else {
        return (<Redirect to={'/'}/>)
    }
};

const mapStateToProps = (state) => ({
    userData: state.login.userData,
    instituicoes: state.instituicoes.instituicoes
});

const mapDispatchToProps = (dispatch) => ({
    setInstituicoes: (instituicoes) => dispatch({type: 'SET_INSTITUICOES', payload: instituicoes}),
    showModal: (modalType, modalSize) => dispatch({type: 'SHOW_MODAL', payload: modalType, size: modalSize})
})

export default connect(mapStateToProps, mapDispatchToProps)(InstituicoesPage)
