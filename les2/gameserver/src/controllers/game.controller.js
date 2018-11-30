

let games = [{
	name: 'Battlefield 5',
	producer: 'EA',
	year: 2018,
	type: 'FPS'
}]

// Voorbeeld werken met arrays
games.forEach((item) => {
	// doe iets met item
})

module.exports = {

	getAll(req, res) {
		console.log('gameController.get called')
		res.status(200).json(games).end()
	},

	getById(req, res) {
		const id = req.params.gameId
		console.log('id = ' + id)
	},

	addNewGame(req, res) {
		console.log('gameController.addNewGame called')
		console.dir(req.body)

		// add game to array of games
		games.push(req.body)

		res.status(200).json({ 
			message: req.body.name + ' succesvol toegevoegd'
		}).end()
	}

}