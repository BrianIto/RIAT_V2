import React from "react"
import DetalhePaciente from "./detalhe_paciente";
import "../styles/detalhe_instituicao.sass"
import Grid from "@material-ui/core/Grid";
import {Actions} from "../../../redux/actions";
import {connect} from "react-redux";

const DetalheInstituicao = (props) => {

    const [lucroTotal, setLucroTotal] = React.useState(new Array('pacientes' in props.instituicao
        ? props.instituicao.pacientes.length : 2).fill(0));
    const [totalATs, setTotalATs] = React.useState(new Array('pacientes' in props.instituicao
        ? props.instituicao.pacientes.length : 2
    ).fill(0));

    const getSum = array => {
        let valor = 0;
        array.forEach(item => valor += item);
        return valor
    };

    React.useEffect(() => {
        console.log(props.instituicao, props.month)
    })

    return (
        <div className={'detalhe_instituicao_container'}>
            <h2>{props.instituicao.nombreInstituicion}</h2>
            <Grid container>
                <Grid item xs={4}>
                    <h3 className={'lucro_inst'}>Lucro da Instituição: $
                        {getSum(lucroTotal) - getSum(totalATs)}
                    </h3>
                </Grid>
                <Grid item xs={4}>
                    <h3 className={'lucro_inst'}>Total da Factura: $
                        {getSum(lucroTotal)}
                    </h3>
                </Grid>
                <Grid item xs={4}>
                    <h3 className={'lucro_inst'}>Total de ATs: $
                        {getSum(totalATs)}
                    </h3>
                </Grid>
            </Grid>
            {
                'pacientes' in props.instituicao ? (
                props.instituicao.pacientes.map((paciente, index) => {
                    return (
                        <DetalhePaciente
                            month={props.month}
                            instituicao={props.instituicao}
                            paciente={paciente}
                            index={index}
                            lucroTotal={lucroTotal}
                            totalATs={totalATs}
                            setTotalATs={setTotalATs}
                            setLucroTotal={setLucroTotal}
                            key={index}/>
                    )
                }) ): <></>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    mesSelected: state.financeiro.mesSelected,
    mesesFechados: state.financeiro.mesesFechados
})

const mapDispatchToProps = dispatch => ({
    setMesSelected: mes => dispatch({type: Actions.setMesSelected, payload: mes}),
    showModal: (modalType, modalSize) => dispatch({type: Actions.showModal, payload: modalType, size: modalSize})
})

export default connect(mapStateToProps, mapDispatchToProps)(DetalheInstituicao);