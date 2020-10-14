import axios from 'axios';

const instance = axios.create({
	baseURL         : 'http://localhost:5000/',
	withCredentials : true
});

const interceptor = instance.interceptors.response.use(
	(response) => {
		// console.log('====================================');
		// console.log(response);
		// console.log('====================================');
		return response;
	},
	(error) => {
		// Reject promise if usual error
		if (error.response.status !== 403) {
			return Promise.reject(error);
		}

		/* 
		 * When response code is 401, try to refresh the token.
		 * Eject the interceptor so it doesn't loop in case
		 * token refresh causes the 401 response
		 */
		// instance.interceptors.response.eject(interceptor);

		return instance
			.post('/refresh_token', {}, { withCredentials: true })
			.then((response) => {
				// saveToken();
				console.log('====================================');
				console.log('here');
				console.log('====================================');
				instance.defaults.headers['Authorization'] = 'Bearer ' + response.data.accessToken;
				error.response.config.headers['Authorization'] = 'Bearer ' + response.data.accessToken;
				return instance(error.response.config);
			})
			.catch((error) => {
				console.log('====================================');
				console.log('here 2');
				console.log('====================================');
				// destroyToken();
				// this.router.push('/login');
				return Promise.reject(error);
			});
		// async function(error) {
		// 	// console.log('====================================');
		// 	// console.log('In Interceptor');
		// 	// console.log('====================================');
		// 	const originalRequest = error.config;
		// 	console.log('error repose');
		// 	console.log(error.response.status);
		// 	if (error.response.status === 403 && !originalRequest._retry) {
		// 		console.log('====================================');
		// 		console.log('here');
		// 		console.log('====================================');
		// 		originalRequest._retry = true;
		// 		const res = await instance.post('/refresh_token', {}, { withCredentials: true });
		// 		const access_token = res.data.accessToken;
		// 		console.log(access_token);
		// 		instance.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
		// 		return instance(originalRequest);
		// 	}
		// 	return Promise.reject(error);
	}
);

// const refreshAccessToken = () => {
// 	let access_token;
// 	instance
// 		.post('/refresh_token', {}, { withCredentials: true })
// 		.then((res) => {
// 			const { accessToken } = res.data;
// 			// console.log('====================================');
// 			// console.log(accessToken);
// 			// console.log('====================================');
// 			// access_token = accessToken;
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// 	return access_token;
// };

export default instance;
