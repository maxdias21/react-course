// Serve apenas para mostrar como redux funcionaria com React usando class

import classes from './Counter.module.css';

import { connect } from 'react-redux';
import { Component } from 'react';

class Counter extends Component {
  incrementHandler() {
    this.props.increment();
  }

  decrementHandler() {
    this.props.decrement();
  }

  render() {
    return (
      <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{this.props.counter}</div>
      <div>
        <button onClick={this.incrementHandler.bind(this)}>Increment</button>
        <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
      </div>
      <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
    </main>
  )}
}

// Aqui criando o state, no caso, apenas counter
const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}

// Aqui estou usando as funções de dispatch increment e decrement
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({type: 'increment'}),
    decrement: () => dispatch({type: 'decrement'})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
