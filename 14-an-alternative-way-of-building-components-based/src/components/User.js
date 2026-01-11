import classes from './User.module.css';
import {Component} from 'react';

class User extends Component {
  // É como se fosse o return de uma função, tem o mesmo objetivo
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

/*
const User = (props) => {
  return <li className={classes.user}>{props.name}</li>;
};
*/

export default User;
