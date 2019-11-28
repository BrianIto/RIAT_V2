import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Button, Select, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Actions} from "../../../../redux/actions";
import Financeiro from "../../../../DAOs/FinanceiroDAO";

const NovaSaidaModal = props => {

    const [loading, setLoading] = React.useState(false);

    const handleSubmit = e => {
        const form = e.target;
        const data = {
            nombre: form.nome_saida.value,
            valor: form.valor.value,
            mes_ano: form.mes_ano.value,
        }

        Financeiro.newSaida(data, res => {
            alert('Nova Saída Registrada Com Sucesso!');
            Financeiro.getSaidasFromDB(resSaida => {
                props.getSaidas(resSaida.data);
                setLoading(false);
                props.closeModal();
            }, e => {
                alert('error '+e)
            });
        }, e => {
            alert('Error '+e);
            setLoading(false)
        }, () => setLoading(true))

        e.preventDefault();
    }

    return (
        <div>
            <div className={'modal_header'}>
                <h2>Nova Saída <i className={'fa fa-times'} onClick={props.closeModal}/></h2>
            </div>
            <div className={'modal_body'}>
                <form onSubmit={handleSubmit}>
                <Grid container xs={12} spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant={"outlined"}
                                name={'mes_ano'}
                                fullWidth
                                label={'Mês / Ano'}
                                defaultValue={props.mesSelected}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant={'outlined'}
                                name={'nome_saida'}
                                label={'Nueva Salida'}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant={'outlined'}
                                name={'valor'}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                label={'Valor da Saída'}
                                fullWidth
                            />
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
})

const mapDispatchToProps = dispatch => ({
    getSaidas: saidas => dispatch({type: Actions.getSaidas, payload: saidas}),
    closeModal: () => dispatch({type: Actions.closeModal})
});

export default connect(mapStateToProps, mapDispatchToProps)(NovaSaidaModal);