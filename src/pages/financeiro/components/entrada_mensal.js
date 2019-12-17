import React from "react"
import {Grid, Button} from "@material-ui/core"
import {Link} from "react-router-dom";
import "../styles/entrada_mensal.sass"
import {connect} from "react-redux";
import {Actions} from "../../../redux/actions";
import moment from "moment/min/moment-with-locales";

const ModalData = (props) => {

    const arrayAux = ["01", "02", "03", "04", "05", "06", "07", "08,", "09", "10", "11", "12",
        "01", "02", "03", "04", "05", "06", "07", "08,", "09", "10", "11", "12"];

    const getNmestres = (inicial, intervaloMeses) => {

        let array = [];
        for ( let i = inicial; i < inicial + 12; i += intervaloMeses ) {
            array.push(arrayAux[i]);
        }
        console.log(array);
        return array;
    };

    return (
        <div className={'mes_container'}>
            <h2>{moment().locale('pt-BR').add(props.index, 'month').format('MMMM / YYYY')}</h2>
            {
                props.instituicoes.map((instituicao, index) => {
                    if ("aPartirDe" in instituicao) {
                        let mes = instituicao.aPartirDe.split(" ")[0];
                        console.log(instituicao);
                        let meses = getNmestres(Number(mes) - 1, Number(instituicao.freqPagamento.$numberInt));
                        if (meses.includes(arrayAux[props.month])) {
                            return (<p key={index}>{instituicao.nombreInstituicion}<span>${'lucro' in instituicao ? instituicao.lucro[props.month] : ''}</span></p>)
                        } else {
                            return (<></>);
                        }
                    } else {
                        return (<></>)
                    }
                })
            }
            <Link to={'/detalhes_financeiro'}>
                {/*<Button*/}
                {/*    variant={'contained'}*/}
                {/*    style={{float: 'right'}}*/}
                {/*    color={'primary'}> Ver detalhes</Button>*/}
            </Link>
        </div>)
}

const SaidaData = props => {

    const arrayAux = ["01", "02", "03", "04", "05", "06", "07", "08,", "09", "10", "11", "12",
        "01", "02", "03", "04", "05", "06", "07", "08,", "09", "10", "11", "12"];

    const getSaidasFromMonth = (props) => {
        let x = [];

        props.saidas.forEach(saida => {
            if (saida.mes_ano === arrayAux[props.month]+" / "+props.year )
                x.push(saida)
        });

        return x;
    }

    const saidas = getSaidasFromMonth(props);

    console.log( arrayAux[props.month]+" / "+props.year );
    console.log(saidas);
    return (
        <div className={'mes_container'}>
            <h2>{moment().locale('pt-BR').add(props.index, 'month').format('MMMM / YYYY')}</h2>
            {
                (saidas.length > 0) ?
                    saidas.map((saida, index) => (<p key={index}>{saida.nombre}<span> $ {saida.valor}</span></p>))
                : (<p>Não há saídas para esse mês.</p>)
            }
                <Button
                    variant={'contained'}
                    style={{float: 'right'}}
                    onClick={() => {
                        props.setFinanceiroMes(moment().add(props.index, 'month').format('MM / YYYY'))
                        props.showModal('MODAL_NOVA_SAIDA', 'sm')
                    }}
                    color={'primary'}> Añadir Nuevo</Button>
        </div>)
}

const EntradaMensal = (props) => {

    let x = [1,2,3];

    return (
        <div className={'entrada_mensal_container'}>
            <h2>Entrada Mensal</h2>
            <p>Nesta página ficam todos os detalhes das entradas divididas pelo trimestre atual.</p>
            <Grid container spacing={5}>
                {
                    x.map((val, index) => (
                        <Grid item key={index} xs={4}>
                            <ModalData
                                key={index}
                                index={index}
                                instituicoes={props.instituicoes}
                                month={moment().add(index, "month").month()}
                                year={moment().add(index, "month").year()}/>
                        </Grid>
                    ))
                }
            </Grid>
            <h2>Saída Mensal</h2>
            <p>Nesta página ficam todos os detalhes das saídas divididas pelo trimestre atual.</p>
            <Grid container spacing={5}>
                {
                    x.map((val, index) => (
                        <Grid item key={index} xs={4}>
                            <SaidaData
                                showModal={props.showModal}
                                index={index}
                                setFinanceiroMes={props.setFinanceiroMes}
                                saidas={props.saidas}
                                month={moment().add(index, "month").month()}
                                year={moment().add(index, "month").year()}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    saidas: state.financeiro.saidas,
    instituicoes: state.financeiro.instituicoesComSessoes
})

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalSize) => dispatch({type: Actions.showModal, payload: modalType, size: modalSize}),
    setFinanceiroMes: (mes) => dispatch({type: Actions.setFinanceiroMes, payload: mes})
})

export default connect(mapStateToProps, mapDispatchToProps)(EntradaMensal)