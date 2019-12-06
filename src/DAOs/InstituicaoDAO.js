import axios from 'axios';

const getInstituicao = props => {
    return axios
        .get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/instituicao/incoming_webhook/getInstituicaoComFuncionario')
        .then(res => {
            console.log(res.data);
            props.setInstituicoes(res.data);
        })
        .catch(err => {
            alert('Erro ao solicitar dados dos médicos do banco. Erro: '+ err);
        })
}

export {getInstituicao}