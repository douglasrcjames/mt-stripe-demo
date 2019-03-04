import React, {Component} from 'react';
import {CardNumberElement,CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        complete: '',
        name: "Douglas James",
        addr1: "814 Vine Street",
        city: "San Jose",
        addrState: "CA",
        zip: "95110",
        country: "USA"
    }
    this.messageCharge = this.messageCharge.bind(this);
    this.callCharge = this.callCharge.bind(this);
    
  }

  async messageCharge(ev) {
    //Tokenizing
    let {token} = await this.props.stripe.createToken({
        name: this.state.name,
        address_line1: this.state.addr1,
        address_city: this.state.city,
        address_state: this.state.addrState,
        address_zip: this.state.zip,
        address_country: this.state.country,
        currency: 'usd',
    });

    let response = await fetch("/charge-message", {
        method: "POST",
        headers: {"Content-Type": "text/plain"},
        body: token.id
    });

    if (response.ok){
        this.setState({
            complete: 'message-charge'
        });
    } 
  }

  async callCharge(ev) {
    //Tokenizing
    let {token} = await this.props.stripe.createToken({
        name: this.state.name,
        address_line1: this.state.addr1,
        address_city: this.state.city,
        address_state: this.state.addrState,
        address_zip: this.state.zip,
        address_country: this.state.country,
        currency: 'usd',
    });

    let response = await fetch("/charge-call", {
        method: "POST",
        headers: {"Content-Type": "text/plain"},
        body: token.id
    });

    if (response.ok){
        this.setState({
            complete: 'call-charge'
        });
    } 
  }

  render() {
    return (
      <div className="checkout">
        <p>Fill in your card data</p>
        <CardNumberElement/>
        <CardExpiryElement/>
        <CardCVCElement/>
        <br/>
        <button onClick={this.messageCharge}>Message Charge</button>
        <button onClick={this.callCharge}>Call Charge</button>
        <br/>
        <br/>
        Current charge: {this.state.complete}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);