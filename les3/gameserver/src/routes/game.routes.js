const router = require('express').Router()
const gameController = require('../controllers/game.controller')
<<<<<<< HEAD

=======
const authController = require('../controllers/auth.controller')
>>>>>>> master

router.get('/games', gameController.getAll)
router.get('/games/:gameId', gameController.getById)
router.post('/games', gameController.addNewGame)

<<<<<<< HEAD
=======
router.post('/register', authController.register)
router.post('/login', authController.login)


>>>>>>> master
module.exports = router