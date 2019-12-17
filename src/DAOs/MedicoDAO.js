import axios from 'axios';

const getMedicos = props => {
    return axios
        .get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/psis/incoming_webhook/getAllPsis')
        .then(res => {
            props.setMedicos(res.data);
        })
        .catch(err => {
            alert('Erro ao solicitar dados dos médicos do banco. Erro: '+ err);
        })
}

export {getMedicos}