import axios from 'axios';

export const registStorage = async body => {
	const option = {
		method: 'POST',
		url: `/api/storage`,
		data: body,
	};
	const res = await axios(option);
	return res;
};
