import React, {useState, useEffect} from 'react'
import Topbar from "../../general/components/topbar/topbar";
import Sidebar from "../../general/components/sidebar/sidebar";
import Tabs from "./components/tabs";
import TableATs from "./components/table_ats";
import TableOSTs from "./components/table_osts";
import TableCuidadores from "./components/table_cuidadores";
import {connect} from 'react-redux';
import axios from "axios";
import {Redirect} from "react-router";
import TablePendentes from "./components/table_pendentes";

const tabsData = [
    {
        name: 'TODOS'
    },
    {
        name: 'ASSISTENTES TERAPÊUTICOS'
    },
    {
        name: 'OSTs'
    },
    {
        name: 'Cuidadores'
    },
    {
        name: 'PENDENTES'
    }
];

const renderTablesAccordinglyToTabs = (tabSelected, props) => {
    switch (tabSelected) {
        case 0:
            if (props.isLoadingGetting) {
                return (<h2>Carregando...</h2>)
            }
            return (
                <div>
                    <TableATs profissionais={props.profissionais}/>
                    <TableOSTs profissionais={props.profissionais}/>
                    <TableCuidadores profissionais={props.profissionais}/>
                </div>
            )
        case 1:
            if (props.isLoadingGetting) {
                return (<h2>Carregando...</h2>)
            }
            return (<TableATs profissionais={props.profissionais}/>)
        case 2:
            if (props.isLoadingGetting) {
                return (<h2>Carregando...</h2>)
            }
            return (
                <TableOSTs profissionais={props.profissionais}/>
            )
        case 3:
            if (props.isLoadingGetting) {
                return (<h2>Carregando...</h2>)
            }
            return (
                <TableCuidadores profissionais={props.profissionais}/>
            )
        case 4:
            if (props.isLoadingGetting) {
                return (<h2>Carregando...</h2>)
            }
            return ( <TablePendentes profissionais={props.profissionais}/>)
        default:
            if (props.isLoadingGetting) {
                return (<h2>Carregando...</h2>)
            }
            return (
                <div>
                    <TableATs profissionais={props.profissionais}/>
                    <TableOSTs profissionais={props.profissionais}/>
                    <TableCuidadores profissionais={props.profissionais}/>
                </div>
            )
    }
}

const ProfissionaisPage = (props) => {

    const [tabSelected, selectTab] = useState(0)
    
    if (props.userData) {
        return (
            <div className={'full_container'}>
                <Topbar/>
                <Sidebar/>
                <div className={'page_container'}>
                    <h1>Profissionais Cadastrados</h1>
                    <p>Nesta página se localizam todos os profissionais que estão cadastrados no sistema.</p>
                    <Tabs tabSelected={tabSelected} selectTab={selectTab} tabsData={tabsData}/>
                    {renderTablesAccordinglyToTabs(tabSelected, props)}
                </div>
            </div>
        )
    } else {
        return (<Redirect to={'/'}/>)
    }
}

const mapStateToProps = (state) => ({
    profissionais: state.profissionais.profissionais,
    isLoadingGetting: state.profissionais.isLoadingGetting,
    userData: state.login.userData
});

export default connect(mapStateToProps)(ProfissionaisPage)