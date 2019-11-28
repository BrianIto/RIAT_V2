import React, {useState} from 'react';
import "./topbar.sass";
import { connect } from "react-redux";
import { IconButton, MenuItem } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import MoreVert from "@material-ui/icons/MoreVert"
import Menu from "@material-ui/core/Menu";

const Topbar = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => { setAnchorEl(e.target) };

    const handleClose = (e) => { setAnchorEl(null) };

    const logout = () => {
        localStorage.removeItem('login_user');
        localStorage.removeItem('login_password');
        props.setUser(null);
    }

    return (
    <div className={'topbar_container'}>
        <img alt='RIAT' src={require('../../../assets/logo2.png')} />
        <div className={'user_data'}>
            <div>{props.userData.name} <IconButton onClick={handleClick}><Icon><MoreVert /></Icon></IconButton> </div>
            <Menu open={Boolean(anchorEl)} keepMounted anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem  onClick={logout}>Sair &nbsp; &nbsp;</MenuItem>
            </Menu>
        </div>
    </div>
)}

const mapStateToProps = (state) => ({
    userData: state.login.userData
})

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch({type: 'SET_USER', payload: user})
})

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)