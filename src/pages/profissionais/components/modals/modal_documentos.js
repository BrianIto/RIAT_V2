import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Button, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {Actions} from "../../../../redux/actions";

const ModalDocumentos = props => {
    return (
        <div>
            <div className={'modal_header'}>
                <h2>Editar Profissional <i className={'fa fa-times'} onClick={props.closeModal}/></h2>
            </div>
            <div className={'modal_body'}>
                <h2>Documentos</h2>
                <h5>{props.profissionalSelected.nombre}</h5>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Button
                            onClick={() => {
                                 window.open('https://riat.s3.amazonaws.com/uploads/'+props.profissionalSelected.usuario.email+'_afip.jpg')
                            }}
                            fullWidth
                            variant={'contained'}>
                            Antecedentes Criminales
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant={'contained'}>
                            DNI
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant={'contained'}>
                            CBU
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                    <Button
                            fullWidth
                            variant={'contained'}>
                            Constancia de Inscripción en AFIP
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth
                                variant={'contained'}>
                            Curriculum Profesional
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                    <Button fullWidth
                            variant={'contained'}>
                            Póliza de Seguro
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    profissionalSelected: state.profissionais.profissionalSelected
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch({type: Actions.closeModal})
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDocumentos);