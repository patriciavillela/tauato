const jwt = require('jsonwebtoken')

const PRIVATE_KEY = "123456"

function tokenValidated(req, res, next) {
	const authorization = req.headers.authorization
	if (!authorization)
		res.status(401).send("Authorization Header is required")
	const [type, token] = req.headers.authorization.split(' ') || [' ', ' ']
	if (type !== "Bearer")
		res.status(401).send("Authorization must be Bearer Token")
	if (!token) {
		res.status(401).send("Token is required")
	}
	try {
		const payload = jwt.verify(token, PRIVATE_KEY);
		const validPayload = typeof payload !== "string" && payload.user
		if (!validPayload) {
			res.status(401).send("Invalid Token")
			return false
		}
		req.headers['user'] = payload.user
		return next()
	} catch(e) {
		res.status(401).send("Invalid Token")
	}
}

module.exports = {
	PRIVATE_KEY: PRIVATE_KEY,
	tokenValidated: tokenValidated
}
