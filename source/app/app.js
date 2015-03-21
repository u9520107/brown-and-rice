import React from 'react';
import styles from './styles';
import 'normalize.css/normalize.css!';

class Container extends React.Component {
  render() {
    return <div>Hello Brown & Rice!</div>;
  }
}

export default {
  component: Container,
  routes: {
    '/': {
      name: 'home',
      title: 'Brown & Rice'
    }
  }
}
