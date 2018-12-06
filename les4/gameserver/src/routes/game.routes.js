const router = require('express').Router()
const gameController = require('../controllers/game.controller')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

router.get('/games', authController.validateJWT, gameController.getAll)
router.get('/games/:gameId', authController.validateJWT, gameController.getById)
router.post('/games', authController.validateJWT, gameController.addNewGame)

router.post('/register', userController.validateUser, authController.register)
router.post('/login', authController.login)


module.exports = router