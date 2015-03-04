import React from 'react';
import 'normalize.css/normalize.css!';
import 'font-awesome/css/font-awesome.css!';

const App = React.createClass({
  render() {
    return <div>Hello Brown & Rice

    </div>;
  }
});



export default {
  component: App,
  stores: [
  ],
  routes: {
    '/': {
      name: 'home',
      title: 'Brown and Rice'
    }
  }
};
