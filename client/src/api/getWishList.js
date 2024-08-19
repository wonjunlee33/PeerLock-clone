import axios from 'axios';

// todo: wish api 제작 후 변경
export const getWishList = async () => {
	const option = {
		method: 'GET',
		url: `/api/storage`,
	};

	const res = await axios(option);
	return res.data;
};
