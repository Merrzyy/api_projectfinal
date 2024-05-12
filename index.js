const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
  res.send('Hello world!!')
})

app.get('/Movie', (req, res) => {
  connection.query(
    'SELECT * FROM Movie',
    function(err, results, fields) {
      res.send(results)
    }
  )
})

app.get('/users', (req, res) => {
  connection.query(
    'SELECT * FROM users',
    function(err, results, fields) {
      res.send(results)
    }
  )
})

app.listen(process.env.PORT || 3000)
