const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// API routes
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' })
})

app.get('/stock/:symbol/price', (req, res) => {
  const token = 'pk_1be8526a198c4c298a3eb6e3fba5531c'
  const symbol = req.params.symbol
  const apiURL = `https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=T${token}`

  fetch(apiURL)
    .then(response => {
      if (response.ok) {
        response.json().then((data) => {
          res.json(data)
        })
      }
      else {
        res.sendStatus(response.status)
      }
    })
    .catch(error => {
        console.log(error)
        alert(error.message)
    })
})

app.get('/stock/:symbol/company', (req, res) => {
  const token = 'pk_5f69bda1e3074237a9d2e844a3dafbff'
  const symbol = req.params.symbol
  const apiURL = `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${token}`

  fetch(apiURL)
    .then(response => {
      if (response.ok) {
        response.json().then((data) => {
          res.json(data)
        })
      }
      else {
        res.sendStatus(response.status)
      }
    })
    .catch(error => {
        console.log(error)
        alert(error.message)
    })
})


app.listen(port, () => console.log(`Listening on port ${port}`))