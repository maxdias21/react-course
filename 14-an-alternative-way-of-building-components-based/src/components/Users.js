/* eslint-disable no-unused-vars */
import { Component, useState } from 'react';
import User from './User';

import classes from './Users.module.css';
import ErrorBoundary from './ErroBoundary';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class Users extends Component {
  constructor() {
    super();

    // Isso é como se fosse o useState
    // Sempre tem que ser um dicionário, diferente do useState que pode ter
    // qualquer valor inicial
    this.state = {
      showUsers: true,
    };
  }

  // Executado quando o componente monta
  // useEffect(() => {}, [])
  componentDidMount() {

  }

  // Executado quando o componente é atualizado
  // useEffect(() => {}, [someVar])
  componentDidUpdate() {
    if(this.props.users.length === 0) {
      throw new Error('No users provided!');
    }
  }

  // Função de limpeza, sempre quando o component for ser removido do dom
  // Usei várias vezes para limpar o 
  // useEffect(() => {
  // return () => {...}
  //  }, [])
  componentDidUnmount() {

  }

  toggleUsersHander() {
    // Como se fosse a segunda variável de atribuição do useState, aquela 
    // que começa sempre com set, assim que adiciona/modifica um valor com 
    // classes
    // Ele não funciona igual o useState, ou seja, o useState quando eu modifico o valor de algo ele apaga tudo
    // e cria um novo estado (por isso usamos tanto o spread ...), aqui ele não faz isso, ele atualiza apenas o que você
    // quer
    // this.setState({showUsers: false})

    // Inverter o valor booleano false | true ou vice versa
    this.setState((curState) => {
      return {showUsers: !curState.showUsers}
    })
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHander.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    )
  }
}


/*
const Users = () => {
  const [showUsers, setShowUsers] = useState(true);

  const toggleUsersHandler = () => {
    setShowUsers((curState) => !curState);
  };

  const usersList = (
    <ul>
      {DUMMY_USERS.map((user) => (
        <User key={user.id} name={user.name} />
      ))}
    </ul>
  );

  return (
    <div className={classes.users}>
      <button onClick={toggleUsersHandler}>
        {showUsers ? 'Hide' : 'Show'} Users
      </button>
      {showUsers && usersList}
    </div>
  );
};
*/

export default Users;
