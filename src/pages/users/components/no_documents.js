import React from "react"
import "../styles/no_documents.sass"

const NoDocuments = (props) => (
    <div className={'no_documents'}>
        <i className={'far fa-frown'} />
        <h2>Nada para mostrar, por enquanto...</h2>
    </div>
)

export default NoDocuments