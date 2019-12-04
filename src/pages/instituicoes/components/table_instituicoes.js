import React, {useState} from 'react';
import {Grid, IconButton, MenuItem} from "@material-ui/core";
import "../styles/table_instituicoes.sass";
import {connect} from "react-redux";
import Icon from "@material-ui/core/Icon";
import MoreVert from "@material-ui/icons/MoreVert"
import Menu from "@material-ui/core/Menu";

const Carrousel = (props) => {

    const [open, setOpen] = useState(false);

    return (
        <div className={'carrousel'}>
            <h2 onClick={() => setOpen(!open)}>
                {props.title}
                <span className={open ? ' rotated' : ''} style={{float: 'right'}}>
                    <i className={'fa fa-chevron-up'}/>
                </span>
            </h2>
            <div className={'body_carrousel'} style={{display: open ? 'block' : 'none'}}>
                {
                    props.data.map(funcionario => (
                        <p>{('nombre' in funcionario) ? funcionario.nombre : funcionario.nombreCompleto}</p>
                    ))
                }
            </div>
        </div>
    )
};

const Instituicao = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.target)
    };
    const handleClose = (e) => {
        setAnchorEl(null)
    };

    return (
        <div>
            <h2>{props.instituicao.nombreInstituicion}
                <span className={'menu-options'}>
                <IconButton onClick={handleClick}><Icon><MoreVert/></Icon></IconButton>
            </span>
            </h2>
            <Grid container xs={12} spacing={5}>
                <Grid item xs={3}>
                    <p>Valor da Hora:
                        <span style={{float: 'right'}}>
                            {'valorHora' in props.instituicao ? '$'+props.instituicao.valorHora : <i>Ainda não definido.</i>}
                        </span>
                    </p>
                </Grid>
                <Grid item xs={3}>
                    <p>Valor de Repasse para AT:
                        <span style={{float: 'right'}}>
                            {'valorHora' in props.instituicao ? '$'+props.instituicao.valorHoraAT : <i>Ainda não definido.</i>}
                        </span>
                    </p>
                </Grid>
                <Grid item xs={3}>
                    <p>Quantidade de Pacientes:
                        <span style={{float: 'right'}}>
                        {props.instituicao.pacientes.length}
                    </span>
                    </p>
                </Grid>
                <Grid xs={3} item>
                    <p>Funcionários registrados:
                        <span style={{float: 'right'}}>
                        {props.instituicao.funcionario.length}
                    </span>
                    </p>
                </Grid>
            </Grid>
            <Carrousel title={'Pacientes'} data={props.instituicao.pacientes}/>
            <Carrousel title={'Funcionarios'} data={props.instituicao.funcionario}/>
            <Menu open={Boolean(anchorEl)} keepMounted anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem
                    onClick={() => {
                        props.showModal('DADOS_FINANCEIROS_MODAL', 'sm');
                        props.selectInstituicao(props.instituicao);
                    }}>
                    Dados Financeiros &nbsp; &nbsp;
                </MenuItem>
            </Menu>
        </div>
    )
}

const TableInstituicoes = (props) => {
    return (
        <div className={'table_instituicoes'}>
            {
                props.instituicoes.length > 0 ?
                    props.instituicoes.map((instituicao, index) => (
                        <Instituicao instituicao={instituicao}
                                     key={index}
                                     selectInstituicao={props.selectInstituicao}
                                     showModal={props.showModal}/>
                    )) : <h2 style={{textAlign: 'center'}}>Ainda não há instituições cadastradas.</h2>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    instituicoes: state.instituicoes.instituicoes
})

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalSize) => dispatch({type: 'SHOW_MODAL', payload: modalType, size: modalSize}),
    selectInstituicao: (instituicao) => dispatch({type: 'SELECT_INSTITUICAO', payload: instituicao}),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableInstituicoes)

