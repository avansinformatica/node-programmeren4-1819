const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const gameController = require('./src/controllers/game.controller')

var app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

const port = 3000

app.get('/games', gameController.getAll)
app.get('/games/:gameId', gameController.getById)
app.post('/games', gameController.addNewGame)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))