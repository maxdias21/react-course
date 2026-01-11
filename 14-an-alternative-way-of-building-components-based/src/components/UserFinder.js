import { Fragment, useState, useEffect, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErroBoundary';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class UserFinder extends Component {
  // Como se fosse o UsersContext.Consumer, ele consome apenas uma vez
  // Se não fizer assim, ele vai consumir várias vezes
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: DUMMY_USERS,
      searchTerm: ''
    };
  }

  componentWillUnmount() {
    console.log('Users will be unmounted')
  }

  // Recebe como param o as props antigas e o estado anterior do componente
  componentDidUpdate(prevProps, prevState) {
    if(prevState.searchTerm !== this.state.searchTerm) {
      this.setState({filteredUsers: DUMMY_USERS.filter((user) => user.name.includes(this.state.searchTerm))});
    }
  }

  searchChangedHandler(event) {
    this.setState({searchTerm: event.target.value});
  }

  componentDidMount() {
    this.setState({filteredUsers: DUMMY_USERS});
  }

  render() {
    return (
      <Fragment>
          <div className={classes.finder}>
            <input type='search' onChange={this.searchChangedHandler.bind(this)} />
          </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    )
  }
}

/*
const UserFinder = () => {
  const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredUsers(
      DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
    );
  }, [searchTerm]);

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Fragment>
      <div className={classes.finder}>
        <input type='search' onChange={searchChangeHandler} />
      </div>
      <Users users={filteredUsers} />
    </Fragment>
  );
};
*/

export default UserFinder;