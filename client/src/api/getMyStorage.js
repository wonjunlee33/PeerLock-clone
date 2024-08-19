import axios from 'axios';

export const getMyStorage = async userId => {
	const option = {
		method: 'GET',
		url: `/api/user/${userId}`,
	};
	const res = await axios(option);
	return res.data;
};
