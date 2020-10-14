import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Bye } from './pages/Bye';
import axios from './utils/axios';
import { setAccessToken } from './utils/setAccessToken';

function App() {
	const [
		loading,
		setLoading
	] = useState(true);
	const [
		error,
		setError
	] = useState('');

	useEffect(() => {
		axios
			.post('/refresh_token', {}, { withCredentials: true })
			.then((res) => {
				console.log(res.data);
				const { accessToken } = res.data;
				setAccessToken(accessToken);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <div>loading...</div>;
	}
	if (error) {
		console.log(error);
		return <h1>err</h1>;
	}
	return (
		<BrowserRouter>
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/bye">Bye</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
				</ul>
			</div>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/bye" component={Bye} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
