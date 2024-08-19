import axios from 'axios';

export const getReservationDetails = async () => {
	const option = {
		method: 'GET',
		url: `/api/reservation`,
	};
	const res = await axios(option);
	return res.data;
};
