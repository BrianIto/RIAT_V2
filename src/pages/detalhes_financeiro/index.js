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

const DetalhesFinanceiroPage = (props) => {

    const [loading, setLoading] = React.useState(false);

    const setMeses = () => { let x = []; for (let i = 1; i < 13; ++i) { x.push(`${i}`) } return x; };
    const meses = setMeses();

    const SupremeObjectOfFinanceiro = () => {
        let array = new Array(meses.length);
        meses.forEach((mes, index) => {
            array[index] = {mes: mes, instituicoes: []};
            props.financialData.forEach((instituicao, i) => {
                array[index].instituicoes.push(instituicao);
            })
        });
        return array;
    }

    React.useEffect(() => {
        Financeiro.prepareDataForAnalysis(props.sessoes, data => {
            props.setFinancialData(data);
        });
    }, []);

    if (props.userData) {
        return (
            <div className={'full_container'}>
                <Sidebar/>
                <Topbar/>
                <div className={'page_container container_detalhes_financeiro'}>
                    <h1 className={'page_title'}>Detalhes Financeiros - 2019</h1>
                    <p>Nesta página se localizam os detalhes do fluxo de caixa do ano corrente.</p>
                    {/*<h1>Para fazer: Colocar Familiar diferente das Instituições.</h1>*/}
                    {/*<h1>*/}
                    {/*    Para fazer: No familiar Total Faturado ao invés de Lucro por instituicao.*/}
                    {/*    TOTAL FATURADO = HORAS DO AT * PRECO DA INSTITUICAO*/}
                    {/*</h1>*/}
                    {/*<h1>Para Familiar: COLOCAR PREÇO COMO INSTITUIÇÃO</h1>*/}
                    {/*<h1>Para fazer: Total dos ATS embaixo do total faturado</h1>*/}
                    {/*<h1>Para fazer: Colocar Familiar diferente das Instituições.</h1>*/}
                    {loading ? <p>Carregando...</p> : <></>}
                    {meses.map((mes, index) => (
                        <DetalheMes financialData={props.financialData} monthStr={mes} sessoesInstituicao={props.sessoesInstituicao} key={index}/>
                    ))}
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
    financialData: state.financeiro.financialData,
})

const mapDispatchToProps = dispatch => ({
    setSessoesInstituicao: sessoes => dispatch({type: Actions.setSessoesInstituicao, payload: sessoes}),
    setFinancialData: financeiro => dispatch({type: Actions.setFinancialData, payload: financeiro}),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesFinanceiroPage)