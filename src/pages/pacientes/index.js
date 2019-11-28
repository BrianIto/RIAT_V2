import React, {useEffect} from 'react'
import Sidebar from "../../general/components/sidebar/sidebar";
import Topbar from "../../general/components/topbar/topbar";
import TableSemAT from "./components/table_sem_at";
import TableSemMedicos from "./components/table_sem_medicos";
import TableGeneral from "./components/table_general";
import "./styles/tables_style.sass";
import { connect } from "react-redux";
import {Redirect} from "react-router";
import {setPacientes} from "../../DAOs/PacienteDAO";

const PacientesPage = (props) => {

    useEffect(() => {
        setPacientes(props);
    }, []);

    if (props.userData) {
        return (
            <div className={'full_container'}>
                <Sidebar/>
                <Topbar/>
                <div className={'page_container container_pacientes'}>
                    <h1>Pacientes Cadastrados</h1>
                    <p>Nesta página se localizam todos os pacientes que estão cadastrados no sistema.</p>
                    <TableSemAT pacientes={props.pacientes}/>
                    <TableSemMedicos pacientes={props.pacientes}/>
                    <TableGeneral pacientes={props.pacientes}/>
                </div>
            </div>
        )
    } else {
        return (<Redirect to={'/'} />)
    }
}


const mapStateToProps = (state) => ({
    userData: state.login.userData,
    pacientes: state.pacientes.pacientes
})

const mapDispatchToProps = (dispatch) => ({
    setPacientes: (pacientes) => dispatch({type: 'SET_PACIENTES', payload: pacientes })
})

export default connect(mapStateToProps, mapDispatchToProps)(PacientesPage)