import React from 'react'
import "../styles/components/card_top.sass"

const CardTop = (props) => (
    <div className={'card_container'}>
        <h2>{props.data.amount}</h2>
        <h3>{props.data.type}</h3>
    </div>
)

export default CardTop