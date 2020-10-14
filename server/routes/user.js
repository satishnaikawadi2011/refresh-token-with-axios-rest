const express = require('express');
const login = require('../controller/user/login');
const register = require('../controller/user/register');
const User = require('../models/User');
const sendRefreshToken = require('../utils/sendRefreshToken');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/bye', (req, res) => {
	const payload = req.payload;
	res.send(`Your userId is ${payload.id}`);
});

router.get('/me', async (req, res) => {
	try {
		const payload = req.payload;
		const user = await User.findOne({ where: { id: payload.id } });
		res.json(user);
	} catch (error) {
		console.log(error);
	}
});

router.post('/logout', (req, res) => {
	sendRefreshToken(res, '');
	res.send('Logged out successfully!!!');
});

router.post('/revoke_refresh_token', async (req, res) => {
	try {
		const user = await User.findOne({ where: { id: req.payload.id } });
		user.tokenVersion = user.tokenVersion + 1;
		await user.save();
		res.send('Revoked refresh token !!!');
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
