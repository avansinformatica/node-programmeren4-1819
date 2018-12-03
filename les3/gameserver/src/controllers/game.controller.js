const Game = require('../models/game.model')
const ApiError = require('../models/apierror.model')
const pool = require('../config/db')

module.exports = {

	getAll(req, res, next) {
		console.log('gameController.get called')

		pool.query("SELECT * FROM games", (err, rows, fields) => {
			// Connection is automatically released when query resolves
			if(err){
				console.dir(err)
				return next(new ApiError(err.sqlMessage || err , 404))
			}
			res.status(200).json({ results: rows }).end()
		})
	},

	getById(req, res, next) {
		const id = req.params.gameId
		console.log('id = ' + id)

		if(id < 0 || id > games.length-1){
			next(new ApiError('Id does not exist', 404))
		} else {
			res.status(200).json(games[id]).end()
		}
	},

	addNewGame(req, res, next) {
		console.log('gameController.addNewGame called')
		console.dir(req.body)


		res.status(200).json({ 
			message: req.body.name + ' succesvol toegevoegd'
		}).end()
	}

}