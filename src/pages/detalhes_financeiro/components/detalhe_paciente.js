import React from "react"
import {Grid} from "@material-ui/core";
import AcompanhanteTable from "./acompanhante_table";
import "../styles/detalhe_paciente.sass";
import MyWindowPortal from "./portals/portal_sessoes";
import {getSessoesFromPaciente} from "../../../DAOs/PacienteDAO";
import moment from 'moment/min/moment-with-locales';
import logoBase64 from "../../../assets/logo2base64";

const DetalhePaciente = (props) => {

    const [lucroPaciente, setLucroPaciente] = React.useState(0);
    const [totalATs, setTotalATs] = React.useState(0);
    const [imprimirSessoes, aberto] = React.useState(false);
    const [sessoesPaciente, setSessoesPaciente] = React.useState([]);
    const [logo64, setLogo64] = React.useState('');
    const [totalHorasTrab, setTotalHoras] = React.useState(0);

    React.useEffect(() => {
        const aux = [...props.lucroTotal];
        const aux2 = [...props.totalATs];
        aux[props.index] = lucroPaciente;
        aux2[props.index] = totalATs;
        props.setTotalATs(aux2);
        props.setLucroTotal(aux);
    }, []);

    return (
        <div className={'detalhe_paciente_container'}>

            {
                imprimirSessoes ?
                    <MyWindowPortal>
                        <img src={logoBase64} alt={"Logo"}/>
                        <h1 style={{marginBottom: 0}}>{props.paciente.nombreCompleto}</h1>
                        <p style={{margin: 0}}>DNI: {props.paciente.DNI}</p>
                        <h3>Sessões</h3>
                        {
                            sessoesPaciente.map(sessao => {

                                let now = moment(new Date(sessao.horaInicio));
                                let then = moment(new Date(sessao.horarioFim));
                                let hrsTrab = moment.utc(moment(then).diff(moment(now)));

                                if (now.isSame(moment('2019-'+(props.month+1)+-'01'), 'month')) {
                                    return (
                                        <div>
                                            <p>{sessao.acompanhante.nombre}<br/>
                                                Horas Trabalhadas: {hrsTrab.format('HH:mm')}<br/>
                                                {moment(new Date(sessao.horaInicio)).format('DD/MM/YYYY HH:mm')} até {moment(new Date(sessao.horarioFim)).format('DD/MM/YYYY HH:mm')}
                                            </p>
                                        </div>
                                    )
                                } else {
                                    return <></>
                                }
                            })
                        }
                        <h3>Total</h3>
                        <Grid container>
                            <Grid xs={6}>
                                <p>Total de Horas: {totalHorasTrab}</p>
                            </Grid>
                            <Grid xs={6}>
                                <p>Total a Pagar: {lucroPaciente}</p>
                            </Grid>
                        </Grid>
                    </MyWindowPortal>
                    : <></>
            }

            <h4>{props.paciente.nombreCompleto}
                <span onClick={() => {
                    getSessoesFromPaciente(props.paciente, res => {
                        setSessoesPaciente(res.data)
                    }, err => {
                        alert('Erro ao recuperar sessões do paciente!')
                    });
                    aberto(true);
                }}>
                    Imprimir Sessões <i className={'fa fa-print'}/>
                </span>
            </h4>
            <Grid container>
                <Grid item xs={4}>
                    <h3>Total de ATs: ${totalATs}</h3>
                </Grid>
                <Grid item xs={4}>
                    <h3>Total da Factura: ${lucroPaciente}</h3>
                </Grid>
                <Grid item xs={4}>
                    <h3>Lucro : ${lucroPaciente - totalATs}</h3>
                </Grid>
            </Grid>
            <AcompanhanteTable
                lucroPaciente={lucroPaciente}
                setLucroPaciente={setLucroPaciente}
                setTotalATs={setTotalATs}
                month={props.month}
                setTotalHoras={setTotalHoras}
                horasTrabalhadas={totalHorasTrab}
                paciente={props.paciente}
                instituicao={props.instituicao}
                acompanhantes={props.paciente.acompanhantes} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    pacientes: state.pacientes.pacientes
})

export default (DetalhePaciente)