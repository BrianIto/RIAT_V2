import React from 'react';
import Grid from "@material-ui/core/Grid";
import "./confirm_pagamento.sass";

const paymentObject = {
    nome: "Carlos Andrade",
    mesReferencia: 'Novembro / 2019',
    quantidadeHoras: "150",
    valorHora: '$150,00',
    valorTotal: '$12783,00',
}

const keys = ["nome", "mesReferencia", "quantidadeHoras", "valorHora", "valorTotal"];
const labels = ["Nombre", "Mes de Referencia", 'Cantidad de Horas', 'Valor de la Hora', 'Suma Total'];

const ConfirmarPagamento = (props) => (
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
                        <Grid container>
                            <Grid item xs={6}>
                                <p style={{fontWeight: 400}}>{labels[index]}:</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p style={{textAlign: 'right', color: '#666'}}>{paymentObject[chave]}</p>
                            </Grid>
                        </Grid>
                    ))
                }
            </div>
        </div>
    </div>
)

export default ConfirmarPagamento;