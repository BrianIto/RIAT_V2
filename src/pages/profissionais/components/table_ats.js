import React from 'react';
import {Actions} from "../../../redux/actions";
import {connect} from "react-redux";

const countProfsType = (array) => {
    let counter = 0;
    let arrayAux = [];
    array.forEach(item => {
        if ("tipoProfissional" in item) {
            if (item.tipoProfissional[0]) {
                counter++;
                arrayAux.push(item);
            }
        }

    });
    return { counter: counter, profs: arrayAux };
}

const TableATs = (props) => (
    countProfsType(props.profissionais).counter > 0 ?
        <div className={'paciente_table container_ats'}>
            <h2>Assistentes Terapêuticos</h2>
            <table>
                <thead>
                <td>Nome</td>
                <td>Tipo de Quadro</td>
                <td>Horários</td>
                <td>Ações</td>
                </thead>
                <tbody>
                {countProfsType(props.profissionais).profs.map((profissional, index) => (
                        <tr>
                            {/*TODO: Nome, Disponibilidade, Zona de Trabajo y Experiencia de Trabajo*/}
                            <td>{profissional.nombre}</td>
                            <td>{profissional.email}</td>
                            <td>{profissional.telefono}</td>
                            <td>
                                <button onClick={() => {
                                    props.selectProfissional(profissional);
                                    props.openModal('MODAL_EDITAR_PROFISSIONAL', 'sm');
                                }}>Editar</button> &nbsp;
                                <button>Desvincular</button>
                            </td>
                        </tr>
                ))}
                </tbody>
            </table>
        </div> :
        <div className={'paciente_table container_ats'}>
            <h2>Assistentes Terapêuticos</h2>
            <p>Ainda não há profissionais desse tipo... :(</p>
        </div>
)

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    selectProfissional: profissional => dispatch({type: Actions.selectProfissional, payload: profissional}),
    openModal: (modalType, modalSize) => dispatch({type: 'SHOW_MODAL', payload: modalType, size: modalSize})
})

export default connect(mapStateToProps, mapDispatchToProps)(TableATs)