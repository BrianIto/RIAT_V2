import React from 'react';
import moment from 'moment/min/moment-with-locales'
import DetalheInstituicao from "./detalhe_instituicao";
import {Actions} from "../../../redux/actions";
import {connect} from "react-redux";
import {Button} from "@material-ui/core";

const DetalheMes = props => {

    //Já testado, funcionando.
    const onClickMesSelected = () => {
        let month = moment(props.monthStr, "MM").locale('pt-BR').format('MMMM / YYYY');
        props.setMesSelected({
            mes: month,
            instituicoes: [
                props.financialData,
            ]
        });
        props.showModal("MODAL_CONFIRM_FECHAR_MES", 'sm');
    }

    const checkIfMonthClosed = () => {
        let value = false;
        props.mesesFechados.forEach(mes => {
            if (mes.mes === moment(props.monthStr, 'M').locale('pt-BR').format('MMMM / 2019')) {
                value = true;
            }
        });
        return value;
    }

    return (
        <div>
            <div style={{display: 'flex'}}>
                <h1>{moment(props.monthStr, 'M').locale('pt-BR').format('MMMM')}</h1>
                <div style={{width: '100%', margin: 'auto'}}>
                    <Button onClick={onClickMesSelected} style={{float: "right"}} color={"primary"} variant={"contained"} disabled={checkIfMonthClosed()}>
                        {checkIfMonthClosed() ? "Mês fechado" : "Fechar o Mês"}
                    </Button>
                </div>
            </div>
            {
                //Exibe os nao fechados
                props.financialData.map((instituicao, index) => {
                        return (
                            <DetalheInstituicao
                                month={moment(props.monthStr, 'M').month()}
                                instituicao={instituicao}
                                index={index}
                                key={index}/>
                        )
                })
            }
        </div>
    )
}
{
    /*  //Verifica se tá fechado
                    if (checkIfMonthClosed()) {
                        //Pega a Data
                        let currentMes = moment(props.monthStr, 'MM').locale("pt_BR").format('MMMM');
                        currentMes += " / 2019";

                        props.mesesFechados.forEach((mes, index) => {
                            //Compara a data com o vetor de não fechados para receber os dados do mes fechado.
                            if (mes.mes === currentMes) {
                                //Pega
                                let instituicao
                            }
                        });
                    } else {
                        return (
                            <DetalheInstituicao
                                month={moment(props.monthStr, 'MM').month()}
                                instituicao={instituicao}
                                index={index}
                                key={index}/>
                        )
                    }
                })*/
}
const mapStateToProps = state => ({
    mesSelected: state.financeiro.mesSelected,
    mesesFechados: state.financeiro.mesesFechados,
})

const mapDispatchToProps = dispatch => ({
    setMesSelected: mes => dispatch({type: Actions.setMesSelected, payload: mes}),
    showModal: (modalType, modalSize) => dispatch({type: Actions.showModal, payload: modalType, size: modalSize})
})

export default connect(mapStateToProps, mapDispatchToProps)(DetalheMes)
