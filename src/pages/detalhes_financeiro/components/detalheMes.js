import React from 'react';
import moment from 'moment/min/moment-with-locales'
import DetalheInstituicao from "./detalhe_instituicao";
import {Actions} from "../../../redux/actions";
import {connect} from "react-redux";

const DetalheMes = props => {

    return (
        <div>
            <h1>{moment(props.monthStr, 'MM').locale('pt-BR').format('MMMM')}</h1>
            {
                props.financialData.map((instituicao, index) => (
                    <DetalheInstituicao
                        month={moment(props.monthStr, 'MM').month()}
                        instituicao={instituicao}
                        index={index}
                        key={index}/>
                ))
            }
        </div>
    )
}

export default DetalheMes