import { rest } from 'msw';

// user
// 로그인
export const login = rest.post('http://localhost:5000/user/login', async (req, res, ctx) => {
	// 카카오에서 받은 인가코드 넘겨줌
	const { id_token } = req.params;
	console.log(id_token);
	if (typeof id_token === 'string') {
		return res(
			ctx.json({
				result: 'success',
				refreshToken: 'dfsa;difjsifjslkfjeifsjofj',
				accessToken: 'jkshfjkldASDJKHASFJKasd123asFJKAHSd',
				userInfo: {
					userId: 'id123',
					userName: '유저이름',
					userPassword: 'fefoqwekfoewfokqafefew',
					userSex: 1,
					userEmail: 'wlsgkq123@gmail.com',
					userBirth: 19960421,
					userPhoneNumber: '01022223333',
					status: 1,
				},
			}),
		);
	} else {
		return res(ctx.status(500), ctx.json({ result: 'needToJoin' }));
	}
});

//회원가입
export const signUp = rest.post('http://localhost:5000/auth/signup', async (req, res, ctx) =>
	res(
		ctx.json({
			refreshToken: 'dfsa;difjsifjslkfjeifsjofj',
			accessToken: 'jkshfjkldASDJKHASFJKasd123asFJKAHSd',
			userId: '1',
		}),
	),
);

//정보수정
export const updateInfo = rest.put(
	'http://localhost:5000/user/modify/info',
	async (req, res, ctx) =>
		res.json(
			ctx.json({
				result: 'success',
			}),
		),
);

// 유저 정보 받아오기
export const getUserInfo = rest.get('http://localhost:5000/user/:userId', async (req, res, ctx) => {
	return res(
		ctx.status(200),
		ctx.json({
			userInfo: {
				userId: 'id123',
				userName: '유저이름',
				userPassword: 'fefoqwekfoewfokqafefew',
				userSex: 1,
				userEmail: 'wlsgkq123@gmail.com',
				userBirth: 19960421,
				userPhoneNumber: '01022223333',
				status: 1,
			},
		}),
	);
});

// 특정 유저의 storage
export const getUserStorage = rest.get(
	'http://localhost:5000/storage/:userId',
	async (req, res, ctx) => {
		const { userId } = await req.json();
		return res(
			ctx.status(200),
			ctx.json([
				{
					storageId: '1',
					storageName: '창고이름1',
					storageAddress: '서울특별시 영등포구',
					storageLatitude: '137',
					storageLongitude: '23',
					storageTotalCapacity: '1',
					storageAvailableCapacity: '0',
					storageUsage: 1,
					storagePrice: 30000,
					storageWishes: 1,
					serviceCommission: 3000,
					storageDescription: '친절한 창고',
					availableFrom: '2022-07-21',
					availableUntil: '2022-07-21',
					returnPolicy: '환불 불가',
					created_at: '2022-07-21',
					updated_at: '2022-07-21',
					storageImgList: ['/img/asdasf', '/img/asdasf'],
				},
				{
					storageId: '2',
					storageName: '창고이름2',
					storageAddress: '서울특별시 종로구',
					storageLatitude: '137',
					storageLongitude: '23',
					storageTotalCapacity: '1',
					storageAvailableCapacity: '0',
					storageUsage: 1,
					storagePrice: 30000,
					storageWishes: 1,
					serviceCommission: 3000,
					storageDescription: '친절한 창고2',
					availableFrom: '2022-07-21',
					availableUntil: '2022-07-21',
					returnPolicy: '환불 불가',
					created_at: '2022-07-21',
					updated_at: '2022-07-21',
					storageImgList: ['/img/asdasf', '/img/asdasf'],
				},
			]),
		);
	},
);
