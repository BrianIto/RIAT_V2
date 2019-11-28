import React from "react"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import "../styles/table_pendentes.sass"

const TablePendentes = (props) => {
    return (
        <div className={'table_pendentes'}>
            {props.profissionais.map((profissional, index) => (
                <div className={'field'} key={index}>
                    <div>
                        <h2>{profissional.nombre }</h2>
                        <p>{profissional.email}</p>
                        <p>{profissional.telefone}</p>
                        <Button>Verificar Documentação</Button>
                    </div>
                    <div>
                        <Button>Aceitar</Button>
                        <Button>Reprovar</Button>
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