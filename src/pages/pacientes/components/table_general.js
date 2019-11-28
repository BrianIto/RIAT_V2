import React from 'react'
import {connect} from "react-redux";

const TableGeneral = (props) => (
    <div className={'paciente_table container_general'}>
        <h2>Pacientes em Geral</h2>
        {props.pacientes.length > 0 ?
            <table>
                <thead>
                <td>Nome</td>
                <td>Tipo de Quadro</td>
                <td>Horários</td>
                <td>Ações</td>
                </thead>
                <tbody>
                {props.pacientes.map((paciente, index) => (
                    <tr>
                        <td>{paciente.nombreCompleto}</td>
                        <td>{paciente.solicitacao.length > 0 ? paciente.solicitacao[0].tipoInternacao :
                            <i>Sem Solicitação</i>}</td>
                        <td>{paciente.solicitacao.length > 0 ? paciente.solicitacao[0].horario :
                            <i>Sem Solicitação</i>}</td>
                        <td>
                            <button onClick={() => {
                                props.selectPaciente(paciente);
                                props.openModal('MODAL_EDITAR_PACIENTE', 'sm');
                            }}>Editar</button> &nbsp;
                            {paciente.solicitacao.length > 0 ?
                                 <button onClick={() => {
                                    props.selectPaciente(paciente)
                                    props.openModal('MATCH_MODAL', 'lg')
                                }}>Match</button>
                                : <></>
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table> : <p>Ainda não há nenhum paciente cadastrado!</p>}
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    selectPaciente: (paciente) => dispatch({type: 'SELECT_PACIENTE', payload: paciente}),
    openModal: (modalType, modalSize) => dispatch({type: 'SHOW_MODAL', payload: modalType, size: modalSize})
})

export default connect(null, mapDispatchToProps)(TableGeneral)