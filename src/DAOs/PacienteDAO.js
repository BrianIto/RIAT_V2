import axios from 'axios';

const setPacientes = props => {
    return axios.get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/paciente/incoming_webhook/getPacientesComSolicitacao')
        .then(result => {
            console.log(result.data);
            props.setPacientes(result.data);
        })
        .catch(err => {
            alert(err);
        })
}

const editPaciente = (props, data) => {
    //DATA TYPE = {_id: $oid, changes: *all changes* }
    const url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/paciente/incoming_webhook/editPaciente'
    axios
        .post(url, data)
        .then(res => {
            console.log(res.data);
            setPacientes(props);
        })
        .catch(err => {
            alert('Erro ao editar paciente. Erro: '+ err);
        })
}

export {editPaciente, setPacientes}