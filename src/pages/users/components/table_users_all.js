import React from 'react';
import {connect} from "react-redux";

const renderUsersAccordingly = (props) => {

    let users = [];

    switch (props.tabSelected) {
        default:
            users = [...props.users];
            break;
        case 1:
            props.users.forEach(user => {
                if (user.permissions.includes('Financeiro')) {
                    users.push(user);
                }
            });
            break;
        case 2:
            props.users.forEach(user => {
                if (user.permissions.includes('Administrativo')) {
                    users.push(user);
                }
            });
            break;
    }

    return (users.map(user => (
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    {user.permissions.map((permission, index, array) => (
                        (array.length - 1) === index ? permission : permission + ", "
                    ))}
                </td>
                <td>
                    <button>Editar</button> <button>Desvincular</button>
                </td>
            </tr>
        ))
    )
}

const TableUsersAll = (props) => (
    <div className={'paciente_table users_all_table'}>
        <table>
            <thead>
            <td>Nome</td>
            <td>E-mail</td>
            <td>Permissões</td>
            <td>Ações</td>
            </thead>
            <tbody>
            { renderUsersAccordingly(props) }
            </tbody>
        </table>
    </div>
)

export default connect()(TableUsersAll)