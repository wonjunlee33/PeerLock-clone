import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Avatar, Paper } from '@mui/material';
import FixedBottomNavigationHost from '../../components/FixBottomNavigationHost';
import { Link } from 'react-router-dom';

// this page will be the host info page C-01

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
						fontSize: 28,
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
						marginTop: -7,
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
					<Link to="#">전체 알림</Link>
				</Button>

				<div
					style={{
						backgroundColor: '#F2F7FF',
						alignItems: 'center',
						padding: 10,
						marginLeft: 35,
						marginTop: 10,
						marginRight: 35,
						marginBottom: 10,
						borderRadius: 20,
					}}
				>
					{/* replace everything here with info from API */}
					<Typography
						variant="body1"
						sx={{ paddingLeft: 4, paddingTop: 0.3, color: 'blue' }}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						<strong>배승우님의 요청</strong>
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: 'black', paddingLeft: 4, paddingTop: 0.3, color: 'black' }}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						09.17 ~ 11.16 (2M)
					</Typography>
					<Typography
						variant="body2"
						sx={{
							color: 'black',
							paddingLeft: 4,
							paddingTop: 0.3,
							color: 'black',
							marginBottom: 0,
						}}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						캐리어 (소형)
					</Typography>
					<Avatar
						alt="User PFP"
						src="https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile6.png"
						sx={{
							width: 75,
							marginTop: -8.6,
							marginLeft: 25,
							height: 75,
							display: 'flex',
							borderRadius: 5,
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					/>
				</div>
				<div
					style={{
						backgroundColor: '#F2F7FF',
						alignItems: 'center',
						padding: 10,
						marginLeft: 35,
						marginTop: 10,
						marginRight: 35,
						marginBottom: 10,
						borderRadius: 20,
					}}
				>
					{/* replace everything here with info from API */}
					<Typography
						variant="body1"
						sx={{ paddingLeft: 4, paddingTop: 0.3, color: 'blue' }}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						<strong>규빈님의 요청</strong>
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: 'black', paddingLeft: 4, paddingTop: 0.3, color: 'black' }}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						09.17 ~ 10.16 (1M)
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: 'blue', paddingLeft: 4, paddingTop: 0.3, color: 'black' }}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						캐리어 (중형)
					</Typography>
					<Avatar
						alt="User PFP"
						src="https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile1.png" // Replace with real image path
						sx={{
							width: 75,
							marginTop: -8.6,
							marginLeft: 25,
							height: 75,
							display: 'flex',
							borderRadius: 5,
						}}
					/>
				</div>
			</div>
			<div style={{ marginLeft: 'auto', textAlign: 'center' }}>
				<Typography
					variant="h4"
					sx={{
						flexGrow: 1,
						marginTop: 4,
						marginLeft: -25,
						marginBottom: 2,
						fontSize: 27,
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
						{ label: '요청', link: '#', id: 0 },
						{ label: '보관중', link: '#', id: 1 },
						{ label: '만료 예정', link: '#', id: 2 },
					].map(button => (
						<Button
							key={button.id}
							sx={{
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
						color="blue"
						sx={{
							marginBottom: 1,
							color: 'blue',
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
						color="black"
						sx={{
							marginBottom: 5,
							color: 'black',
						}}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
					>
						09.17 ~ 11.16 (2M)
					</Typography>
					<Avatar
						alt="User PFP"
						src="https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile3.png" // Replace with real image path
						sx={{
							width: 87,
							marginTop: -15.6,
							marginLeft: 23,
							height: 87,
							display: 'flex',
							borderRadius: 5,
							fontFamily: 'SpoqaHanSansNeo-Medium',
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
								fontSize: 20,
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
								fontSize: 20,
								padding: '6px 12px',
								minWidth: '48%',
								background: 'white',
							}}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Bold',
							}}
						>
							수락
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
						color="blue"
						sx={{
							marginBottom: 1,
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
						김수연
					</Typography>
					<Typography
						variant="body1"
						fontSize={15}
						color="black"
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
						src="https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile1.png" // Replace with real image path
						sx={{
							width: 87,
							marginTop: -15.6,
							marginLeft: 23,
							height: 87,
							display: 'flex',
							borderRadius: 5,
							fontFamily: 'SpoqaHanSansNeo-Medium',
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
								fontSize: 20,
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
								fontSize: 20,
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
						color="blue"
						sx={{
							marginBottom: 1,
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
						fontSize={14}
						color="black"
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
						src="https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile4.png" // Replace with real image path
						sx={{
							width: 87,
							marginTop: -15.6,
							marginLeft: 23,
							height: 87,
							display: 'flex',
							borderRadius: 5,
							fontFamily: 'SpoqaHanSansNeo-Medium',
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
								fontSize: 20,
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
								fontSize: 20,
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

			<FixedBottomNavigationHost />
		</div>
	);
};

export default Home;
