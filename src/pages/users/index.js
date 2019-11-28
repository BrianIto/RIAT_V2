import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router";
import Sidebar from "../../general/components/sidebar/sidebar";
import Topbar from "../../general/components/topbar/topbar";
import Tabs from "./components/tabs";
import Fab from "@material-ui/core/Fab"
import NoDocuments from "./components/no_documents";
import {makeStyles, Tooltip} from "@material-ui/core";
import axios from "axios";
import TableUsersAll from "./components/table_users_all";

const tabsData = [{name: 'TODOS'}, {name: 'CONTROLADURÍA'}, {name: 'ADMINISTRATIVOS'}, {name: 'TERAPÊUTICO'}];

const useStyles = makeStyles(theme => ({
    fab: {
        position:'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3)
    }
}));

const UsersPage = (props) => {

    const [tabSelected, selectTab] = useState(0);
    const [loadingUsers, setLoading] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setLoading(true);
        props.loadingUsuarios();
        axios.get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/usuarios/incoming_webhook/admFind')
            .then((res) => {
                setLoading(false);
                props.setUsuarios(res.data);
            })
            .catch(err => {
                setLoading(false);
               props.setUsuarios([]);
               alert('Error getting users');
            });
    }, []);

    if (props.userData) {
        return (
            <div className={'full_container'}>
                <Sidebar />
                <Topbar />
                <div className={'page_container'}>
                    <h1>Usuários Administrativos</h1>
                    <p>Crie, apague ou altere dados cadastrais e permissões de usuário.</p>
                    <Tabs tabsData={tabsData} selectTab={selectTab} tabSelected={tabSelected}/>
                    { loadingUsers ?  <h2>Carregando...</h2> : ( props.usuarios.length > 0 ? <TableUsersAll users={props.usuarios} tabSelected={tabSelected}/> : <NoDocuments /> )}
                </div>
                <Tooltip title={'Adicionar'} placement={'left'}>
                <Fab
                    color={"primary"}
                    className={classes.fab}
                    onClick={(e) => {
                        props.showModal('NEW_USER_MODAL', 'sm');
                    }}>
                    <i className={'fas fa-plus'} />
                </Fab>
                </Tooltip>
            </div>
        )
    } else {
        return (<Redirect to={'/'} />)
    }
}

const mapStateToProps = (state) => ({
    userData: state.login.userData,
    usuarios: state.usuarios.usuarios,

});

const mapDispatchToProps = (dispatch) => ({
    setUsuarios: (usuarios) => dispatch({type: 'SET_USUARIOS', payload: usuarios}),
    loadingUsuarios: () => dispatch({type: 'LOADING_USUARIOS'}),
    showModal: (modalType, modalSize) => dispatch({type: 'SHOW_MODAL', payload: modalType, size: modalSize})
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)