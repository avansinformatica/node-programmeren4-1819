const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const gameRoutes = require('./src/routes/game.routes')

var app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

const port = 3000

app.use('/api', gameRoutes)

app.use('*', (err, req, res, next) => {
	// hier heb ik de error
	// -> return response naar caller
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// for testing purpose
module.exports = app