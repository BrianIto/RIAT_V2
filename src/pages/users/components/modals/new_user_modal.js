import React, {useState} from 'react'
import {Select, TextField, Button} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import {connect} from "react-redux";
import {UserPasswordAuthProviderClient, Stitch} from "mongodb-stitch-browser-sdk"
import axios from "axios";
import Usuario from "../../../../DAOs/UsuarioDAO";
import {Actions} from "../../../../redux/actions";


const NewUserModal = (props) => {

    const [value, setValue] = useState({val: '', permissions: []});

    const handleChange = (event) => {
        const val = event.target.value;
        if (val === 0) {
            setValue({val: val, permissions: ['Financeiro', 'Administrativo', 'Terapéutico']})
        } else if (val === 1) {
            setValue({val: val, permissions: ['Financeiro']})
        } else if (val === 2) {
            setValue({val: val, permissions: ['Administrativo']})
        } else if (val === 3) {
            setValue({val: val, permissions: ['Terapéutico']})
        }
    }

    const [labelWidth, setLabelWidth] = React.useState(0);
    const inputLabel = React.useRef(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const createNewUser = (email, password, name, permissions) => {
        const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory)
        setLoading(true);
        emailPassClient.registerWithEmail(email, password)
            .then((res) => {
                axios.post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/usuarios/incoming_webhook/admCreate',
                    {
                        email: email,
                        name: name,
                        permissions: permissions,
                        user_id: 'need to login first time.'
                    }).then((res) => {
                        Usuario.getUsuariosFromDB(res => {
                            props.closeModal();
                            setLoading(false);
                            props.setUsuarios(res.data);
                        }, (err) => {
                            props.closeModal();
                            setLoading(false);
                            alert('Erro ao recuperar usuários do banco de dados! Erro: '+err );
                        })
                })
                    .catch((err) => {
                        alert(err.error);
                    })
            })
            .catch((err) => {
                alert('erro: ' + err);
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        createNewUser(form.email.value, form.password.value, form.name.value, value.permissions);
    }

    return (
        <div>
            <div className={'modal_header'}>
                <h2>Novo Usuário <i className={'fa fa-times'} onClick={props.closeModal}/></h2>
            </div>
            <div className={'modal_body'}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={'12'}>
                            <TextField
                                variant={'outlined'}
                                label={'E-mail'}
                                name={'email'}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={'6'}>
                            <TextField
                                type={'password'}
                                name={'password'}
                                variant={'outlined'}
                                label={'Senha'}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={'6'}>
                            <TextField
                                type={'password'}
                                variant={'outlined'}
                                label={'Confirmar Senha'}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={'6'}>
                            <TextField
                                variant={'outlined'}
                                name={'name'}
                                label={'Nome'}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={'6'}>
                            <FormControl fullWidth variant={'outlined'}>
                                <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                                    Tipo de Usuário
                                </InputLabel>
                                <Select
                                    value={value.val}
                                    input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple"/>}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-simple',
                                    }}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>Todos</MenuItem>
                                    <MenuItem value={1}>Financeiro</MenuItem>
                                    <MenuItem value={2}>Administrativo</MenuItem>
                                    <MenuItem value={3}>Terapéutico</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item style={{textAlign: 'right'}} xs={12}>
                            <Button onClick={props.closeModal}>Cancelar</Button> &nbsp;
                            <Button type={'submit'} variant={'contained'} color={'primary'} disabled={loading}>
                                {loading ? 'Carregando' : 'Confirmar' }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({type: 'CLOSE_MODAL'}),
    setUsuarios: usuarios => dispatch({type: Actions.setUsuarios, payload: usuarios})
})

export default connect(mapStateToProps, mapDispatchToProps)(NewUserModal)