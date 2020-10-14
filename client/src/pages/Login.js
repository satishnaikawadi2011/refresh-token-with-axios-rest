import React, { useState } from 'react';
import axios from '../utils/axios';
import { setAccessToken } from '../utils/setAccessToken';

export const Login = ({ history }) => {
	const [
		username,
		setUsername
	] = useState('');
	const [
		password,
		setPassword
	] = useState('');

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				console.log('form submitted');
				axios
					.post('/api/user/login', { username, password })
					.then((res) => {
						console.log(res);
						setAccessToken(res.data.accessToken);
					})
					.catch((err) => {
						console.log(err);
					});
				history.push('/');
			}}
		>
			<div>
				<input
					value={username}
					placeholder="username"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
			</div>
			<div>
				<input
					type="password"
					value={password}
					placeholder="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);
};
