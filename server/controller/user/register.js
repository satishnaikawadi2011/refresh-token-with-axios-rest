const User = require('../../models/User');
const validateRegister = require('../../utils/validateRegister');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { createRefreshToken, createAccessToken } = require('../../utils/auth');
require('dotenv').config();

module.exports = async (req, res) => {
	const { email, password, username } = req.body;
	const { errors, valid } = validateRegister(req.body);
	if (!valid) {
		res.status(400).send({ errors });
	}
	try {
		const hashedPassword = await argon2.hash(password);
		const user = await User.create({ email, username, password: hashedPassword });
		createRefreshToken(user);
		res.json({ user, accessToken: createAccessToken(user) });
	} catch (error) {
		console.log(error);
	}
};
