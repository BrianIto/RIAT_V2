import axios from "axios";

const getProfissionais = (props, callbackSuccess = () => {}) => {
    return axios.get("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/acompanhante/incoming_webhook/getAcompanhantes")
        .then(async res => {
            await props.getProfissionais(res.data);
            callbackSuccess();
        })
        .catch(err => {
            alert(err)
        })
}

const acceptProfissional = (profissionalId, callbackSuccess = () => {}, callbackError = () => {}) => {
    axios
        .post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/acompanhante/incoming_webhook/updateAcompanhante', {
            id: profissionalId,
            changes: {
                accepted: true,
            }
        })
        .then(res => {
            callbackSuccess(res);
        })
        .catch(err => {
            callbackError(err);
        })
}

const rejectProfissional = (profissionalId, callbackSuccess = () => {}, callbackError = () => {}) => {
    axios
        .post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/acompanhante/incoming_webhook/updateAcompanhante', {
            id: profissionalId,
            changes: {
                accepted: false,
            }
        })
        .then(res => {
            callbackSuccess(res);
        })
        .catch(err => {
            callbackError(err);
        })
}

export { getProfissionais, acceptProfissional, rejectProfissional };