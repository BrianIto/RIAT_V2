import React, {useState} from "react"
import {connect} from "react-redux"
import Grid from "@material-ui/core/Grid";
import {Button, InputAdornment, Select, TextField} from "@material-ui/core";
import "../../styles/modals/modal_match.sass"
import axios from "axios";
import ProfissionaisReducer from "../../../../redux/reducers/profissionais_reducer";
import {getProfissionais} from "../../../../DAOs/ProfissionalDAO";
import {Actions} from "../../../../redux/actions";

const getHorarioString = (props) => {
    if (props.pacienteSelected.solicitacao[0].hasOwnProperty('freq')) {
        let x = '';

        props.pacienteSelected.solicitacao[0].freq.forEach((freq) => {
            x += freq.dia + " - " + freq.horaInicio + " ~ " + freq.horaFin + ", ";
        });

        return x;
    } else {
        return "Não foi solicitado nenhum dia";
    }
}

const diasSemanaArray = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

const getDisponibilidadString = (profissional) => {
    let x = '';
    if (profissional.preferencias.disponibilidad.manana)
        x += 'Mañana, ';
    if (profissional.preferencias.disponibilidad.tarde)
        x += 'Tarde, ';
    if (profissional.preferencias.disponibilidad.noche)
        x += 'Noche. ';
    if (x.length === 0) {
        x = <i>Sem horários</i>;
    }
    return x;
}

const getDaysString = daysArray => {

    const days = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
    let string = '';
    if (daysArray) {
        daysArray.forEach((day, index) => {
            if (day) {
                string += days[index] + ", ";
            }
        });
    }
    return string;
}


const ModalMatch = (props) => {

    const getProfissionaisWithProposta = () => {

        let x = [];

        props.profissionais.forEach(profissional => {
            if (profissional.hasOwnProperty('requests')) {
                profissional.requests.forEach(request => {
                    if (props.pacienteSelected.solicitacao.length > 0) {
                        if (request.solicitacao.$oid === props.pacienteSelected.solicitacao[0]._id.$oid) {
                            x.push({
                                profissional: profissional,
                                horaInicio: request.horarioInicio,
                                horaFim: request.horarioFim,
                                dias: request.dias
                            });
                        }
                    }
                });
            }
        });
        return x;
    }

    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
    const [diasSelected, selectDia] = useState(Array(7).fill(false));
    const [propostas, setPropostas] = useState(getProfissionaisWithProposta());

    return (
        <div className={'modal_match'}>
            <div className={'modal_header'}>
                <h2>Match Paciente com AT <i className={'fa fa-times'} onClick={props.closeModal}/></h2>
            </div>
            <div className={'modal_body'}>
                <form>
                    <Grid container xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                disabled
                                defaultValue={props.pacienteSelected.nombreCompleto}
                                label={'Nome do Paciente'}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                disabled
                                defaultValue={props.pacienteSelected.solicitacao[0].tipoInternacao}
                                label={'Tipo de Quadro'}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                disabled
                                label={'Horários'}
                                defaultValue={getHorarioString(props)}/>
                        </Grid>
                        <Grid item xs={4}>
                            <p style={{marginBottom: 5, marginTop: 0, textAlign: 'center'}}>Dia da Semana</p>
                            <div className={'diasSemana'}>
                                {diasSemanaArray.map((dia, index) => (
                                    <div className={diasSelected[index] ? 'diaSemana selected' : 'diaSemana'}
                                         onClick={() => {
                                             let newArray = [...diasSelected];
                                             newArray[index] = !newArray[index];
                                             selectDia(newArray);
                                         }}><span>{dia}</span></div>
                                ))}
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant={'outlined'}
                                fullWidth
                                value={horaInicio}
                                onChange={e => setHoraInicio(e.target.value)}
                                label={'Hora de Inicio'}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant={'outlined'}
                                fullWidth
                                value={horaFim}
                                onChange={e => setHoraFim(e.target.value)}
                                label={'Hora de Fim'}/>
                        </Grid>
                        <h2>Assistentes Propostos</h2>
                        <table>
                            <thead>
                            <tr>
                                <td>Nome</td>
                                <td>Hora de Início</td>
                                <td>Hora do Fim</td>
                                <td>Dias</td>
                            </tr>
                            </thead>
                            <tbody>
                            {propostas.map((proposta) => (
                                <tr>
                                    <td>{proposta.profissional.nombre}</td>
                                    <td>{proposta.horaInicio}</td>
                                    <td>{proposta.horaFim}</td>
                                    <td>{getDaysString(proposta.dias)}</td>
                                </tr>
                            ))}
                            </tbody>
                            <tbody>

                            </tbody>
                        </table>
                        <h2>Assistentes Terapêuticos Disponíveis</h2>
                        <TextField variant={"outlined"} fullWidth label={'Buscar por Nome'}/>
                        <table>
                            <thead>
                            <tr>
                                <td>Nome</td>
                                <td>Disponibilidade</td>
                                <td>Telefone</td>
                                <td></td>
                            </tr>
                            </thead>
                            <tbody>
                            {props.profissionais.map((profissional, index) => (
                                <tr>
                                    <td>{profissional.nombre}</td>
                                    <td>{getDisponibilidadString(profissional)}</td>
                                    <td>{profissional.telefono}</td>
                                    <td>
                                        <Button
                                            variant={'contained'}
                                            onClick={() => {
                                                // TODO: informacoes.
                                            }}
                                            color={'primary'}>
                                            + Info
                                        </Button> &nbsp;
                                        <Button
                                            variant={'contained'}
                                            onClick={() => {
                                                const data = {
                                                    solicitacaoId: props.pacienteSelected.solicitacao[0]._id,
                                                    idAcompanhante: profissional._id,
                                                    dias: diasSelected,
                                                    horarioInicio: horaInicio,
                                                    horarioFim: horaFim,
                                                }
                                                axios.post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/acompanhante/incoming_webhook/sendMatchRequest',
                                                    data)
                                                    .then(res => {
                                                        getProfissionais(props, () => {
                                                            setPropostas(getProfissionaisWithProposta())
                                                        });
                                                        alert('Sucesso!');
                                                    })
                                                    .catch(err => {
                                                        alert(err)
                                                    });
                                            }}
                                            color={'primary'}>
                                            Propor
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Grid>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    pacienteSelected: state.pacientes.pacienteSelected,
    profissionais: state.profissionais.profissionais
})

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({type: 'CLOSE_MODAL'}),
    getProfissionais: profissionais => dispatch({type: Actions.setProfissionais, payload: profissionais})
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalMatch);