import './App.css';
import React, { Component } from 'react';
import { CURRENCY, API_URL } from './constants';

function fetchAPI(converted_to, converted_from, amount) {
  return fetch('http://' + API_URL + '/exchange/' + converted_to + '?converted_from=' + converted_from + '&amount=' + amount)
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      converted_to: "USD",
      convert_to_symbol: "",
      converted_from: "CAD",
      amount: 1.00,
      currency: CURRENCY
    }
  }

  renderSelectOptions(select_name, select_value) {
    return (
      <select name={select_name} value={select_value} onChange={(e) => this.handleInputChange(e)}>
        {this.state.currency.map(currency => <option key={currency.code} value={currency.code}>{currency.code} ({currency.name})</option>)}
      </select>
    )
  }

  handleOnClick() {
    fetchAPI(this.state.converted_to, this.state.converted_from, this.state.amount)
    .then(response => response.json())
    .then((result) => {
      this.setState({ result: result.new_amount })
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="App">
        <h1>
          Currency Conversion
        </h1>
        <h3>Convert From</h3>
        {this.renderSelectOptions("converted_from", this.state.converted_from)}
        <h3>Convert To</h3>
        {this.renderSelectOptions("converted_to", this.state.converted_to)}
        <h3>Amount</h3>
        <input name="amount" value={this.state.amount} onChange={(e) => this.handleInputChange(e)} type="number" min="1" step="any" />
        <button onClick={() => this.handleOnClick()}>Convert</button>
        <h3>{this.state.convert_to_symbol}Result</h3>
        <div>{this.state.result}</div>
      </div>
    );
  }

}

export default App;
