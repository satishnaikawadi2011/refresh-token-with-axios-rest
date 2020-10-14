const sequelize = require('./db/db');
const express = require('express');
const userRouter = require('./routes/user');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const User = require('./models/User');
const { verify } = require('jsonwebtoken');
const sendRefreshToken = require('./utils/sendRefreshToken');
const { createRefreshToken, createAccessToken } = require('./utils/auth');

const app = express();
app.use(
	cors({
		origin      : 'http://localhost:3000',
		credentials : true
	})
);
app.use(cookieParser());
app.use(express.json());
app.use('/api/user', userRouter);
app.get('/', (req, res) => {
	res.send('Connected To Server!!');
});

app.post('/refresh_token', async (req, res) => {
	const token = req.cookies.jid;
	// console.log(token);
	if (!token) {
		return res.send({ ok: false, accessToken: '' });
	}

	let payload = null;
	try {
		payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
	} catch (err) {
		console.log(err);
		return res.send({ ok: false, accessToken: '' });
	}

	// token is valid and
	// we can send back an access token
	const user = await User.findOne({ where: { id: payload.userId } });

	if (!user) {
		return res.send({ ok: false, accessToken: '' });
	}

	if (user.tokenVersion !== payload.tokenVersion) {
		return res.send({ ok: false, accessToken: '' });
	}

	sendRefreshToken(res, createRefreshToken(user));

	return res.send({ ok: true, accessToken: createAccessToken(user) });
});

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
	try {
		await sequelize.sync();
		console.log('Connected to database!!!');
	} catch (error) {
		console.log(error);
	}
};

app.listen(PORT, async () => {
	await connectDB();
	console.log(`Listening on port ${PORT}`);
});
