
import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';
import InjectedPaymentRequestForm from './PaymentRequestForm';

class MyStoreCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
        {/* <InjectedPaymentRequestForm /> */}
      </Elements>
    );
  }
}

export default MyStoreCheckout;