import axios from 'axios';

class Usuario {

    static getUsuariosFromDB = (callbackSuccess = () => {}, callbackFail = () => {}) => {
        axios.get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/usuarios/incoming_webhook/admFind')
            .then((res) => {
                callbackSuccess(res);
            })
            .catch(err => {
                callbackFail(err);
            });
    }
}

export default Usuario;