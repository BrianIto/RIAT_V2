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

const getSessoesFromPaciente = (paciente, callbackSuccess = () => {}, callbackError = () => {}) => {
     axios
         .post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/paciente/incoming_webhook/getSessoesPacientes', {id: paciente._id})
         .then(res => {
             callbackSuccess(res);
         })
         .catch(err => {
             callbackError(err);
         })
}

const editPaciente = (props, data, callbackSuccess = () => {}) => {
    //DATA TYPE = {_id: $oid, changes: *all changes* }
    const url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/paciente/incoming_webhook/editPaciente'
    axios
        .post(url, data)
        .then(res => {
            console.log(res.data);
            setPacientes(props);
            props.closeModal();
            callbackSuccess(res);
        })
        .catch(err => {
            alert('Erro ao editar paciente. Erro: '+ err);
        })
}

export {editPaciente, setPacientes, getSessoesFromPaciente}