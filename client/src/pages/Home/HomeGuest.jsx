import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Avatar, Paper } from '@mui/material';
import FixedBottomNavigation from '../../components/FixBottomNavigation';
import { Link } from 'react-router-dom';
import { getReservationDetails } from '../../api/getReservationDetails';
// dummy data

// this page will be the guest info page C-01

const Home = () => {
	const [activeButton, setActiveButton] = useState(0); // Default active button is 0

	return (
		<div style={{ maxHeight: '100vh', overflowX: 'hidden', overflowY: 'auto' }}>
			<div
				sx={{
					display: 'flex',
					alignItems: 'center', // Align items vertically
				}}
				style={{
					backgroundImage: 'linear-gradient(to bottom, #F5FAFF, #BDD7FE)',
					paddingBottom: '20px',
					paddingTop: '1px',
				}}
			>
				<Typography
					variant="h4"
					sx={{
						flexGrow: 1,
						marginTop: 7,
						marginLeft: 5,
						fontSize: 24,
					}}
					style={{
						fontFamily: 'SpoqaHanSansNeo-Bold',
					}}
				>
					Today
				</Typography>
				<Button
					sx={{
						border: '2px solid #4D88FF',
						borderRadius: 2.9,
						marginLeft: 30.5,
						marginTop: -6,
						color: 'black',
						fontSize: 18, // Increase font size
						background: 'white',
						padding: 0, // Adjust padding to make the button longer
						minWidth: '7rem', // Set minimum width to make the button longer
					}}
					style={{
						fontFamily: 'SpoqaHanSansNeo-Regular',
					}}
				>
					<Link to="#">
						<Typography
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							전체 알림
						</Typography>
					</Link>
				</Button>

				<div
					style={{
						backgroundColor: '#F2F7FF',
						display: 'flex',
						alignItems: 'center',
						borderRadius: 20,
						padding: '7px 0',
						margin: '10px 35px 12px',
					}}
				>
					<div style={{ flex: 1, paddingLeft: 30 }}>
						<Typography
							variant="body2"
							sx={{ paddingTop: 0.3 }}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Bold',
								color: '#005EB4',
							}}
						>
							<strong>상수동, 마포구 옷장</strong>
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'rgba(0, 0, 0, 0.6)', paddingTop: 0.3 }}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							09.17 ~ 11.16 (2M)
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'rgba(0, 0, 0, 0.6)', paddingTop: 0.3 }}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							캐리어 (소형)
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'red', paddingTop: 0.7 }}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							승인완료
						</Typography>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginRight: 30,
						}}
					>
						<Avatar
							alt="User PFP"
							src="https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile3.png" // Replace with real image path
							sx={{
								width: 75,
								height: 75,
								borderRadius: 5,
							}}
						/>
					</div>
				</div>

				<div
					style={{
						backgroundColor: '#F2F7FF',
						display: 'flex',
						alignItems: 'center',
						borderRadius: 20,
						padding: '7px 0',
						margin: '10px 35px 12px',
					}}
				>
					<div style={{ flex: 1, paddingLeft: 30 }}>
						<Typography
							variant="body2"
							sx={{ paddingTop: 0.3 }}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Bold',
								color: '#005EB4',
							}}
						>
							<strong>상수동, 마포구 옷장</strong>
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'rgba(0, 0, 0, 0.6)', paddingTop: 0.3 }}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							09.17 ~ 11.16 (2M)
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'rgba(0, 0, 0, 0.6)', paddingTop: 0.3 }}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							캐리어 (소형)
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'red', paddingTop: 0.7 }}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							승인완료
						</Typography>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginRight: 30,
						}}
					>
						<Avatar
							alt="User PFP"
							src="https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile1.png" // Replace with real image path
							sx={{
								width: 75,
								height: 75,
								borderRadius: 5,
							}}
						/>
					</div>
				</div>
			</div>
			<div style={{ marginLeft: 'auto', textAlign: 'center' }}>
				<Typography
					variant="h4"
					sx={{
						flexGrow: 1,
						marginTop: 4,
						marginLeft: -27,
						marginBottom: 2,
						fontSize: 24,
					}}
					style={{
						fontFamily: 'SpoqaHanSansNeo-Bold',
					}}
				>
					<strong>예약 관리</strong>
				</Typography>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '10px',
					}}
				>
					{[
						{ label: '신청', link: '#', id: 0 },
						{ label: '보관중', link: '#', id: 1 },
						{ label: '만료 예정', link: '#', id: 2 },
					].map(button => (
						<Button
							key={button.id}
							sx={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
								border: activeButton === button.id ? '2px solid #4D88FF' : '2px solid #BFBFBF',
								borderRadius: 5,
								color: 'black',
								fontSize: 18,
								padding: 0,
								minWidth: '6.2rem',
								background: 'white',
								'&:hover': {
									border: '2px solid #4D88FF',
								},
							}}
							onClick={() => setActiveButton(button.id)}
						>
							<Link to={button.link}>{button.label}</Link>
						</Button>
					))}
				</div>
			</div>
			{activeButton === 0 && (
				<Paper
					elevation={0}
					style={{
						backgroundColor: '#F2F7FF',
						alignItems: 'center',
						padding: 20,
						marginTop: 10,
						marginLeft: 35,
						marginRight: 35,
						marginBottom: 10,
						borderRadius: 20,
					}}
				>
					{/* Content for the 보관중 button, replace with real data */}
					<Typography
						variant="body1"
						color="#005EB4"
						sx={{
							marginBottom: 0,
						}}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						캐리어 (대형)
					</Typography>
					<Typography
						variant="body1"
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						Graham Roberts
					</Typography>
					<Typography
						variant="body1"
						fontSize={15}
						color="rgba(0, 0, 0, 0.6)"
						sx={{
							marginBottom: 5,
						}}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						09.17 ~ 11.16 (2M)
					</Typography>
					<Avatar
						alt="User PFP"
						src="https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile2.png"
						sx={{
							width: 100,
							marginTop: -14,
							marginBottom: 3.7,
							marginLeft: 22.5,
							height: 100,
							display: 'flex',
							borderRadius: 5,
						}}
					/>

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: 10,
							width: '100%',
						}}
					>
						<Button
							sx={{
								// border: '2px solid #ABABAB',
								borderRadius: 5,
								color: 'black',
								fontSize: 16,
								padding: '6px 12px',
								minWidth: '48%',
								background: 'white',
							}}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Bold',
							}}
						>
							채팅
						</Button>
						<Button
							sx={{
								// border: '2px solid #ABABAB',
								borderRadius: 5,
								color: 'black',
								fontSize: 16,
								padding: '6px 12px',
								minWidth: '48%',
								background: 'white',
							}}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Bold',
							}}
						>
							정보 보기
						</Button>
					</div>
				</Paper>
			)}

			{activeButton === 1 && (
				<Paper
					elevation={0}
					style={{
						backgroundColor: '#F2F7FF',
						alignItems: 'center',
						padding: 20,
						marginTop: 10,
						marginLeft: 35,
						marginRight: 35,
						marginBottom: 10,
						borderRadius: 20,
					}}
				>
					{/* Content for the 보관중 button, replace with real data */}
					<Typography
						variant="body1"
						color="#005EB4"
						sx={{
							marginBottom: 0,
						}}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						캐리어 (소형)
					</Typography>
					<Typography
						variant="body1"
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						배승우
					</Typography>
					<Typography
						variant="body1"
						fontSize={15}
						color="rgba(0, 0, 0, 0.6)"
						sx={{
							marginBottom: 0,
						}}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						09.17 ~ 11.16 (2M)
					</Typography>
					<Typography
						variant="body1"
						fontSize={15}
						color="red"
						sx={{
							marginBottom: 5,
						}}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						1달 후 만료
					</Typography>
					<Avatar
						alt="User PFP"
						src="https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile3.png" // Replace with real image path
						sx={{
							width: 100,
							marginTop: -17,
							marginBottom: 3.7,
							marginLeft: 22.5,
							height: 100,
							display: 'flex',
							borderRadius: 5,
						}}
					/>

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: 27,
							width: '100%',
						}}
					>
						<Button
							sx={{
								// border: '2px solid #ABABAB',
								borderRadius: 5,
								color: 'black',
								fontSize: 16,
								padding: '6px 12px',
								minWidth: '48%',
								background: 'white',
							}}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Bold',
							}}
						>
							채팅
						</Button>
						<Button
							sx={{
								// border: '2px solid #ABABAB',
								borderRadius: 5,
								color: 'black',
								fontSize: 16,
								padding: '6px 12px',
								minWidth: '48%',
								background: 'white',
							}}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Bold',
							}}
						>
							물품 사용 요청
						</Button>
					</div>
				</Paper>
			)}
			{activeButton === 2 && (
				<Paper
					elevation={0}
					style={{
						backgroundColor: '#F2F7FF',
						alignItems: 'center',
						padding: 20,
						marginTop: 10,
						marginLeft: 35,
						marginRight: 35,
						marginBottom: 10,
						borderRadius: 20,
					}}
				>
					{/* Content for the 보관중 button, replace with real data */}
					<Typography
						variant="body1"
						color="#005EB4"
						sx={{
							marginBottom: 0,
						}}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						캐리어 (소형)
					</Typography>
					<Typography
						variant="body1"
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						규빈
					</Typography>
					<Typography
						variant="body1"
						fontSize={15}
						color="rgba(0, 0, 0, 0.6)"
						sx={{
							marginBottom: 0,
						}}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						09.17 ~ 11.16 (2M)
					</Typography>
					<Typography
						variant="body1"
						fontSize={15}
						color="red"
						sx={{
							marginBottom: 5,
						}}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						3일 후 만료
					</Typography>
					<Avatar
						alt="User PFP"
						src="https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile1.png" // Replace with real image path
						sx={{
							width: 100,
							marginTop: -17,
							marginBottom: 3.7,
							marginLeft: 22.5,
							height: 100,
							display: 'flex',
							borderRadius: 5,
						}}
					/>

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: 27,
							width: '100%',
						}}
					>
						<Button
							sx={{
								// border: '2px solid #ABABAB',
								borderRadius: 5,
								color: 'black',
								fontSize: 16,
								padding: '6px 12px',
								minWidth: '48%',
								background: 'white',
							}}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Bold',
							}}
						>
							채팅
						</Button>
						<Button
							sx={{
								// border: '2px solid #ABABAB',
								borderRadius: 5,
								color: 'black',
								fontSize: 16,
								padding: '6px 12px',
								minWidth: '48%',
								background: 'white',
							}}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Bold',
							}}
						>
							연장 요청
						</Button>
					</div>
				</Paper>
			)}

			<FixedBottomNavigation />
		</div>
	);
};

export default Home;
