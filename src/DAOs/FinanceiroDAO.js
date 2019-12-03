import axios from 'axios';
import {setPacientes} from "./PacienteDAO";
import moment from "moment/min/moment-with-locales";

class Financeiro {
    static getSaidasFromDB = (callbackSuccess, callbackFail, loadingCallback = () => {
    }) => {
        loadingCallback();
        axios
            .get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/financeiro/incoming_webhook/getSaidas')
            .then(res => callbackSuccess(res))
            .catch(err => callbackFail(err))
    }

    static getInstituicoesComSessoes = (callbackSuccess, callbackFail, loadingCallback = () => {
    }) => {
        loadingCallback();
        axios
            .get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/instituicao/incoming_webhook/getInstituicaoComSessoes')
            .then(res => callbackSuccess(res))
            .catch(err => callbackFail(err))
    }

    static newSaida = (data, callbackSuccess, callbackFail, loadingCallback = () => {
    }) => {
        loadingCallback();
        const url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/financeiro/incoming_webhook/createSaida'
        axios
            .post(url, data)
            .then(res => callbackSuccess(res))
            .catch(err => callbackFail(err))
    }

    static getSessoesFromDB = (data, callbackSuccess, callbackFail, loadingCallback = () => {
    }) => {
        loadingCallback();
        const url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/financeiro/incoming_webhook/getSessaoComInstituicao';
        axios
            .post(url, data)
            .then(res => callbackSuccess(res))
            .catch(err => callbackFail(err));
    }

    static getSessoes = (callbackSuccess, callbackFail, loadingCallback = () => {
    }) => {
        const url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/sessoes/incoming_webhook/getSessoes';
        loadingCallback();
        axios
            .get(url)
            .then(res => callbackSuccess(res))
            .catch(err => callbackFail(err))
    }

    static getInstituicoesFinanceiroFromDB = (callbackSuccess, callbackFail, loadingCallback = () => {
    }) => {
        loadingCallback();
        const url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/financeiro/incoming_webhook/getInstituicaoComPacientesEAcompanhantes';
        axios
            .get(url)
            .then(res => {
                callbackSuccess(res)
            })
            .catch(err => {
                callbackFail(err)
            })
    }

    static getMesesFechados = (callbackSuccess, callbackError, callbackLoading) => {
        callbackLoading();
        axios
            .get("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/financeiro/incoming_webhook/getMesesFechados")
            .then(res => {
                callbackSuccess(res.data);
            })
            .catch(error => {
                callbackError(error);
            })
    }

    static prepareDataForAnalysis = async (sessions, callbackSuccess, callbackFail, loadingCallback = () => {
    }) => {
        let data;
        await Financeiro.getInstituicoesFinanceiroFromDB(res => {
            data = res.data;
            data.forEach(instituicao => {
                instituicao.pacientes.forEach(paciente => {
                    paciente.acompanhantes.forEach(acompanhante => {
                        acompanhante['sessoes'] = Financeiro.getSessoesFromPacienteAndAt(sessions, paciente.solicitacao._id.$oid, acompanhante._id.$oid);
                    })
                })
            })
            callbackSuccess(data)
        }, err => {
            alert(err)
        });
    }

    static getSessoesFromPacienteAndAt = (sessoes, solicitacaoId, atId) => {
        let array = [];
        sessoes.forEach(sessao => {
            if (sessao.solicitacaoId.$oid === solicitacaoId && sessao.acompanhante.$oid === atId) {
                array.push(sessao);
            }
        });
        return array;
    }

    static getHorasTrabalhadasInPacienteAndAcompanhante = (sessoes, solicitacaoId, acompanhanteId, month) => {
        let array = Financeiro.getSessoesFromPacienteAndAt(sessoes, solicitacaoId, acompanhanteId);
        let totalHoras = 0;
        array.forEach(item => {
            let now = new Date(item.horaInicio);
            let then = new Date(item.horarioFim);
            if (month === now.getMonth()) {
                item["horasTrabalhadas"] = moment.utc(moment(then).diff(moment(now))).hours();
                if (!isNaN(item["horasTrabalhadas"])) {
                    totalHoras += item["horasTrabalhadas"];
                }
            }
        });

        return totalHoras;
    }

    static fechaMes = (mes, callbackSuccess, callbackFail, callbackLoading = () => {}) => {
        callbackLoading();
        let url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/riat-sfhra/service/financeiro/incoming_webhook/fechaMes';
        axios
            .post(url, mes)
            .then(res => {
                callbackSuccess(res);
            })
            .catch(error => {
                callbackFail(error);
            });
    }
}

export default Financeiro