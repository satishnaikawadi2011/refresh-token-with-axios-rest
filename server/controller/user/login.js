const User = require('../../models/User');
const validateLogin = require('../../utils/validateLogin');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const sendRefreshToken = require('../../utils/sendRefreshToken');
const { createRefreshToken, createAccessToken } = require('../../utils/auth');
require('dotenv').config();

module.exports = async (req, res) => {
	const { password, username } = req.body;
	const { errors, valid } = validateLogin(req.body);
	if (!valid) {
		res.status(400).send({ errors });
	}
	const user = await User.findOne({
		where : { username }
	});
	if (!user) {
		res.status(400).json({ errors: { username: 'No user found with this username!' } });
	}
	try {
		const passMatch = await argon2.verify(user.password, password);
		if (!passMatch) {
			res.status(422).json({ errors: { password: 'Invalid credentials!' } });
		}
		sendRefreshToken(res, createRefreshToken(user));
		res.json({ user: { ...user.dataValues, password: null }, accessToken: createAccessToken(user) });
	} catch (error) {
		console.log(error);
	}
};
