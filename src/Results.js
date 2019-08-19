import React, { Component } from 'react'
import './Results.css'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="results-container">
        <label className="results-label">Company Name</label>
        <p className="results-text">{this.props.company.companyName}</p>

        <label className="results-label">Current Stock Price</label>
        <p className="results-text">{this.props.price}</p>

        <label className="results-label">Company Description</label>
        <p className="results-text">{this.props.company.description}</p>
      </div>
    )
  }
}

export default Results