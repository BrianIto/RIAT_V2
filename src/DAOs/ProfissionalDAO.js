import axios from "axios";

const getProfissionais = (props) => {
    axios.get("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/acompanhante/incoming_webhook/getAcompanhantes")
        .then(res => {
            console.log('teste');
            props.getProfissionais(res.data);
        })
        .catch(err => {
            alert(err)
        })
}

export { getProfissionais };