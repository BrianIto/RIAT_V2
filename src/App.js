import React, {useEffect} from 'react';
import './App.css';
import {Provider} from "react-redux";
import Store from "./redux/store";
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import DashboardPage from "./pages/dashboard/index"
import "@fortawesome/fontawesome-free/css/all.css"
import PacientesPage from "./pages/pacientes";
import ProfissionaisPage from "./pages/profissionais";
import FinanceiroPage from "./pages/financeiro/index"
import LoginPage from "./pages/login/index";
import ChatPage from "./pages/chat/index";
import NewMedicoPage from './pages/messages/newMedico/index';
import UsersPage from "./pages/users/index";
import InstituicoesPage from "./pages/instituicoes/index";
import ModalFather from "./general/components/modal_father/modal_father";
import {Stitch} from "mongodb-stitch-browser-core";
import {RemoteMongoClient} from "mongodb-stitch-browser-services-mongodb-remote";
import ConfirmEmailPage from "./pages/messages/confirmEmail/confirm_email";
import ResetPasswordPage from "./pages/messages/resetPassword/reset_password";
import DetalhesFinanceiroPage from "./pages/detalhes_financeiro";
import ConfirmarPagamento from "./pages/messages/confirmar_pagamento";

const App = () => {

    useEffect(() => {

        const initializeClient = async () => {
            await Stitch.initializeDefaultAppClient('riat-sfhra');
            const db = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('RIAT_DB')
            Store.dispatch({type: "CONNECTED_TO_DB"});
        }

        initializeClient();
    }, []);

    return (
        <Provider store={Store}>
            <Router>
                <Switch>
                    <Provider store={Store}>
                        <Route path={'/'} exact={true} component={LoginPage}/>
                        <Route path={'/dashboard'} component={DashboardPage}/>
                        <Route path={'/pacientes'} component={PacientesPage}/>
                        <Route path={'/profissionais'} component={ProfissionaisPage}/>
                        <Route path={'/users'} component={UsersPage}/>
                        <Route path={'/detalhes_financeiro'} component={DetalhesFinanceiroPage} />
                        <Route path={'/financeiro'} component={FinanceiroPage} />
                        <Route path={'/chat'} component={ChatPage} />
                        <Route path={'/instituicoes'} component={InstituicoesPage} />
                        <Route path={'/confirmarPagamento'} component={ConfirmarPagamento} />
                        <Route path={'/resetPassword'} component={ResetPasswordPage} />
                        <Route path={process.env.PUBLIC_URL+'/newMedico'} component={NewMedicoPage} />
                        <Route path={process.env.PUBLIC_URL+'/confirmEmail'} component={ConfirmEmailPage}/>
                        <ModalFather />
                    </Provider>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
