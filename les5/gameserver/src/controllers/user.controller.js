const ApiError = require('../models/apierror.model')
const assert = require('assert')

function validateEmail(email) {
	const validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return validator.test(email);
}

module.exports = {

	validateUser(req, res, next) {
		try {
			assert(typeof (req.body.firstname) === 'string', 'firstname must be a string')
			assert(typeof (req.body.lastname) === 'string', 'lastname must be a string')
			assert(typeof (req.body.email) === 'string', 'email must be a string')
			assert(typeof (req.body.password) === 'string', 'password must be a string')
			assert(req.body.firstname.trim().length > 2, 'firstname must be at least 3 characters')
			assert(req.body.lastname.trim().length > 2, 'lastname must be at least 3 characters')
			assert(validateEmail(req.body.email.trim()), 'email must be a valid emailaddress')
			assert(req.body.password.trim().length > 2, 'password must be at least 3 characters')

			next()
		} catch (ex) {
			next(new ApiError(ex.toString(), 500))
		}
	}

}