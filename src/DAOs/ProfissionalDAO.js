import axios from "axios";

const getProfissionais = (props, callbackSuccess = () => {}) => {
    axios.get("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/acompanhante/incoming_webhook/getAcompanhantes")
        .then(async res => {
            console.log('teste');
            await props.getProfissionais(res.data);
            callbackSuccess();
        })
        .catch(err => {
            alert(err)
        })
}

export { getProfissionais };