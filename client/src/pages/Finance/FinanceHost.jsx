import React, { useState } from 'react';
import FixedBottomNavigationHost from '../../components/FixBottomNavigationHost';
import { Typography, Paper, Avatar, Button, Rating } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Chart from 'chart.js/auto'; // do not erase!! 지우지 말아주세요!! 지우면 안됩니다!!
import { Bar } from 'react-chartjs-2';
import TopNavigationComponent from '../../components/common/TopNavigationComponent';

const boldFontStyle = {
	fontFamily: 'SpoqaHanSansNeo-Bold',
};

const FinanceHost = () => {
	const [selectedTab, setSelectedTab] = useState(0);

	const date = new Date();
	const currentDay = String(date.getDate()).padStart(2, '0');
	const currentMonth = String(date.getMonth() + 1).padStart(2, '0');
	const currentYear = date.getFullYear();
	const currentDate = `${currentDay}.${currentMonth}.${currentYear}`;

	const handleTabClick = index => {
		setSelectedTab(index);
	};

	let totalEarnings = 0;
	let data = [20, 30, 40, 100, 80, 75, 50, 35];

	for (let i = 0; i < data.length; i++) {
		totalEarnings += data[i];
	}

	const options = {
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				beginAtZero: true,
			},
		},
		plugins: {
			legend: {
				display: true,
			},
		},
		indexAxis: 'x', // Use 'y' if you want horizontal bars
		responsive: true,
		maintainAspectRatio: false,
		// Adjust the bar thickness using the barThickness property
		elements: {
			bar: {
				barThickness: 5, // Adjust this value to make the bars thinner or thicker
			},
		},
	};

	const chartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Replace with your labels
		datasets: [
			{
				label: '월별 수익 (단위: 천원/월)',
				data: data, // Replace with your actual data
				fill: false,
				backgroundColor: '#4D88FF',
				borderColor: 'rgba(75,192,192,1)',
			},
		],
	};

	const Reviews = [
		{
			username: '승우',
			rating: 5,
			comment: '호스트님이 일정 조정해주셔서 편하게 이용할 수 있었어요. 감사합니다.',
			profileImage:
				'https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile6.png',
		},
		{
			username: '유경',
			rating: 5,
			comment: '다음에도 또 이 서비스 이용할게요~!',
			profileImage:
				'https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile1.png',
		},
		{
			username: '주은',
			rating: 4,
			comment: '호스트님께서 친절한 안내와 함께 저희의 요구에 신속하게 응답해주셔서 감사했어요.',
			profileImage:
				'https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile4.png',
		},
	];

	const [sortByLatest, setSortByLatest] = useState(true);
	const [showPhotoReviews, setShowPhotoReviews] = useState(false);

	const averageRating = Reviews.reduce((sum, review) => sum + review.rating, 0) / Reviews.length;

	const ratingDistribution = Array(5)
		.fill(0)
		.map((_, index) => {
			const count = Reviews.filter(review => review.rating === 5 - index).length;
			return (count / Reviews.length) * 100;
		});

	const getPhotoReviews = () => {
		return showPhotoReviews ? Reviews.filter(review => review.comment.includes('사진')) : Reviews;
	};

	const progressColor = `rgb(${Math.floor(averageRating * 51)}, ${Math.floor(
		255 - averageRating * 51,
	)}, 0)`;

	return (
		<div
			style={{ maxHeight: '100vh', overflowX: 'hidden', overflowY: 'auto' }}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center', // Center content horizontally
			}}
		>
			<TopNavigationComponent centerText="통계" />
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					paddingTop: 10,
					borderBottom: '1px solid lightgrey',
					width: '85%',
					margin: '0 25px',
					paddingTop: '60px',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						width: '100%',
						marginTop: 15,
						position: 'relative',
					}}
				>
					<div
						style={{
							position: 'absolute',
							bottom: 0,
							left: selectedTab === 0 ? 0 : '50%',
							width: selectedTab === 0 ? '50%' : '50%',
							height: '3px',
							backgroundColor: '#D5E7FE',
							transition: 'left 0.3s',
						}}
					/>
					<div
						onClick={() => handleTabClick(0)}
						style={{
							cursor: 'pointer',
							color: selectedTab === 0 ? 'black' : 'grey',
							fontSize: 20,
							marginLeft: 60,
							marginBottom: 10,
							marginRight: 40,
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					>
						수익
					</div>
					<div
						onClick={() => handleTabClick(1)}
						style={{
							cursor: 'pointer',
							color: selectedTab === 1 ? 'black' : 'grey',
							marginLeft: 90,
							marginBottom: 10,
							fontSize: 20,
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					>
						리뷰
					</div>
				</div>
			</div>
			{selectedTab === 0 && (
				<div style={{ marginTop: '20px', width: '100%' }}>
					<Paper
						elevation={0}
						sx={{
							padding: 1.5,
							bgcolor: '#F2F7FF',
							// border: '1px solid lightgrey',
							borderRadius: 4,
							width: '93%',
							display: 'flex',
							flexDirection: 'column',
							position: 'relative',
							// boxShadow: 5,
							marginBottom: '20px',
							marginTop: '30px',
							marginLeft: '13.5px',
						}}
					>
						<Typography
							variant="h4"
							style={{
								fontSize: 24,

								color: '#005EB4',
								fontFamily: 'SpoqaHanSansNeo-Bold',
							}}
							sx={{ margin: 0.5 }}
						>
							<strong>₩{totalEarnings},000</strong>
						</Typography>
						<Typography
							variant="body1"
							style={{ fontSize: 16, fontFamily: 'SpoqaHanSansNeo-Medium' }}
							sx={{ marginLeft: 0.5 }}
						>
							2023년 총 수익 ({currentDate} 기준)
						</Typography>
						<div
							style={{
								width: '100%',
								height: 200,
								marginTop: 20,
							}}
						>
							<Bar data={chartData} options={options} />
						</div>
					</Paper>
					<Paper sx={{ boxShadow: 0 }}>
						<Typography
							variant="h4"
							style={{ fontSize: 24 }}
							sx={{
								marginTop: 4,
								marginLeft: 3,
								marginBottom: 1.5,
								fontFamily: 'SpoqaHanSansNeo-Bold',
							}}
						>
							History
						</Typography>
					</Paper>
					<Paper
						sx={{
							marginBottom: 0,
							borderRadius: '0px',
							width: '85%',
							display: 'flex',
							alignItems: 'center', // Center both horizontally and vertically
							flexDirection: 'row',
							position: 'left',
							boxShadow: 0,
							padding: 1.5,
							borderTop: '1px solid lightgrey',
							margin: '0 25px',
						}}
					>
						{/* Text content */}
						<span
							style={{
								display: 'flex',
								alignItems: 'center', // Center horizontally
								justifyContent: 'space-between',
								width: '100%', // Take up the entire width
							}}
						>
							{/* Avatar */}
							<Avatar
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginLeft: -6,
								}}
							/>
							<div style={{ marginLeft: 21 }}>
								<Typography
									variant="h6"
									fontSize={15}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									배승우님
								</Typography>
								<Typography
									variant="body2"
									sx={{ color: 'grey' }}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									23.08.15
								</Typography>
							</div>
							<div style={{ marginLeft: 21 }}>
								<Typography
									variant="h6"
									fontSize={13}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium', color: 'blue' }}
								>
									사이즈 (소형)
								</Typography>
								<Typography
									variant="body2"
									fontSize={13}
									align="right"
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									의류
								</Typography>
							</div>
							<div style={{ marginLeft: 21 }}>
								<Typography
									variant="h6"
									fontSize={15}
									minWidth={70}
									sx={{ color: 'red', textAlign: 'right' }}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									36,000원
								</Typography>
							</div>
						</span>
					</Paper>

					<Paper
						sx={{
							marginBottom: 0,
							borderRadius: '0px',
							width: '85%',
							display: 'flex',
							alignItems: 'center', // Center both horizontally and vertically
							flexDirection: 'row',
							position: 'left',
							boxShadow: 0,
							padding: 1.5,
							borderTop: '1px solid lightgrey',
							margin: '0 25px',
						}}
					>
						{/* Text content */}
						<span
							style={{
								display: 'flex',
								alignItems: 'center', // Center horizontally
								justifyContent: 'space-between',
								width: '100%', // Take up the entire width
							}}
						>
							{/* Avatar */}
							<Avatar
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginLeft: -6,
								}}
							/>
							<div style={{ marginLeft: 21 }}>
								<Typography
									variant="h6"
									fontSize={15}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									양종옥님
								</Typography>
								<Typography
									variant="body2"
									sx={{ color: 'grey' }}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									23.08.15
								</Typography>
							</div>
							<div style={{ marginLeft: 21 }}>
								<Typography
									variant="h6"
									fontSize={13}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium', color: 'blue' }}
								>
									사이즈 (대형)
								</Typography>
								<Typography
									variant="body2"
									fontSize={13}
									align="right"
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									이삿짐
								</Typography>
							</div>
							<div style={{ marginLeft: 21 }}>
								<Typography
									variant="h6"
									fontSize={15}
									minWidth={70}
									sx={{ color: 'red', textAlign: 'right', fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									310,000원
								</Typography>
							</div>
						</span>
					</Paper>
					<Paper
						sx={{
							marginBottom: 0,
							borderRadius: '0px',
							width: '85%',
							display: 'flex',
							alignItems: 'center', // Center both horizontally and vertically
							flexDirection: 'row',
							position: 'left',
							boxShadow: 0,
							padding: 1.5,
							borderTop: '1px solid lightgrey',
							margin: '0 25px',
						}}
					>
						{/* Text content */}
						<span
							style={{
								display: 'flex',
								alignItems: 'center', // Center horizontally
								justifyContent: 'space-between',
								width: '100%', // Take up the entire width
							}}
						>
							{/* Avatar */}
							<Avatar
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginLeft: -6,
								}}
							/>
							<div style={{ marginLeft: 21 }}>
								<Typography
									variant="h6"
									fontSize={15}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									Yoon님
								</Typography>
								<Typography
									variant="body2"
									sx={{ color: 'grey' }}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									23.08.15
								</Typography>
							</div>
							<div style={{ marginLeft: 21 }}>
								<Typography
									variant="h6"
									fontSize={13}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium', color: 'blue' }}
								>
									사이즈 (소형)
								</Typography>
								<Typography
									variant="body2"
									fontSize={13}
									align="right"
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									캐리어
								</Typography>
							</div>
							<div style={{ marginLeft: 21 }}>
								<Typography
									variant="h6"
									fontSize={15}
									minWidth={70}
									sx={{ color: 'red', textAlign: 'right', fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									2,000원
								</Typography>
							</div>
						</span>
					</Paper>
				</div>
			)}

			{/* Your content here */}
			{selectedTab === 1 && (
				<div style={{ textAlign: 'center', paddingTop: '20px' }}>
					<div
						style={{
							padding: '10px',
						}}
					/>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: 10,
						}}
					>
						<div style={{ flex: 1 }}>
							<Typography
								variant="h2"
								style={{
									marginLeft: '45px',
									marginTop: '-10px',
									marginBottom: '20px',
									color: '#5A95F1',
									fontWeight: 'bold',
								}}
							>
								{averageRating.toFixed(1)}
							</Typography>
						</div>
						<div
							style={{
								flex: 3,
								marginLeft: '60px',
								marginTop: -20,
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							{ratingDistribution.map((percentage, index) => (
								<div
									key={index}
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										marginBottom: '0.5px',
									}}
								>
									<Typography
										variant="body2"
										style={{
											width: '30px',
											marginRight: '5px',
											fontFamily: 'SpoqaHanSansNeo-Medium',
										}}
									>
										{5 - index}점
									</Typography>
									<LinearProgress
										variant="determinate"
										value={percentage}
										style={{
											width: '100%',
											height: '8px',
											backgroundColor: 'transparent',
										}}
										color="primary"
										sx={{ color: progressColor }}
									/>
								</div>
							))}
						</div>
					</div>
					<hr style={{ margin: '10px 25px', width: '85%' }} />
					{/* 최근 리뷰 */}
					<Typography
						variant="h6"
						style={{
							marginLeft: '20px',
							textAlign: 'left',
							marginTop: '20px',
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					>
						최근 리뷰 {Reviews.length}개
					</Typography>
					{/* 정렬 및 필터 버튼 */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}
					>
						<Button
							variant="contained"
							color="primary"
							style={{
								borderRadius: '20px',
								backgroundColor: 'transparent',
								color: 'black',
								// border: '2px solid darkgrey',
								marginTop: '10px',
								marginLeft: '-140px',
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
							onClick={() => setSortByLatest(!sortByLatest)}
						>
							{sortByLatest ? '인기순' : '최신순'}
						</Button>
						<Button
							variant="contained"
							color="secondary"
							style={{
								borderRadius: '20px',
								backgroundColor: 'transparent',
								color: 'black',
								// border: '2px solid darkgrey',
								marginTop: '10px',
								marginLeft: '-310px',
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
							onClick={() => setShowPhotoReviews(!showPhotoReviews)}
						>
							{showPhotoReviews ? '모든 리뷰 보기' : '사진 리뷰만 보기'}
						</Button>
					</div>
					<div style={{ padding: '25px', marginBottom: 24, fontFamily: 'SpoqaHanSansNeo-Medium' }}>
						{getPhotoReviews().map((review, index) => (
							<Paper
								key={index}
								elevation={0}
								style={{
									padding: '20px',
									marginBottom: '20px',
									borderRadius: 14,
									backgroundColor: '#F2F7FF',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										marginBottom: '10px',
										fontFamily: 'SpoqaHanSansNeo-Medium',
									}}
								>
									<Avatar
										src={review.profileImage}
										alt={review.username}
										style={{ marginRight: '10px', width: '40px', height: '40px' }}
									/>
									<Typography
										variant="h6"
										style={{
											fontWeight: 'bold',
											fontSize: '1.5em',
											fontFamily: 'SpoqaHanSansNeo-Medium',
										}}
									>
										{review.username}
									</Typography>
									<Rating
										value={review.rating}
										max={5}
										precision={0.1}
										style={{
											color: '#5A95F1',
											marginLeft: '10px',
											fontSize: '1.7em',
											fontFamily: 'SpoqaHanSansNeo-Medium',
										}}
										readOnly
									/>
								</div>
								<Typography
									variant="body1"
									style={{
										textAlign: 'left',
										paddingLeft: '50px',
										fontFamily: 'SpoqaHanSansNeo-Medium',
									}}
								>
									{review.comment}
								</Typography>
							</Paper>
						))}
					</div>
				</div>
			)}
			<FixedBottomNavigationHost />
		</div>
	);
};

export default FinanceHost;
