import React from 'react'
import "../styles/acompanhante_table.sass"
import {connect} from "react-redux";
import Financeiro from "../../../DAOs/FinanceiroDAO";
import moment from "moment"

const AcompanhanteRow = (props) => {

    let horasTrabalhadas = (Financeiro.getHorasTrabalhadasInPacienteAndAcompanhante(props.sessoes, props.paciente.solicitacao._id.$oid, props.acompanhante._id.$oid, props.month));

    return (
        <tr>
            <td>{props.acompanhante.nombre}</td>
            <td>{horasTrabalhadas}</td>
            <td>{props.instituicao.valorHora}</td>
            <td>{props.instituicao.valorHoraAT}</td>
            <td>{props.instituicao.valorHoraAT * horasTrabalhadas}</td>
            <td>{props.instituicao.valorHora * horasTrabalhadas}</td>
        </tr>
    )
}

const AcompanhanteTable = (props) => {

    React.useEffect(() => {
        let valor = 0;
        let valorATs = 0;
        props.acompanhantes.forEach(acompanhante => {
            let horasTrabalhadas = (Financeiro.getHorasTrabalhadasInPacienteAndAcompanhante(props.sessoes, props.paciente.solicitacao._id.$oid, acompanhante._id.$oid, props.month));
            valor += props.instituicao.valorHora * horasTrabalhadas;
            valorATs += props.instituicao.valorHoraAT * horasTrabalhadas;
            props.setTotalHoras(props.horasTrabalhadas + horasTrabalhadas);
        })
        props.setLucroPaciente(valor);
        props.setTotalATs(valorATs);

    }, [])

    return (
        <table className={'acompanhante_table'}>
            <thead>
            <tr>
                <td>Nome do AT</td>
                <td>Horas Trabalhadas</td>
                <td>Valor da Hora na Factura</td>
                <td>Valor da Hora para AT</td>
                <td>Total recebido do AT</td>
                <td>Total a ser pago</td>
            </tr>
            </thead>
            {props.acompanhantes.map((acompanhante, index) => {
                    return (
                        <AcompanhanteRow
                            paciente={props.paciente}
                            instituicao={props.instituicao}
                            sessoes={props.sessoes}
                            month={props.month}
                            acompanhante={acompanhante} key={index}/>
                    )
            })
            }
        </table>
    )
}

const mapStateToProps = state => ({
    sessoes: state.financeiro.sessoes,
    mesesFechados: state.financeiro.setMesesFechados
});

export default connect(mapStateToProps)(AcompanhanteTable);