import React from "react"
import "../styles/card_right.sass"

const CardRight = (props) => {
    return (
        <div className={'card_right_financeiro'}>
            <p>Saldo: <span>POSITIVO</span></p>
            <p>Quant. ATs: <span>125</span></p>
            <p>Média dos ATs: <span>$167,32</span></p>
            <p>Instituições: <span>3</span></p>
            <p>Pacientes: <span>42</span></p>
            <p>Saldo do Mês Ant.: <span>$ 1.520,00</span></p>
        </div>
    )
}

export default CardRight