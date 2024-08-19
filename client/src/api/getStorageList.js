import axios from 'axios';

export const getStorageList = async () => {
	const option = {
		method: 'GET',
		url: `/api/storage`,
	};

	const res = await axios(option);
	return res.data;
};
