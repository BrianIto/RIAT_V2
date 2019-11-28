import React from "react"
import {connect} from 'react-redux'
import Sidebar from "../../general/components/sidebar/sidebar";
import Topbar from "../../general/components/topbar/topbar";
import {Redirect} from "react-router";
import {Card, Grid} from "@material-ui/core";
import SaldoUp from "./components/saldo_up";
import CardLeft from "./components/card_left";
import CardRight from "./components/card_right";
import EntradaMensal from "./components/entrada_mensal";
import {Fab} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Actions} from "../../redux/actions";
import Financeiro from "../../DAOs/FinanceiroDAO";
import moment from "moment";

const FinanceiroPage = (props) => {

    const [finData, setCleanData] = React.useState({});

    React.useEffect(() => {
        Financeiro.getInstituicoesComSessoes(res => {
            let cleanData = res.data;
            console.log(cleanData);
            cleanData.forEach(instituicao => {
                let valorAT = 0;
                let valorFactura = 0;

                instituicao["lucro"] = new Array(12).fill(0);

               instituicao.sessoes.forEach(sessao => {
                   instituicao.lucro.forEach((mes, index) => {
                       let begin = new Date(sessao.horaInicio);
                       let end = new Date(sessao.horarioFim);
                       if (index === moment(begin).month()) {
                           let time = moment(moment(end).diff(moment(begin))).hours();
                           valorAT = time * Number(instituicao.valorHoraAT);
                           valorFactura = time * Number(instituicao.valorHora);
                           instituicao.lucro[moment(begin).month()] += valorFactura - valorAT;
                       }
                   })

                   console.log('================== comeon ====================');
                   console.log(instituicao.lucro);
               });

               props.setInstituicoesComSessoes(cleanData);
            });

        }, err => {
            alert('Erro ao recuperar dados do Financeiro! '+err)
        });
    }, [])

    if (props.userData) {
        return (
            <div className={'full_container'}>
                <Sidebar/>
                <Topbar/>
                <div className={'page_container container_financeiro'}>
                    <Link to={'/detalhes_financeiro'}>
                        <Fab color='primary' style={{position: 'fixed', bottom: 20, right: 20, zIndex: 1001}}>
                            <i className={'fas fa-edit'}/>
                        </Fab>
                    </Link>
                    <SaldoUp/>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <CardLeft/>
                        </Grid>
                        {/*<Grid item xs={6}>*/}
                        {/*    <CardRight />*/}
                        {/*</Grid>*/}
                    </Grid>
                    <EntradaMensal/>
                </div>
            </div>
        )
    } else {
        return (<Redirect to={'/'}/>)
    }
}

const mapStateToProps = (state) => ({
    userData: state.login.userData,
    instituicoesComSessoes: state.financeiro.instituicoesComSessoes,
});

const mapDispatchToProps = (dispatch) => ({
    setInstituicoesComSessoes: instituicoes => dispatch({
        type: Actions.setInstituicoesComSessoes,
        payload: instituicoes
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(FinanceiroPage)