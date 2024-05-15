const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
    res.send('Hello world!!')
})

app.get('/users', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM users WHERE id = ?', [id],
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.post('/users', (req, res) => {
    connection.query(
        'INSERT INTO `users` (`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?, ?, ?, ?, ?)',
        [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar],
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

app.put('/users', (req, res) => {
    connection.query(
        'UPDATE `users` SET `fname`=?, `lname`=?, `username`=?, `password`=?, `avatar`=? WHERE id =?',
        [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar, req.body.id],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.delete('/users', (req, res) => {
    connection.query(
        'DELETE FROM `users` WHERE id =?',
        [req.body.id],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.get('/movie', (req, res) => {
  connection.query(
      'SELECT * FROM movie',
      function (err, results, fields) {
          res.send(results)
      }
  )
})

app.get('/download', (req, res) => {
    connection.query(
        'SELECT * FROM Download',
        function (err, results, fields) {
            res.send(results)
        }
    )
  })

  app.post('/download', (req, res) => {
    connection.query(
        'INSERT INTO `Download` (`ID`, `Name`, `Year`, `Genre`, `Sinopsis`, `Content Rating`, `img_url`, `Episode`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [req.body.id, req.body.Name, req.body.Year, req.body.Genre, req.body.Sinopsis, req.body.Contentrating, req.body.img_url, req.body.Episode],
         function (err, results, fields) {
            if (err) {
                console.error('Error in POST /download:', err);
                res.status(500).send('Error adding download');
            } else {
                res.status(201).send(results);
            }
        }
    )
})

app.delete('/download', (req, res) => {
    connection.query(
        'DELETE FROM `Download` WHERE Name =? AND img_url =?',
        [req.body.Name, req.body.img_url],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.listen(process.env.PORT || 3000, () => {
    console.log('CORS-enabled web server listening on port 3000')
})
