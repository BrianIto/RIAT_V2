import React from "react"
import {Grid} from "@material-ui/core";
import AcompanhanteTable from "./acompanhante_table";
import "../styles/detalhe_paciente.sass"

const DetalhePaciente = (props) => {

    const [lucroPaciente, setLucroPaciente] = React.useState(0);
    const [totalATs, setTotalATs] = React.useState(0);

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
            <h4>{props.paciente.nombreCompleto}</h4>
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
                paciente={props.paciente}
                instituicao={props.instituicao}
                acompanhantes={props.paciente.acompanhantes} />
        </div>
    )
}

export default DetalhePaciente