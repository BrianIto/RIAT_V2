import React from "react"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import "../styles/table_pendentes.sass"
import {acceptProfissional} from "../../../DAOs/ProfissionalDAO";

const TablePendentes = (props) => {

    const [loading, setLoading] = React.useState(false);

    const checkIfPendente = (profissional) => {
        if ('accepted' in profissional) {
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
                        <h2>{profissional.nombre }</h2>
                        <p>{profissional.email}</p>
                        <p>{profissional.telefone}</p>
                        <p>{checkIfPendente(profissional)}</p>
                        <Button>Verificar Documentação</Button>
                    </div>
                    <div>
                        <Button
                            disabled={true}
                            onClick={() => {
                            setLoading(true);
                            acceptProfissional(profissional._id, () => {

                            })
                        }}>Aceitar</Button>
                        <Button disabled={loading}>Reprovar</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => ({
    profissionais: state.profissionais.profissionais
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TablePendentes)