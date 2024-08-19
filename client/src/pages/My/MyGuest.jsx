import React, { useEffect, useState } from 'react';
import {
	Typography,
	IconButton,
	Button,
	Avatar,
	Paper,
	Box,
	Card,
	CardContent,
	Grid,
	Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import FixedBottomNavigation from '../../components/FixBottomNavigation';
import { changeView } from '../../api/changeView';
import TopNavigationComponent from '../../components/common/TopNavigationComponent';

function MyGuest() {
	const navigate = useNavigate();
	// get user_id from api
	const user_id = localStorage.getItem('userId');
	let user_status = localStorage.getItem('userStatus');
	user_status = user_status === 'USER' ? 'guest' : user_status;
	console.log(user_status);
	const user_name = localStorage.getItem('userName');

	const HandleButtonClick = async () => {
		try {
			// const view = await SwitchView(user_id, user_status); // Replace with the actual user ID
			const fetch = async () => {
				const data = await changeView(user_id, user_status);
				console.log(data);
				// Check if the user is a host or a guest
				if (data && data.status === 'HOST') {
					navigate('/MyHost');
					localStorage.setItem('userStatus', 'HOST');
				} else {
					navigate('/MyGuest');
					localStorage.setItem('userStatus', 'USER');
				}
			};
			fetch();
		} catch (error) {
			alert('Error:', error);
		}
	};

	return (
		<div
			style={{
				maxHeight: '100vh',
				overflowX: 'hidden',
				overflowY: 'auto',
				backgroundColor: '#f5f5f5',
			}}
		>
			<TopNavigationComponent centerText="내 정보" rightMenu />
			{/* User Information */}
			<Box sx={{ paddingTop: '50px' }}>
				<Card elevation={0}>
					<CardContent>
						<Grid container alignItems="center" justifyContent="space-between" spacing={-1}>
							<Grid item container xs={9} alignItems="center" spacing={2}>
								{/* User Avatar */}
								<Grid item>
									<Avatar
										alt="User PFP"
										src="https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile3.png"
										sx={{
											marginTop: 1,
											width: 75,
											marginLeft: 1.5,
											height: 75,
										}}
									/>
								</Grid>
								{/* Text content */}
								<Grid item>
									<Typography
										variant="h5"
										style={{
											fontFamily: 'SpoqaHanSansNeo-Bold',
										}}
									>
										{user_name}
									</Typography>
									<Typography
										variant="body1"
										color="grey"
										style={{
											fontFamily: 'SpoqaHanSansNeo-Bold',
											marginLeft: 6,
										}}
									>
										Level 2
									</Typography>
								</Grid>
							</Grid>
							<Grid item xs={3}>
								<Button
									variant="outlined"
									size="small"
									sx={{ marginTop: 0, marginLeft: 0, whiteSpace: 'nowrap' }}
									style={{
										fontFamily: 'SpoqaHanSansNeo-Medium',
									}}
									onClick={HandleButtonClick} // replace with real user id (TODO)
								>
									호스트로 전환
								</Button>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				<Paper
					sx={{
						padding: 1.5,
						marginTop: 1,
						display: 'flex',
						alignItems: 'flex-start',
						flexDirection: 'column',
						position: 'left',
						boxShadow: 0,
					}}
				>
					{/* Text content */}
					<Typography
						variant="h6"
						style={{
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					>
						호스트 뷰
					</Typography>
				</Paper>

				<Paper
					sx={{
						paddingLeft: 1.5,
						paddingTop: 1,
						paddingBottom: 2,
						marginBottom: 0,
						display: 'flex',
						alignItems: 'center', // Center both horizontally and vertically
						flexDirection: 'row',
						position: 'left',
						boxShadow: 0,
					}}
				>
					{/* Emoji */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingRight: '20px',
						}}
					>
						<span style={{ fontSize: '24px' }}>✅</span>
					</div>
					{/* Text content */}
					<div>
						<Typography
							variant="h6"
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							호스트 되기
						</Typography>
					</div>
				</Paper>
				<Paper
					sx={{
						padding: 1.5,
						marginTop: 1,
						display: 'flex',
						alignItems: 'flex-start',
						flexDirection: 'column',
						position: 'left',
						boxShadow: 0,
					}}
				>
					{/* Text content */}
					<Typography
						variant="h6"
						style={{
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					>
						계정관리
					</Typography>
				</Paper>
				<Paper
					sx={{
						paddingLeft: 1.5,
						paddingTop: 1,
						paddingBottom: 3,
						marginBottom: 0,
						display: 'flex',
						alignItems: 'center', // Center both horizontally and vertically
						flexDirection: 'row',
						position: 'left',
						boxShadow: 0,
					}}
				>
					{/* Emoji */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingRight: '20px',
						}}
					>
						<span style={{ fontSize: '24px' }}>ℹ️</span>
					</div>
					{/* Text content */}
					<div>
						<Typography
							variant="h6"
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							계정정보
						</Typography>
					</div>
				</Paper>

				<Paper
					sx={{
						paddingLeft: 1.5,
						paddingTop: 1,
						paddingBottom: 3,
						marginBottom: 0,
						display: 'flex',
						alignItems: 'center', // Center both horizontally and vertically
						flexDirection: 'row',
						position: 'left',
						boxShadow: 0,
					}}
				>
					{/* Emoji */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingRight: '20px',
						}}
					>
						<span style={{ fontSize: '24px' }}>＄</span>
					</div>
					{/* Text content */}
					<div>
						<Typography
							variant="h6"
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							계좌정보
						</Typography>
					</div>
				</Paper>
				<Paper
					sx={{
						paddingLeft: 1.5,
						paddingTop: 1,
						paddingBottom: 3,
						marginBottom: 0,
						display: 'flex',
						alignItems: 'center', // Center both horizontally and vertically
						flexDirection: 'row',
						position: 'left',
						boxShadow: 0,
					}}
				>
					{/* Emoji */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingRight: '20px',
						}}
					>
						<span style={{ fontSize: '24px' }}>🔔</span>
					</div>
					{/* Text content */}
					<div>
						<Typography
							variant="h6"
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							알림설정
						</Typography>
					</div>
				</Paper>

				<Paper
					sx={{
						padding: 1.5,
						marginTop: 1,
						display: 'flex',
						alignItems: 'flex-start',
						flexDirection: 'column',
						position: 'left',
						boxShadow: 0,
					}}
				>
					{/* Text content */}
					<Typography
						variant="h6"
						style={{
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					>
						고객센터
					</Typography>
				</Paper>
				{/* from here onwards, help centre */}
				{/* login help */}
				<Paper
					sx={{
						padding: 1.5,
						marginBottom: 0,
						display: 'flex',
						alignItems: 'center', // Center both horizontally and vertically
						flexDirection: 'row',
						position: 'left',
						boxShadow: 0,
					}}
				>
					{/* Emoji */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingRight: '20px',
						}}
					>
						<span style={{ fontSize: '24px' }}>😀</span>
					</div>
					{/* Text content */}
					<div>
						<Typography
							variant="h6"
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							로그인 설정
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'darkgrey' }}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							평일 오전 9시 ~ 오후 6시 운영
						</Typography>
					</div>
				</Paper>
				{/* FAQ help */}
				<Paper
					sx={{
						paddingLeft: 1.5,
						paddingTop: 1,
						paddingBottom: 2,
						paddingRight: 3,
						marginBottom: 0,
						display: 'flex',
						alignItems: 'center', // Center both horizontally and vertically
						flexDirection: 'row',
						position: 'left',
						boxShadow: 0,
					}}
				>
					{/* Emoji */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingRight: '20px',
						}}
					>
						<span style={{ fontSize: '24px' }}>❓</span>
					</div>
					{/* Text content */}
					<div>
						<Typography
							variant="h6"
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							자주 묻는 질문
						</Typography>
					</div>
				</Paper>
				{/* contact help */}
				<Paper
					sx={{
						padding: 1.5,
						paddingTop: 1,
						marginBottom: 0,
						display: 'flex',
						alignItems: 'center', // Center both horizontally and vertically
						flexDirection: 'row',
						position: 'left',
						boxShadow: 0,
					}}
				>
					{/* Emoji */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingRight: '20px',
						}}
					>
						<span style={{ fontSize: '24px' }}>📞</span>
					</div>
					{/* Text content */}
					<div>
						<Typography
							variant="h6"
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							상담원 연결
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'darkgrey' }}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							평일 오전 9시 ~ 오후 6시 운영
						</Typography>
					</div>
				</Paper>

				{/* chatbot help */}
				<Paper
					sx={{
						padding: 1.5,
						paddingTop: 1,
						marginBottom: 6.5,
						display: 'flex',
						alignItems: 'center', // Center both horizontally and vertically
						flexDirection: 'row',
						position: 'left',
						boxShadow: 0,
					}}
				>
					{/* Emoji */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingRight: '20px',
						}}
					>
						<span style={{ fontSize: '24px' }}>💬</span>
					</div>
					{/* Text content */}
					<div>
						<Typography
							variant="h6"
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							챗봇 1:1 질문하기
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'darkgrey' }}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							24시간 운영
						</Typography>
					</div>
				</Paper>
			</Box>

			{/* Fixed Bottom Navigation */}
			<FixedBottomNavigation />
		</div>
	);
}

export default MyGuest;
