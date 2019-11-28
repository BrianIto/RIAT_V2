import React from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "./sidebar.sass"
import {Tooltip} from "@material-ui/core";

// Altere as opções da Sidebar abaixo. OBJECT: { pageName, route, component }
// Talvez no futuro isso vire um state para fazer tratamento de permissões.

const sidebarOptions = [
    {
        pageName: 'DASHBOARD',
        route: '/',
        component: <i className={'fas fa-chart-bar'}/>
    },
    {
        pageName: 'PACIENTES',
        route: '/pacientes',
        component: <i className={'fas fa-user-injured'}/>
    },
    {
        pageName: 'PROFISSIONAIS',
        route: '/profissionais',
        component: <i className={'fas fa-user-md'} />
    },
    {
        pageName: 'USUÁRIOS',
        route: '/users',
        component: <i className={'fas fa-key'} />
    },
    {
        pageName: 'FINANCEIRO',
        route: '/financeiro',
        component: <i className={'fas fa-dollar-sign'} />
    },
    {
        pageName: 'INSTITUIÇOES',
        route: '/instituicoes',
        component: <i className={'fas fa-hospital'} />
    },
    {
        pageName: 'CHAT',
        route: '/chat',
        component: <i className={'fas fa-comments'}/>
    }];


//COMPONENTIZADO. Por favor, não mexer tanto. (:
const Sidebar = (props) => (
    <div className={'sidebar_container'}>
        {
            sidebarOptions.map((item, index) => (
                <Tooltip  key={index} title={item.pageName} placement={'right'}>
                <div className={props.actualPage === item.pageName ? 'menu_item active' : 'menu_item'}>
                    <Link to={item.route} onClick={() => {
                        props.changePage(item.pageName)
                    }}>
                        <div>
                            {item.component}
                        </div>
                    </Link>
                </div>
                </Tooltip>

            ))
        }
    </div>
)

const mapStateToProps = (state) => ({
    actualPage: state.general.actualPage
})

const mapDispatchToProps = (dispatch) => ({
    changePage: (page) => dispatch({type: 'CHANGE_PAGE', payload: page})
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
