import React from "react"
import { Dialog } from "@material-ui/core";
import {connect} from "react-redux";
import NewUserModal from "../../../pages/users/components/modals/new_user_modal";
import Slide from "@material-ui/core/Slide";
import "./modal_father.sass"
import ModalMatch from "../../../pages/pacientes/components/modals/modal_match";
import ModalForgetPassword from "../../../pages/login/components/modals/modal_forget_password";
import FinanceiroModal from "../../../pages/instituicoes/components/modals/financeiro_modal";
import ModalEditarPaciente from "../../../pages/pacientes/components/modals/modal_editar";
import NovaSaidaModal from "../../../pages/financeiro/components/modals/nova_saida";
import FecharMesModal from "../../../pages/detalhes_financeiro/components/modals/confirm_fechar_mes";
import ModalEditarProfissional from '../../../pages/profissionais/components/modals/modal_editar';
import ModalDocumentos from "../../../pages/profissionais/components/modals/modal_documentos";

const renderModalAccordingly = (modalType) => {
    switch (modalType) {
        case 'RESET_PASSWORD':
            return <ModalForgetPassword />
        case 'MATCH_MODAL':
            return <ModalMatch />
        case 'NEW_USER_MODAL':
            return <NewUserModal />
        case 'MODAL_EDITAR_PROFISSIONAL':
            return <ModalEditarProfissional />
        case 'DADOS_FINANCEIROS_MODAL':
            return <FinanceiroModal />
        case 'MODAL_EDITAR_PACIENTE':
            return <ModalEditarPaciente />
        case 'MODAL_CONFIRM_FECHAR_MES':
            return <FecharMesModal />
        case 'MODAL_NOVA_SAIDA':
            return <NovaSaidaModal />
        case 'MODAL_DOCUMENTOS_PROFISSIONAL':
            return <ModalDocumentos/>
            default:
            return <h2>Esse modal não existe. Algum erro foi cometido.</h2>
    }
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalFather = (props) => (
    <Dialog
        open={props.showModal}
        fullScreen={false}
        maxWidth={props.modalSize}
        fullWidth={true}
        TransitionComponent={Transition}
        onClose={props.closeModal}>
        { renderModalAccordingly(props.modalType) }
    </Dialog>
);

const mapStateToProps = (state) => ({
    showModal: state.general.showModal,
    modalType: state.general.modalType,
    modalSize: state.general.modalSize
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({type: 'CLOSE_MODAL'})
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalFather);