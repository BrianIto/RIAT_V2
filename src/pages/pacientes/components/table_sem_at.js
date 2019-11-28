import React from 'react'

const countHowMany = (array) => {
   let counter = 0;

   array.forEach(item => {
        if ("at" in item) {
            if (item.at) {
                counter++;
            }
        }
   });

   return counter;
}

const TableSemAT = (props) => (
    countHowMany(props.pacientes) > 0 ? <div className={'paciente_table container_sem_at'}>
        <h2>Pacientes sem Ats Definidos</h2>
        <table>
            <thead>
            <td>Nome</td>
            <td>Tipo de Quadro</td>
            <td>Horário</td>
            <td>Ações</td>
            </thead>
            <tbody>
            { props.pacientes.map((paciente, index) => (
                (!paciente.AT && paciente.medico) ? <tr>
                    <td>{ paciente.nome }</td>
                    <td>{ paciente.quadro }</td>
                    <td>{ paciente.horarioInicio } até { paciente.horarioFim } </td>
                    <td><button>Editar</button> <button>Match</button></td>
                </tr> : <></>
            )) }
            </tbody>
        </table>
    </div> : <></>
)

export default TableSemAT