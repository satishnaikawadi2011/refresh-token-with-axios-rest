require('dotenv').config();
const { verify } = require('jsonwebtoken');
// bearer 102930ajslkdaoq01

module.exports = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		res.status(403).json({ error: 'Not authenticated!' });
	}

	try {
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.payload = payload;
		return next();
	} catch (err) {
		console.log(err);
		res.status(403).json({ error: 'Not authenticated!' });
	}
};
