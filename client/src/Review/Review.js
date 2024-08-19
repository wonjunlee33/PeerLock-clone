import React, { useState } from 'react';
import { Typography, Paper, Button, Rating } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';

const Reviews = [
	{
		username: '승우',
		rating: 5,
		comment: '호스트님이 일정 조정해주셔서 편하게 이용할 수 있었어요. 감사합니다.',
		profileImage: 'https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile6.png',
	},
	{
		username: '유경',
		rating: 5,
		comment: '다음에도 또 이 서비스 이용할게요~!',
		profileImage: 'https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile1.png',
	},
	{
		username: '주은',
		rating: 4,
		comment: '호스트님께서 친절한 안내와 함께 저희의 요구에 신속하게 응답해주셔서 감사했어요.',
		profileImage: 'https://kr.object.ncloudstorage.com/peerlock-image-storage/storage/profile4.png',
	},
];

const ReviewPage = () => {
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
		<div style={{ textAlign: 'center', paddingTop: '20px' }}>
			<div
				style={{
					backgroundColor: '#f0f0f0',
					padding: '10px',
				}}
			>
				<Typography
					variant="h5"
					style={{ color: '#333', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
				>
					<span style={{ fontSize: '24px', marginRight: '8px' }}>{'<'}</span> 상수동, 마포구의 창고
				</Typography>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
				<div style={{ flex: 1 }}>
					<Typography
						variant="h2"
						style={{
							marginLeft: '80px',
							marginBottom: '10px',
							color: '#3F56DD',
							fontWeight: 'bold',
						}}
					>
						{averageRating.toFixed(1)}
					</Typography>
				</div>
				<div style={{ flex: 3, marginLeft: '60px' }}>
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
							<Typography variant="body2" style={{ width: '30px', marginRight: '5px' }}>
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
			<hr style={{ margin: '10px 0' }} />
			{/* 최근 리뷰 */}
			<Typography
				variant="h6"
				style={{ fontWeight: 'bold', marginLeft: '20px', textAlign: 'left' }}
			>
				최근 리뷰 15개
			</Typography>
			{/* 정렬 및 필터 버튼 */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					margin: '10px',
				}}
			>
				<Button
					variant="contained"
					color="primary"
					style={{
						borderRadius: '20px',
						backgroundColor: 'transparent',
						color: 'black',
						border: '2px solid #3F39E6',
						marginRight: '10px',
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
						border: '2px solid #3F39E6',
					}}
					onClick={() => setShowPhotoReviews(!showPhotoReviews)}
				>
					{showPhotoReviews ? '모든 리뷰 보기' : '사진 리뷰만 보기'}
				</Button>
			</div>
			<div style={{ padding: '20px' }}>
				{getPhotoReviews().map((review, index) => (
					<Paper key={index} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
						<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
							<Avatar
								src={review.profileImage}
								alt={review.username}
								style={{ marginRight: '10px', width: '40px', height: '40px' }}
							/>
							<Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.5em' }}>
								{review.username}
							</Typography>
							<Rating
								value={review.rating}
								max={5}
								precision={0.1}
								style={{ color: '#3F39E6', marginLeft: '10px', fontSize: '1.7em' }}
								readOnly
							/>
						</div>
						<Typography variant="body1" style={{ textAlign: 'left', paddingLeft: '50px' }}>
							{review.comment}
						</Typography>
					</Paper>
				))}
			</div>
		</div>
	);
};

export default ReviewPage;
