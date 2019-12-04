import React from 'react';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {Button, TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Actions} from "../../../../redux/actions";
import Financeiro from "../../../../DAOs/FinanceiroDAO";

const FecharMesModal = props => {

    const [loading, setLoading] = React.useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        Financeiro.fechaMes(props.mesSelected, res  => {
            alert('Mês fechado com sucesso!');
            props.closeModal();
            setLoading(false);
        }, err => {
            alert("Erro ao fechar mês! Erro: "+err);
            setLoading(false);
        }, () => setLoading(true));
    }

    return (
        <div>
            <div className={'modal_header'}>
                <h2>Confirmar fechamento de Mês <i className={'fa fa-times'} onClick={props.closeModal}/></h2>
            </div>
            <div className={'modal_body'}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <p>Tem certeza que deseja fechar o mês {props.mesSelected.mes}? <b>Essa ação não pode ser revertida!</b></p>
                        </Grid>
                        <Grid item style={{textAlign: 'right'}} xs={12}>
                            <Button onClick={props.closeModal}>Cancelar</Button> &nbsp;
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                disabled={loading}>
                                {loading ? 'Carregando...' : 'Confirmar'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    mesSelected: state.financeiro.mesSelected
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch({type: Actions.closeModal})
})

export default connect(mapStateToProps, mapDispatchToProps)(FecharMesModal);