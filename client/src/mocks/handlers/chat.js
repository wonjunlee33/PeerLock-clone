import { rest } from 'msw';

//chat
// 채팅방리스트
export const a = rest.get('http://localhost:5000/chat/roomList', async (req, res, ctx) => {
	return res(
		ctx.json([
			{
				roomId: 'roomId1',
				partnerName: 'partnerName123',
				partnerId: 'partnerId123',
				partnerImgSrc: 'img/aasdaf/asd22',
				lastSendTime: '2020-12-31 14:23:07',
				lastMessage: '감사합니다g',
				unreadMsgCnt: 10,
			},
			{
				roomId: 'roomId2',
				partnerName: 'partnerName12asdasd3',
				partnerId: 'partnerId12asdasd3',
				partenrImgSrc: 'img/aasdaf/asd22',
				lastSendTime: '2020-12-31 14:23:07',
				lastMessage: 'ㅎㅇ',
				unreadMsgCnt: 5,
			},
		]),
	);
});
export const b = rest.get(
	'http://localhost:5000/chat/findRoom/:receiverId',
	async (req, res, ctx) => {
		return res(ctx.json({ roomId: 3 }));
	},
);
export const c = rest.get('http://localhost:5000/chat/log/:roomId', async (req, res, ctx) => {
	return res(
		ctx.json([
			{
				roomId: 'roomId2',
				senderName: 'partnerName12asdasd3',
				senderId: 'partnerId1',
				receiverName: 'userName123',
				receiverId: 'userID1',
				sendTime: '2020-12-31 14:23:07',
				message: 'ㅎㅇ',
				isRead: false,
			},
			{
				roomId: 'roomId2',
				senderName: 'partnerName12asdasd3',
				senderId: 'myId',
				receiverName: 'myName123',
				receiverId: 'myId',
				sendTime: '2020-12-31 14:23:07',
				message: 'ㅎㅇ',
				isRead: true,
			},
		]),
	);
});
