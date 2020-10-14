import axios from './axios';

export const setAccessToken = (token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
