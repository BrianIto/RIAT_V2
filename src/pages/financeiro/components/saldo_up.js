import React from "react"
import {Grid} from "@material-ui/core";
import "../styles/saldo_up.sass"
import moment from "moment";
import {connect} from "react-redux";

const SaldoUp = (props) => {

    const getSaidasFromMonth = () => {
        let x = [];

        props.saidas.forEach(saida => {
            if (saida.mes_ano === moment().format('MM / YYYY') )
                x.push(saida)
        });

        return x;
    }

    const getSum = (array) => {
        let acum = 0;
        array.forEach(one => acum+= Number(one.valor));
        return acum;
    }

    const somaTodos = arrayInst => {
        let arraySomado = new Array(12).fill(0);
        arrayInst.forEach(instituicao => {
            instituicao.lucro.forEach((saldoMes, index) => {
                arraySomado[index] += saldoMes;
            })
        });
        return arraySomado;
    }

    const [entrada, setEntrada] = React.useState(0);

    React.useEffect(() => {
        setEntrada(somaTodos(props.instituicoes)[moment().month()]);
    })

    return (
        <Grid container spacing={3} style={{textAlign: 'center'}}>
            <Grid item xs={4} className={'a_pagar'}>
                <h2>Contas a pagar</h2>
                <h1>${getSum(getSaidasFromMonth())}</h1>
            </Grid>
            <Grid item xs={4} className={'atual'}>
                <h2>Saldo Do Mês Atual</h2>
                <h1>${entrada - getSum(getSaidasFromMonth())}</h1>
            </Grid>
            <Grid item xs={4} className={'a_receber'}>
                <h2>Contas a receber</h2>
                <h1>${entrada}</h1>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    saidas: state.financeiro.saidas,
    instituicoes: state.financeiro.instituicoesComSessoes
})

export default connect(mapStateToProps)(SaldoUp)