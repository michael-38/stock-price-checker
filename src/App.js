import React, { Component } from 'react'
import logo from './assets/logo.png'
import Results from './Results.js'
import SearchBar from './SearchBar.js'
import './App.css'

class App extends Component {
  state = {
    company: '',
    price: '',
    hasError: false
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <SearchBar
            onSearch={this.searchStock}
            hasError={this.state.hasError}>
          </SearchBar>
        </header>

        <Results
          price={this.state.price}
          company={this.state.company}
          hasError={this.state.hasError}>
        </Results>
      </div>
    )
  }

  searchStock = async (value) => {
    let priceURL = `/stock/${ value }/price`
    let companyURL = `/stock/${ value }/company
    `
    // fetch price data
    fetch(priceURL)
      .then(res => {
        if (res.ok) {
          res.json()
          .then( (result) => {
            this.setState({
              price: result,
              hasError: false
            })
          })
        }
        else {
          this.setState({
            company: '',
            price: '',
            hasError: true
          })
        }
      })

    // fetch company data
    fetch(companyURL)
      .then(res => {
        if (res.ok) {
          res.json()
          .then( (result) => {
            this.setState({
              company: result,
              hasError: false
            })
          })
        }
        else {
          this.setState({
            company: '',
            price: '',
            hasError: true
          })
        }
      })
  }
}


export default App