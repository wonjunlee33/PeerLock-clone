import axios from 'axios';

export const getStorageDetail = async storageId => {
	const option = {
		method: 'GET',
		url: `/api/storage/${storageId}`,
	};
	const res = await axios(option);
	return res.data;
};
