import React from 'react';
import Grid from "@material-ui/core/Grid";
import "./confirm_pagamento.sass";
import {Link} from 'react-router-dom';
import {Button} from "@material-ui/core";
import Financeiro from "../../../DAOs/FinanceiroDAO";

const paymentObject = {
    nome: "Carlos Andrade",
    mesReferencia: 'Novembro / 2019',
    quantidadeHoras: "150",
    valorHora: '$150,00',
    valorTotal: '$12783,00',
};

const keys = ["nome", "mesReferencia", "quantidadeHoras", "valorHora", "valorTotal"];
const labels = ["Nombre", "Mes de Referencia", 'Cantidad de Horas', 'Valor de la Hora', 'Suma Total'];

const ConfirmarPagamento = (props) => {
    const requestPagamento = ()=>{
        let pay = {
            name: paymentObject.nome,
            id: `${paymentObject.nome}  ${paymentObject.mesReferencia}`,
            unit_price:  parseFloat(paymentObject.valorHora.replace('$', '')),
            quantity: parseInt(paymentObject.quantidadeHoras)
        };
        Financeiro.pagamento(pay, ({ data})=>{
            window.location.href = data;
        },(err)=>console.log(err));
    };
    return(
        <div>
            <div className={'topbar'}>
                <img src={require('../../../assets/logo2.png')}/>
            </div>
            <div className={'corpo'}>

                <h1>Confirmar Pagamento</h1>
                <p style={{color: '#777'}}>Por favor, verifique sus datos abajo antes de hacer el pago.</p>
                <div className={'card'}>
                    {
                        keys.map((chave, index) => (
                            <Grid container key={index}>
                                <Grid item xs={6}>
                                    <p style={{fontWeight: 400}}>{labels[index]}:</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <p style={{textAlign: 'right', color: '#666'}}>{paymentObject[chave]}</p>
                                </Grid>

                            </Grid>
                        ))
                    }
                    <Grid container>
                        <Grid item xs={12}>
                            <Button

                                onClick={requestPagamento}
                                variant={'contained'}
                                type={'submit'}
                                color={'primary'}
                                fullWidth>
                                Ir para pagamento
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default ConfirmarPagamento;