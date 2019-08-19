import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import SearchIcon from './assets/search-icon.png'
import './SearchBar.css'

// Initial list of stock symbol suggestions
const symbols = [
  { symbol: 'AAPL', company: "Apple Inc." },
  { symbol: 'AMZN', company: "Amazon.com" },
  { symbol: 'FB',   company: "Facebook Inc." },
  { symbol: 'GOOG', company: "Alphabet Inc." },
  { symbol: 'LYFT', company: "Lyft Inc." },
  { symbol: 'MSFT', company: "Microsoft Corporation" },
  { symbol: 'NFLX', company: "Netflix Inc." },
  { symbol: 'SNAP', company: "Snap Inc." },
  { symbol: 'TSLA', company: "Tesla Inc." },
  { symbol: 'UBER', company: "Uber Technologies Inc." }
]

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      suggestions: []
    }
  }

  render() {
    const { value, suggestions } = this.state
    const inputProps = {
      value,
      placeholder: "Search for a symbol",
      onChange: this.onChange
    }

    return (
      <div className="display-flex flex-align-items-center">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            shouldRenderSuggestions={this.shouldRenderSuggestions}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps} />
        <div className="search-action-container display-flex flex-align-items-center">
          <button
            className="submit-btn"
            disabled={!value.length}
            onClick={this.handleSubmit}>
            <img src={SearchIcon} className="search-icon" alt="search-icon" />
          </button>
          <div className={this.props.hasError ? 'display-error-message' : 'hide-error-message'}>
            <div>Sorry, I can't seem to find the stock you're looking for.</div>
            <div>Please try another symbol.</div>
          </div>
        </div>
      </div>
    )
  }

  // Teach Autosuggest how to calculate suggestions through exact matching of stock symbol.
  getSuggestions = value => {
    const inputValue = value.toUpperCase()
    const inputLength = inputValue.length

    return inputLength === 0 ? [] : symbols.filter(record =>
      record.symbol.toUpperCase().slice(0, inputLength) === inputValue
    )
  }

  // When a suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest to use stock symbol as
  // input value for every given suggestion.
  getSuggestionValue = suggestion => {
    return suggestion.symbol
  }

  // Trigger parent to search stock price and company info
  handleSubmit = () => {
    this.props.onSearch(this.state.value)
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    })
  }

  // Autosuggest will call this function every time when value changes,
  // and suggestions will be updated.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  // Render suggestion with stock symbol and company name.
  renderSuggestion = suggestion => {
    return (
      <div className="display-flex flex-justify-space-between flex-align-items-center">
        <span className="stock-symbol-label">{suggestion.symbol}</span>
        <span className="company-name-label">{this.truncateText(suggestion.company, 25)}</span>
      </div>
    )
  }

	// Autosuggest will only display suggestions when input value is
  // at least 1 character long.
  shouldRenderSuggestions = value => {
    return value.length > 0
  }

  // Truncate text in case company name is too long to fit in autosuggest container
  truncateText(text, length){
    let len = (length === undefined ? 30 : length)
    if (text === null){
      return ""
    }
    else if (text.length <= len){
      return text
    }
    else {
      return `${ text.substring(0, len) }...`
    }
  }
}


export default SearchBar