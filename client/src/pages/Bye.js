import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

export const Bye = ({}) => {
	const [
		loading,
		setLoading
	] = useState(true);
	const [
		message,
		setMessage
	] = useState('');
	const [
		error,
		setError
	] = useState('');
	useEffect(() => {
		axios
			.get('/api/user/bye')
			.then((res) => {
				console.log(res.data);
				setMessage(res.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []);
	if (loading) {
		return <div>loading...</div>;
	}

	if (error) {
		console.log(error);
		return <div>err</div>;
	}
	return <h1>{message}</h1>;
};
