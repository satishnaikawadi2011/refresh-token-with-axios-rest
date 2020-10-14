module.exports = ({ password, username }) => {
	let errors = {};
	let valid = true;
	if (password.trim() === '') {
		errors.password = 'Password must not be empty !';
		valid = false;
	}

	if (username.trim() === '') {
		errors.username = 'Username must not be empty!';
		valid = false;
	}
	return {
		errors,
		valid
	};
};
