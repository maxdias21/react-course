import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {hasError: false}
  }

  // Sempre que encontrar um erro (olha o arquivo User.js), ele para aqui
  componentDidCatch(error) {
   this.setState({hasError: true})
  }

  render() {
    if(this.state.hasError) {
      return <p>Something was wrong!</p>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;