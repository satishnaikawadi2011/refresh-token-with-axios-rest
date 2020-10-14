require('dotenv').config();
const { verify } = require('jsonwebtoken');
// bearer 102930ajslkdaoq01

module.exports = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		throw new Error('not authenticated');
	}

	try {
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.payload = payload;
	} catch (err) {
		console.log(err);
		throw new Error('not authenticated');
	}

	return next();
};
