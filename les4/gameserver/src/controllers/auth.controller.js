const ApiError = require('../models/apierror.model')
const pool = require('../config/db')
const config = require('../config/config')
const jwt = require('jsonwebtoken');


module.exports = {

	register(req, res, next) {
		console.log('AuthController.register called')

		const query = 'INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`) VALUES (?, ? ,?, ?)'

		pool.query(query, 
			[req.body.firstname, req.body.lastname, req.body.email, req.body.password], 
			function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if(err){
				console.log(err.sqlMessage)
				return next(new ApiError(err.sqlMessage, 500))
			}
			res.status(200).json({ result: rows }).end()
		})
	},

	login(req, res, next) {
		console.log('AuthController.register login')

		const email = req.body.email || ''
		const password = req.body.password || ''
		console.log(`email = ${email} password = ${password}`)

		pool.query("SELECT * FROM `users` WHERE `email` = ?", [req.body.email], (err, rows, fields) => {
			if (err) {
				console.log(err)
				return next(new ApiError(err, 500))
			}
			// debug
			console.log('user found!')
			console.dir(rows)
			if(rows.length === 1 && password === rows[0].password){
				console.log('password matches')

				jwt.sign({ id: rows[0].ID }, config.secretKey, (err, token) => {
					if (err) {
						console.log(err)
						return next(new ApiError('Error creating token!', 500))
					}
					console.log(token);
					res.status(200).json({ 
						result: {
							firstname: rows[0].firstname,
							lastname: rows[0].lastname,
							token: token
						} 
					}).end()
				});
			} else {
				return next(new ApiError('error ', 500))
			}
		})
	},

	validateJWT(req, res, next) {

		const token = req.header('x-access-token')
		if(!token){
			return next(new ApiError('Required token is missing', 401))
		}

		jwt.verify(token, config.secretKey, (err, payload) => {
			if(err){
				return next(new ApiError('Invalid token supplied.', 401))
			}
			console.log('Token successfully validated!')
			console.dir(payload)
			// save user and next
			req.user = {
				id: payload.id
			}
			next()
		})
	}

}