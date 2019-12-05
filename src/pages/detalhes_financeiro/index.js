import React from "react"
import Sidebar from "../../general/components/sidebar/sidebar";
import Topbar from "../../general/components/topbar/topbar";
import {Redirect} from "react-router";
import { connect } from 'react-redux';
import DetalhePaciente from "./components/detalhe_paciente";
import DetalheInstituicao from "./components/detalhe_instituicao";
import "./styles/index.sass"
import {Actions} from "../../redux/actions";
import Financeiro from "../../DAOs/FinanceiroDAO";
import DetalheMes from "./components/detalheMes";
import moment from 'moment/min/moment-with-locales';
const DetalhesFinanceiroPage = (props) => {

    const [loading, setLoading] = React.useState(false);
    let todos = [];
    const setMeses = () => { let x = []; for (let i = 1; i < 13; ++i) { x.push(`${i}`) } return x; };
    const meses = setMeses();

    React.useEffect(() => {
        Financeiro.prepareDataForAnalysis(props.sessoes, data => {
            props.setFinancialData(data);
        });

    }, []);

    const getSessoesPorMes = (mes) => {
        let sessoes = [];
        mes.instituicoes.forEach(instituicao => {
            if('pacientes' in instituicao){
                instituicao.pacientes.forEach(paciente => {
                    paciente.acompanhantes.forEach(acompanhante => {
                        acompanhante.sessoes.forEach(sessao => {
                            sessoes.push(sessao)
                        })
                    })
                })
            }

        })

        return sessoes;
    }

    const mesesFechados = props.mesesFechados.map((mes=> (
            {...mes,
                sessoes: getSessoesPorMes(mes),
                aberto: false}
        )
    ));


    const mesesAbertos = meses.filter((mes, index)=>{
        const mapa = new Map();
        mesesFechados.forEach(val => {
            mapa.set(val.mes, 1);
        });
        if (mapa.get((moment(mes, 'MM').locale('pt-BR').format('MMMM / 2019')))){
            return false;
        }
        return true;
    }).map((mes)=>({mes, aberto: true }));

    moment.locale('pt-BR');
    todos = mesesFechados.concat(mesesAbertos);
    for(let i = 0;  i < todos.length; i++){
        let swapped = 0, aux;
        for (let j = 0; j < todos.length - i - 1; j++){
            let atual, prox;
            if(todos[j].mes.length > 3){
                atual = +moment(todos[j].mes, 'MMMM / YYYY').locale('pt-BR').format('M');
            }else{
                atual = +todos[j].mes;
            }
            if(todos[j+1].mes.length > 3){
                prox = +moment(todos[j+1].mes, 'MMMM / YYYY').locale('pt-BR').format('M');
            }else{
                prox = +todos[j+1].mes;
            }
            console.log(atual, prox);
            if(atual > prox){
                aux = todos[j];
                todos[j] = todos[j+1];
                todos[j+1] = aux;
                swapped = true;
            }
        }
        if(!swapped){
            break;
        }
    }


    /*
    *  moment.locale('pt-BR');
        console.log('comparando ', mes1, mes2);
        if(mes1.mes.length > 3 && mes1.mes.length > 3){
            let m1 = +moment(mes1.mes, 'MMMM / YYYY').locale('pt-BR').format('M');
            let m2 = +moment(mes2.mes, 'MMMM / YYYY').locale('pt-BR').format('M');
            return (+(m1)) < (+(m2));
        }else if(mes1.mes.length < 3 && mes2.mes.length < 3) {
            return (+(mes1.mes)) < (+(mes2.mes));
        }else if(mes1.mes.length < 3 && mes2.mes.length > 3){
            let m2 = +moment(mes2.mes, 'MMMM / YYYY').locale('pt-BR').format('M');
            return (+(mes1.mes)) < (+(m2));
        }else{
            let m1 = +moment(mes1.mes, 'MMMM / YYYY').locale('pt-BR').format('M');
            return (+(mes2.mes)) < (+(m1));
        }
    * */
    console.log(todos);


    if (props.userData) {
        return (
            <div className={'full_container'}>
                <Sidebar/>
                <Topbar/>
                <div className={'page_container container_detalhes_financeiro'}>
                    <h1 className={'page_title'}>Detalhes Financeiros - 2019</h1>
                    <p>Nesta página se localizam os detalhes do fluxo de caixa do ano corrente.</p>
                    {loading ? <p>Carregando...</p> : <></>}

                    { todos.map((mes, index) => {
                            if(mes.aberto){
                                return (<DetalheMes financialData={props.financialData}
                                                    monthStr={mes.mes}
                                                    sessoesInstituicao={props.sessoesInstituicao}
                                                    key={index}/>)
                            } else{
                                return (
                                    <DetalheMes financialData={todos}
                                                monthStr={mes.mes}
                                                sessoesInstituicao={mes.sessoes}
                                                key={index}/>
                                );
                            }
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (<Redirect to={'/'} />)
    }
}

const mapStateToProps = (state) => ({
    userData: state.login.userData,
    sessoesInstituicao: state.financeiro.sessoesInstituicao,
    sessoes: state.financeiro.sessoes,
    mesesFechados: state.financeiro.mesesFechados,
    financialData: state.financeiro.financialData,
})

const mapDispatchToProps = dispatch => ({
    setSessoesInstituicao: sessoes => dispatch({type: Actions.setSessoesInstituicao, payload: sessoes}),
    setFinancialData: financeiro => dispatch({type: Actions.setFinancialData, payload: financeiro}),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesFinanceiroPage)