import { rest } from 'msw';

// storage 리스트
export const getStorage = rest.get('http://localhost:5000/storage', async (req, res, ctx) => {
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
				storageDescription: '친절한 창고2',
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
});

// storage 상세
export const getStorageDetail = rest.get(
	'http://localhost:5000/storage/:storageId',
	async (req, res, ctx) => {
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
			]),
		);
	},
);
// storage 등록
export const storageResister = rest.post('http://localhost:5000/storage', async (req, res, ctx) => {
	return res(ctx.status(200), ctx.json({ result: 'success' }));
});

// storage 수정
export const storageUpdate = rest.put(
	'http://localhost:5000/storage/:storageId',
	async (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ result: 'success' }));
	},
);

// storage 삭제
export const storageDelete = rest.delete(
	'http://localhost:5000/storage/:storageId',
	async (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ result: 'success' }));
	},
);

// 찜한 스토리지
export const wishList = rest.get(
	'http://localhost:5000/wishlist/:userId',
	async (req, res, ctx) => {
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
					storageDescription: '친절한 창고',
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

// storage 좋아요/취소
export const StorageWish = rest.post(
	'http://localhost:5000/storage/wish/:storageId',
	async (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ result: 'success' }));
	},
);
