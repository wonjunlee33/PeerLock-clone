import axios from 'axios';

export const login = async (username, password) => {
	const option = {
		method: 'POST',
		url: `/api/user/login`,
		data: {
			email: username,
			password: password,
		},
	};

	const res = await axios(option);
	return res.data;
};
