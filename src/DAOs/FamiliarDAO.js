import axios from 'axios';

const getFamiliares = props => {
    return axios
        .get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/familiar/incoming_webhook/getAllFamiliars')
        .then(res => {
            console.log(res.data);
            props.setFamiliares(res.data);
        })
        .catch(err => {
            alert('Erro ao solicitar dados dos médicos do banco. Erro: '+ err);
        })
}

export {getFamiliares}