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

app.post('/users', (req, res) => {
  connection.query(
      'INSERT INTO `users` (`fname`, `lname`, `email`, `password`, `avatar`) VALUES (?, ?, ?, ?, ?)',
      [req.body.fname, req.body.lname, req.body.email, req.body.password, req.body.avatar],
       function (err, results, fields) {
          if (err) {
              console.error('Error in POST /users:', err);
              res.status(500).send('Error adding user');
          } else {
              res.status(201).send(results);
          }
      }
  )
})


app.listen(process.env.PORT || 3000)
