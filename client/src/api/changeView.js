import axios from 'axios';

export const changeView = async (userId, userStatus) => {
	// console.log(userId, userStatus);
	const option = {
		method: 'PATCH',
		url: `/api/user/${userStatus}/${userId}`,
	};
	const res = await axios(option);
	return res.data;
};
