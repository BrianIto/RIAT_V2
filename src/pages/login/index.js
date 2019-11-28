import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import FormLogin from "./components/form";
import AboveForm from "./components/above_form";

const LoginPage = (props) => {

    if (props.userData) {
        return (<Redirect to={'/dashboard'}/>)
    }
    return (
        <div className={'full_container full_container_login'} style={{height: '100%'}}>
            <AboveForm />
            <FormLogin />
            <p
                onClick={() => { props.showModal('RESET_PASSWORD', 'sm')}}
                style={{color: "#FFF", textAlign: 'center', marginTop: '5px', cursor: 'pointer'}}>Esqueceu sua senha?</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userData: state.login.userData
})

const mapDispatchToProps = (dispatch) => ({
    showModal: (modalType, modalSize) => dispatch({type: 'SHOW_MODAL', payload: modalType, size: modalSize}),
    setUser: (user) => dispatch({type: 'SET_USER', payload: user}),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)