import React from "react"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import "../styles/table_pendentes.sass"
import {acceptProfissional, getProfissionais, rejectProfissional} from "../../../DAOs/ProfissionalDAO";
import {Actions} from "../../../redux/actions";

const TablePendentes = (props) => {

    const [loading, setLoading] = React.useState(false);

    const checkIfPendente = (profissional) => {
        if (loading) {
            return 'Carregando...'
        } else if ('accepted' in profissional) {
            return profissional.accepted ? 'Aceito' : 'Recusado';
        } else {
            return 'pendente';
        }
    }

    return (
        <div className={'table_pendentes'}>
            {props.profissionais.map((profissional, index) => (
                <div className={'field'} key={index}>
                    <div>
                        <h2 style={{margin: 0}}>{profissional.nombre }</h2>
                        <p>{profissional.email}</p>
                        <p>{profissional.telefone}</p>
                        <p>{checkIfPendente(profissional)}</p>
                        <Button onClick={() => {
                            props.selectProfissional(profissional);
                            props.openModal('MODAL_DOCUMENTOS_PROFISSIONAL', 'sm')
                        }}>Verificar Documentação</Button>
                    </div>
                    <div className={'btns_container'}>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            disabled={loading}
                            onClick={() => {
                                setLoading(true);
                            acceptProfissional(profissional._id, () => {
                                getProfissionais(props, () => {
                                    alert('Funcionário aceito com sucesso!');
                                    setLoading(false);
                                });
                            })
                        }}>Aceitar</Button> &nbsp;
                        <Button disabled={loading}
                                variant={'contained'}
                                color={'secondary'}
                                onClick={() => {
                                    setLoading(true);
                                    rejectProfissional(profissional._id, () => {
                                        getProfissionais(props, () => {
                                            alert('Funcionário recusado com sucesso!');
                                            setLoading(false);
                                        });
                                    })}}>Reprovar</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => ({
    profissionais: state.profissionais.profissionais
})

const mapDispatchToProps = (dispatch) => ({
    getProfissionais: profissionais => dispatch({type: Actions.setProfissionais, payload: profissionais}),
    selectProfissional: profissional => dispatch({type: Actions.selectProfissional, payload: profissional}),
    openModal: (modalType, modalSize) => dispatch({type: 'SHOW_MODAL', payload: modalType, size: modalSize})
})

export default connect(mapStateToProps, mapDispatchToProps)(TablePendentes)