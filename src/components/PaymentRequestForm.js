import React from 'react';
import {injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements';

class PaymentRequestForm extends React.Component {
    constructor(props) {
      super(props);
  
      // For full documentation of the available paymentRequest options, see:
      // https://stripe.com/docs/stripe.js#the-payment-request-object
      const paymentRequest = props.stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1000,
        },
      });
  
      paymentRequest.on('token', ({complete, token, ...data}) => {
        console.log('Received Stripe token: ', token);
        console.log('Received customer information: ', data);
        complete('success');
      });
  
      paymentRequest.canMakePayment().then((result) => {
        this.setState({canMakePayment: !!result});
      });
  
      this.state = {
        canMakePayment: false,
        paymentRequest,
      };
    }
  
    render() {
      return this.state.canMakePayment ? (
        <PaymentRequestButtonElement
          paymentRequest={this.state.paymentRequest}
        />
      ) : <div>CANT MAKE PAYMENT</div>;
    }
  }

export default injectStripe(PaymentRequestForm);