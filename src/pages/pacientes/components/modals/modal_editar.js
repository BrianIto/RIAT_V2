import React, {useState} from 'react'
import {Select, TextField, Button} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import {connect} from "react-redux";
import {editPaciente} from "../../../../DAOs/PacienteDAO";

const ModalEditarPaciente = (props) => {

        const setValueIdOrEmptyString = value => {
            if (props.pacienteSelected.hasOwnProperty(value)) {
                return props.pacienteSelected[value].$oid;
            } else {
                return '';
            }
        };

        const getMedicos = () => {

            let array = [];

            if (props.pacienteSelected.hasOwnProperty('medicos')) {
                props.pacienteSelected.medicos.forEach(medicoId => {
                    array.push(medicoId.$oid)
                })
            }

            console.log(array);
            return array;
        }

        const [familiar, setFamiliar] = useState(setValueIdOrEmptyString('familiar'));
        const [instituicao, setInstituicao] = useState(setValueIdOrEmptyString('instituicao'));
        const [medicos, setMedicos] = useState(getMedicos());

        const [labelWidth, setLabelWidth] = useState(0);
        const inputLabel = React.useRef(null);
        React.useEffect(() => {
            setLabelWidth(inputLabel.current.offsetWidth);
        }, []);

        const dataCleaningBeforeSubmit = data => {
            let aux = {...data};
            if (aux.changes.familiar.$oid === '') {
                delete aux.changes.familiar;
            }
            if (aux.changes.instituicao.$oid === '') {
                delete aux.changes.instituicao;
            }
            if (!(medicos.length > 0)) {
                delete aux.changes.medicos;
            } else {
                medicos.forEach(medico => aux.changes.medicos.push({ $oid: medico }))
            }
            return aux;
        }

        const handleSubmit = e => {
            e.preventDefault();

            const form = e.target;
            editPaciente(props, dataCleaningBeforeSubmit({
                    id: props.pacienteSelected._id,
                    changes: {
                        nombreCompleto: form.nombreCompleto.value,
                        fechaDeNacimiento: form.fechaNacimiento.value,
                        DNI: form.DNI.value,
                        direccion: form.direccion.value,
                        familiar: { $oid: familiar },
                        instituicao: { $oid: instituicao },
                        medicos: [],
                    }
                })
            );
        }

        return (
            <div>
                <div className={'modal_header'}>
                    <h2>Editar Paciente <i className={'fa fa-times'} onClick={props.closeModal}/></h2>
                </div>
                <div className={'modal_body'}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    defaultValue={props.pacienteSelected.nombreCompleto}
                                    variant={'outlined'}
                                    label={'Nome Completo'}
                                    name={'nombreCompleto'}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    defaultValue={props.pacienteSelected.fechaDeNacimiento}
                                    name={'fechaNacimiento'}
                                    variant={'outlined'}
                                    label={'Data de Nascimento'}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    defaultValue={props.pacienteSelected.DNI}
                                    variant={'outlined'}
                                    label={'DNI'}
                                    name={'DNI'}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    defaultValue={props.pacienteSelected.direccion}
                                    variant={'outlined'}
                                    name={'direccion'}
                                    label={'Endereço'}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant={'outlined'}>
                                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                        Familiar
                                    </InputLabel>
                                    <Select
                                        value={familiar}
                                        input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple"/>}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                        onChange={e => setFamiliar(e.target.value)}>
                                        {
                                            props.familiares.map(familiar => (
                                                <MenuItem value={familiar._id.$oid}>{familiar.nombre}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant={'outlined'}>
                                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                        Instituição
                                    </InputLabel>
                                    <Select
                                        value={instituicao}
                                        input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple"/>}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                        onChange={e => setInstituicao(e.target.value)}
                                    >
                                        {props.instituicoes.map(instituicao => (
                                            <MenuItem
                                                value={instituicao._id.$oid}
                                                key={instituicao._id.$oid}>
                                                {instituicao.nombreInstituicion}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant={'outlined'}>
                                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                        Médicos
                                    </InputLabel>
                                    <Select
                                        multiple
                                        value={medicos}
                                        input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple"/>}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                        onChange={e => setMedicos(e.target.value)}
                                    >
                                        {props.medicos.map(medico => (
                                            <MenuItem key={medico._id.$oid}
                                                      value={medico._id.$oid}>{medico.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
;

const mapStateToProps = (state) => ({
    pacienteSelected: state.pacientes.pacienteSelected,
    medicos: state.medicos.medicos,
    instituicoes: state.instituicoes.instituicoes,
    familiares: state.familiares.familiares,
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({type: 'CLOSE_MODAL'}),
    setPacientes: (pacientes) => dispatch({type: 'SET_PACIENTES', payload: pacientes})
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditarPaciente)