import React, { Component } from 'react';
import './App.css';

import MyStoreCheckout from './components/MyStoreCheckout'
import {StripeProvider} from 'react-stripe-elements';

class App extends Component {
  render() {
    return (
      <div className="m-container">
        <StripeProvider apiKey="pk_test_JhKEZAELWzRIbo8ETppaJFjc">
          <MyStoreCheckout />
        </StripeProvider>
      </div>
    );
  }
}

export default App;
