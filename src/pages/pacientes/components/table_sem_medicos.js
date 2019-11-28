import React from 'react'

const countHowMany = (array) => {
    let counter = 0;
 
    array.forEach(item => {
         if ("psi" in item) {
             if (item.psi) {
                 counter++;
             }
         }
    });
 
    return counter;
 }

const TableSemMedicos = (props) => (
    countHowMany(props.pacientes) ? <div className={'paciente_table container_sem_medico'}>
        <h2>Pacientes sem Médicos</h2>
        <table>
            <thead>
            <td>Nome</td>
            <td>Email do Familiar</td>
            <td>Telefone do Familiar</td>
            <td>Ações</td>
            </thead>
            <tbody>
            { props.pacientes.map((paciente, index) => (
                (!paciente.medico) ? <tr>
                    <td>{ paciente.nome }</td>
                    <td>{ paciente.emailFamiliar }</td>
                    <td>{ paciente.telefoneFamiliar }</td>
                    <td><button style={{width: '90%'}}>Adicionar Médico</button></td>
                </tr> : <></>
            )) }
            </tbody>
        </table>
    </div> : <></>
)

export default TableSemMedicos