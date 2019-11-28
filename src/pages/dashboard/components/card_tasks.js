import React from 'react'
import "../styles/components/card_tasks.sass"

const tasks = [
    {
        amount: 5,
        type: 'ATs cancelaram suas visitas',
        button: <button>Verificar Ajuste</button>
    },
    {
        amount: 3,
        type: 'cadastros de paciente sem médico',
        button: <button>Entrar em Contato</button>
    },
    {
        amount: 10,
        type: 'profissionais sem aprovação',
        button: <button>Verificar Aprovação</button>
    },
    {
        amount: 15,
        type: 'pacientes sem ATs assignados',
        button: <button>Fazer Match</button>
    }
]

const CardTasks = (props) => (
    <div className={'card_tasks_container'}>
        <h2>Tarefas Pendentes</h2>
        <div className={'tasks'}>
            {
                tasks.map((task, index) => {
                  if (task.amount > 0 ) {
                      return (
                          <div style={{display: 'flex'}} key={index}>
                              <h4 style={{width: '63%'}}>
                                  {task.amount} {task.type}
                              </h4>
                              <div style={{width: '37%', display: 'inline-block'}}>{task.button}</div>
                          </div>
                      )
                  } else {
                      return <></>
                  }
                })
            }
        </div>
    </div>
)

export default CardTasks