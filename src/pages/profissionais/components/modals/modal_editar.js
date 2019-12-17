import React from 'react';
import {connect} from "react-redux";
import {Actions} from "../../../../redux/actions";
import Grid from "@material-ui/core/Grid";
import {Button, Select, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import moment from 'moment/min/moment-with-locales';

const ModalEditarProfissional = props => {

    const handleSubmit = e => {
        const form = e.currentTarget;
    }

    return (
        <div>
            <div className={'modal_header'}>
                <h2>Editar Profissional <i className={'fa fa-times'} onClick={props.closeModal}/></h2>
            </div>
            <div className={'modal_body'}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                label={'Nome Completo'}
                                defaultValue={props.profissionalSelected.nombre} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                fullWidth
                                label={'Data de Nascimento'}
                                defaultValue={props.profissionalSelected.fechaNacimiento} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                fullWidth
                                label={'Telefone'}
                                defaultValue={props.profissionalSelected.telefono} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                multiline
                                label={'Experiencia'}
                                defaultValue={`Trabajo:\n${props.profissionalSelected.experiencia.experiencia}\n\nIntervalo:\n de ${moment(new Date(props.profissionalSelected.experiencia.fechaInicio)).format('DD/MM/YYYY')} até ${moment(new Date(props.profissionalSelected.experiencia.fechaFin)).format('DD/MM/YYYY')}\n\nDescrição:\n${props.profissionalSelected.experiencia.descripcion}`}/>
                        </Grid>
                        <Grid item style={{textAlign: 'right'}} xs={12}>
                            <Button onClick={props.closeModal}>Cancelar</Button> &nbsp;
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}>
                                Confirmar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    profissionalSelected: state.profissionais.profissionalSelected,
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch({type: Actions.closeModal}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditarProfissional)