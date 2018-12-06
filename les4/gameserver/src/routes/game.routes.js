const router = require('express').Router()
const gameController = require('../controllers/game.controller')
const authController = require('../controllers/auth.controller')

router.get('/games', authController.validateJWT, gameController.getAll)
router.get('/games/:gameId', authController.validateJWT, gameController.getById)
router.post('/games', authController.validateJWT, gameController.addNewGame)

router.post('/register', authController.register)
router.post('/login', authController.login)


module.exports = router