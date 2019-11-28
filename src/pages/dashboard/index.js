import React from 'react'
import Sidebar from "../../general/components/sidebar/sidebar";
import Topbar from "../../general/components/topbar/topbar";
import CardTop from "./components/card_top";
import "./styles/index.sass"
import CardCrescimento from "./components/card_crescimento";
import CardTasks from "./components/card_tasks";
import {connect} from "react-redux";
import {Redirect} from "react-router";

const DashboardPage = (props) => {

    const cardTopData = [
        {
            amount: props.profissionais.length,
            type: 'Profissionais Cadastrados'
        },
        {
            amount: props.instituicoes.length,
            type: 'Instituições Cadastradas'
        },
        {
            amount: props.pacientes.length,
            type: 'Pacientes Cadastrados'
        }
    ]

    if (props.userData) {
        return (
            <div className={'full_container'}>
                <Sidebar/>
                <Topbar/>
                <div className={'page_container'}>
                    <p></p>
                    <div className={'cards_top_container'}>
                        {
                            cardTopData.map((data, index) => (
                                <CardTop data={data} key={index}/>
                            ))
                        }
                    </div>
                    <div className={'cards_bottom'}>
                        <CardCrescimento/>
                        <CardTasks/>
                    </div>
                </div>
            </div>)
    } else {
        return (<Redirect to={'/'} />)
    }
}

const mapStateToProps = (state) => ({
    users: state.general.users,
    userData: state.login.userData,
    profissionais: state.profissionais.profissionais,
    instituicoes: state.instituicoes.instituicoes,
    pacientes: state.pacientes.pacientes,
})

const mapDispatchToProps = (dispatch) => ({
    updateUsers: (users) => dispatch({type: 'GET_USERS', payload: users})
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)