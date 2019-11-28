import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Button, InputAdornment, Select, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import {connect} from "react-redux";
import axios from "axios";
import moment from "moment/min/moment-with-locales";


const FinanceiroModal = (props) => {

    const [freqPagamento, setFreq] = useState('freqPagamento' in props.instituicaoSelected ?
        props.instituicaoSelected.freqPagamento : '');
    const [aPartirDe, setMes] = useState("aPartirDe" in props.instituicaoSelected ?
        props.instituicaoSelected.aPartirDe : '');
    const [loading, isLoading] = useState(false);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [labelWidth2, setLabelWidth2] = React.useState(0);
    const inputLabel = React.useRef(null);
    const inputLabel2 = React.useRef(null);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
        setLabelWidth2(inputLabel2.current.offsetWidth);
    }, []);

    const handleSubmit = (e) => {
        isLoading(true);
        e.preventDefault();
        axios.post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/instituicao/incoming_webhook/editInstituicao', {
            instituicaoId: props.instituicaoSelected._id,
            changes: {
                freqPagamento: freqPagamento,
                valorHora: e.target.valor.value,
                valorHoraAT: e.target.valorAT.value,
                aPartirDe: aPartirDe,
            },
        }).then(() => {
            alert('Sucesso!');
            isLoading(false);
        }).catch((err) => {
            alert(err);
            isLoading(false);
        })
    };

    const aPartirDeDataSet = () => {
        let array = [];
        for (let i = 0; i < 6; i++) {
            array.push(moment().locale('pt-BR').add(i, 'month').format('MM / YYYY'));
        }
        return array;
    }

    return (
        <div>
            <div className={'modal_header'}>
                <h2>Dados Financeiros <i className={'fa fa-times'} onClick={props.closeModal}/></h2>
            </div>
            <div className={'modal_body'}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={'6'}>
                            <TextField
                                variant={'outlined'}
                                label={'Valor da Hora'}
                                name={'valor'}
                                defaultValue={"valorHora" in props.instituicaoSelected ? props.instituicaoSelected.valorHora : ''}
                                InputProps={{startAdornment: <InputAdornment position={'start'}>$</InputAdornment>}}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={'6'}>
                            <FormControl fullWidth variant={'outlined'}>
                                <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                    Frequência de Pagamento
                                </InputLabel>
                                <Select
                                    value={freqPagamento}
                                    input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple"/>}
                                    onChange={(e) => setFreq(e.target.value)}>
                                    <MenuItem value={1}>Pôr Mês</MenuItem>
                                    <MenuItem value={2}>Bimestral</MenuItem>
                                    <MenuItem value={3}>Trimestral</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={'6'}>
                            <TextField
                                variant={'outlined'}
                                label={'Valor da Hora para AT'}
                                name={'valorAT'}
                                defaultValue={"valorHoraAT" in props.instituicaoSelected ? props.instituicaoSelected.valorHoraAT : ''}
                                InputProps={{startAdornment: <InputAdornment position={'start'}>$</InputAdornment>}}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant={'outlined'}>
                                <InputLabel ref={inputLabel2} htmlFor="outlined-age-simple">
                                    A Partir De
                                </InputLabel>
                                <Select
                                    value={aPartirDe}
                                    input={<OutlinedInput labelWidth={labelWidth2} name="age" id="outlined-age-simple"/>}
                                    onChange={(e) => setMes(e.target.value)}>
                                    {aPartirDeDataSet().map((mes, index) => (
                                        <MenuItem key={index} value={mes}>{mes}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item style={{textAlign: 'right'}} xs={12}>
                            <Button onClick={props.closeModal}>Cancelar</Button> &nbsp;
                            <Button type={'submit'} variant={'contained'} disabled={loading} color={'primary'}>
                                {loading ? 'Carregando...' : 'Confirmar'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    instituicaoSelected: state.instituicoes.instituicaoSelected,
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch({type: 'CLOSE_MODAL'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinanceiroModal);