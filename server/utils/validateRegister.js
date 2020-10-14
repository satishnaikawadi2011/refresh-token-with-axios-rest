module.exports = ({ email, password, username }) => {
	let errors = {};
	let valid = true;
	if (email.trim() === '') {
		errors.email = 'Email must not be empty !';
		valid = false;
	}
	else if (!email.includes('@')) {
		errors.email = 'Enter a valid email address !';
		valid = false;
	}

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
