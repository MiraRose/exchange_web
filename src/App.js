import './App.css';
import React, { Component } from 'react';
import { CURRENCY_CODES } from './constants';

function fetchAPI(converted_to, converted_from, amount) {
  return fetch('http://127.0.0.1:3000/exchange/' + converted_to + '?converted_from=' + converted_from + '&amount=' + amount)
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      converted_to: "",
      converted_from: "",
      amount: 1.00,
      currency_codes: CURRENCY_CODES
    }
  }

  fetchAPI(converted_to, converted_from, amount) {
    let url = 'http://127.0.0.1:3000/exchange/' + converted_to + '?converted_from=' + converted_from + '&amount=' + amount
    console.log(url)
    return fetch(url)
  }

  renderSelectOptions(select_name, select_value) {
    return (
      <select name={select_name} value={select_value} onChange={() => this.handleInputChange}>
        {this.state.currency_codes.map(code => <option key={code} value={code}>{code}</option>)}
      </select>
    )
  }

  handleOnClick() {
    console.log("handling click")
    fetchAPI(this.state.converted_to, this.state.converted_from, this.state.amount).then(result => {
      this.setState({ result })
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
        <input value={this.state.amount} onChange={() => this.handleInputChange} type="number" min="1" step="any" />
        <button onClick={() => this.handleOnClick}>Convert</button>
        <div>{this.state.result}</div>
      </div>
    );
  }

}

export default App;
