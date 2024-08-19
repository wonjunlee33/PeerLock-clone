import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
	Typography,
	Button,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Box,
	Divider,
} from '@mui/material';
import {
	ArrowBack as ArrowBackIcon,
	Share as ShareIcon,
	Favorite as FavoriteIcon,
	FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
	LocationOn as LocationOnIcon,
	ArrowForwardIos as ArrowForwardIosIcon,
	Star as StarIcon,
	SmokeFreeOutlined as SmokeFreeOutlinedIcon,
	VideocamOutlined as VideocamOutlinedIcon,
	FireExtinguisherOutlined as FireExtinguisherOutlinedIcon,
	CommentOutlined as CommentOutlinedIcon,
	CalendarMonthOutlined as CalendarMonthOutlinedIcon,
	AccessTimeOutlined as AccessTimeOutlinedIcon,
} from '@mui/icons-material';

const StorageDetail = ({ storage }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const [isHost, setIsHost] = useState(false);
	const [isFavorited, setIsFavorited] = useState(false);
	const favoriteClick = () => setIsFavorited(!isFavorited);
	const navigate = useNavigate(); // React Router v6의 useNavigate 훅을 사용

	const handleButtonClick = () => {
		// bug fix
		navigate(`/storage/reservation/upload/${storage.storageId}`, {
			state: { storageDetails: storage },
		});
	};

	const handleBoxClick = () => {
		const userStatus = localStorage.getItem('userStatus');
		userStatus === 'HOST' ? navigate('/mystorage') : navigate('/map'); // /host 경로로 이동
	};

	useEffect(() => {
		let isHost = localStorage.getItem('userStatus');
		let isMyStorage = localStorage.getItem('storageList');
		if (isHost == 'HOST') {
			setIsHost(true);
		}
	}, []);

	return (
		<Box style={{ maxHeight: '100vh', overflowY: 'auto', paddingBottom: '50px' }}>
			<Card sx={{ width: '100%' }}>
				<Slider {...settings}>
					{storage.images &&
						storage.images.map((img, idx) => (
							<Box position="relative" key={idx}>
								<CardMedia
									component="img"
									height="280"
									image={img.imagePath || 'https://via.placeholder.com/150'}
									alt={`Image ${idx}`}
									sx={{ objectFit: 'cover' }}
								/>
								<Box
									onClick={handleBoxClick} // Box 클릭 시 handleBoxClick 함수 호출
									sx={{
										position: 'absolute',
										top: 15,
										left: 15,
										backgroundColor: 'white',
										borderRadius: '50%',
										width: '40px',
										height: '40px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
									}}
								>
									<ArrowBackIcon color="Neutral" />
								</Box>
								{/* <Box
									sx={{
										position: 'absolute',
										top: 15,
										right: 15,
										display: 'flex',
										alignItems: 'center',
										gap: 1,
									}}
								>
									<Box
										sx={{
											backgroundColor: 'white',
											borderRadius: '50%',
											width: '40px',
											height: '40px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
										}}
										onClick={favoriteClick}
									>
										{isFavorited ? (
											<FavoriteIcon color="primary" />
										) : (
											<FavoriteBorderOutlinedIcon color="Neutral" />
										)}
									</Box>
									<Box
										sx={{
											backgroundColor: 'white',
											borderRadius: '50%',
											width: '40px',
											height: '40px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
										}}
									>
										<ShareIcon color="Neutral" />
									</Box>
								</Box> */}
							</Box>
						))}
				</Slider>

				<CardContent>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Typography
							variant="h6"
							sx={{ fontFamily: 'SpoqaHanSansNeo-Bold', fontWeight: 'bold' }}
						>
							{storage.storageName || 'Item Title'}
						</Typography>

						<Box display="flex" alignItems="center" gap={2}>
							<Box
								sx={{
									backgroundColor: 'white',
									borderRadius: '50%',
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '30px',
									height: '30px',
									// boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
								}}
								onClick={favoriteClick}
							>
								{isFavorited ? <FavoriteIcon color="primary" /> : <FavoriteIcon color="primary" />}
							</Box>

							<Box
								sx={{
									backgroundColor: 'white',
									borderRadius: '50%',
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '30px',
									height: '30px',
									// boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
								}}
							>
								<ShareIcon color="Neutral" />
							</Box>
						</Box>
					</Box>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<LocationOnIcon sx={{ color: 'blue' }} />
						<Typography
							variant="h6"
							sx={{
								fontFamily: 'SpoqaHanSansNeo-Regular',
								marginLeft: '0px',
								color: 'blue',
								fontSize: '14px',
							}} // 여기서 marginLeft 값을 조정하여 거리를 조절하세요.
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<b>창고 위치보기&nbsp;{storage.star || '1.2km'}</b>
								<ArrowForwardIosIcon sx={{ fontSize: '14px' }} />
							</div>
						</Typography>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<StarIcon sx={{ color: '#FFDC3C' }} />
						<Typography
							variant="h6"
							sx={{ fontFamily: 'SpoqaHanSansNeo-Regular', fontSize: '14px', marginLeft: '0px' }}
						>
							{storage.star || '4.54 (후기 15개)'}
						</Typography>
					</div>
					<Button
						variant="outlined"
						fullWidth
						sx={{
							marginTop: '8px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontFamily: 'SpoqaHanSansNeo-Bold',
							color: 'black',
							borderColor: 'gray',
							borderRadius: '10px',
						}}
					>
						<CommentOutlinedIcon sx={{ marginRight: '8px' }} />
						채팅 연결
					</Button>
				</CardContent>

				<Divider sx={{ margin: '0px 15px' }} />

				<CardContent sx={{ paddingLeft: '15', paddingBottom: '0', paddingTop: '0' }}>
					<Typography
						variant="h6"
						sx={{
							marginTop: '8px',
							paddingLeft: '10px',
							display: 'flex',
							gap: '1rem',
							fontFamily: 'SpoqaHanSansNeo-Regular',
						}}
					>
						<Box display="flex" flexDirection="column" alignItems="center">
							<SmokeFreeOutlinedIcon />
							<Typography variant="caption" sx={{ fontFamily: 'SpoqaHanSansNeo-Regular' }}>
								금연
							</Typography>
						</Box>
						<Box display="flex" flexDirection="column" alignItems="center">
							<FireExtinguisherOutlinedIcon />
							<Typography variant="caption" sx={{ fontFamily: 'SpoqaHanSansNeo-Regular' }}>
								소화기
							</Typography>
						</Box>
						<Box display="flex" flexDirection="column" alignItems="center">
							<VideocamOutlinedIcon />
							<Typography variant="caption" sx={{ fontFamily: 'SpoqaHanSansNeo-Regular' }}>
								카메라
							</Typography>
						</Box>
					</Typography>
				</CardContent>

				<Divider sx={{ margin: '0px 15px' }} />

				<CardContent>
					<Typography variant="h6" sx={{ fontFamily: 'SpoqaHanSansNeo-Regular' }}>
						{storage.user?.username}
					</Typography>
					<Typography
						variant="body2"
						sx={{
							fontFamily: 'SpoqaHanSansNeo-Regular',
							color: 'textSecondary',
							marginLeft: '10px',
						}}
					>
						{storage.userDescription || '사용자 설명이 없습니다.'}
					</Typography>
					<Typography
						variant="body1"
						color="textSecondary"
						sx={{ marginTop: '8px', fontFamily: 'SpoqaHanSansNeo-Regular', marginLeft: '10px' }}
					>
						{storage.storageDescription}
					</Typography>
				</CardContent>

				<Divider sx={{ margin: '0px 15px' }} />

				<CardContent>
					<Typography
						variant="h6"
						sx={{ fontFamily: 'SpoqaHanSansNeo-Bold', paddingBottom: '10px' }}
					>
						접근
					</Typography>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginLeft: '10px',
						}}
					>
						<CalendarMonthOutlinedIcon />
						<Typography
							variant="h6"
							sx={{ fontFamily: 'SpoqaHanSansNeo-Regular', fontSize: '16px', marginLeft: '0px' }}
						>
							&nbsp;{storage.star || '매주 | 5시 이후'}
						</Typography>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginLeft: '10px',
						}}
					>
						<AccessTimeOutlinedIcon />
						<Typography
							variant="h6"
							sx={{ fontFamily: 'SpoqaHanSansNeo-Regular', fontSize: '16px', marginLeft: '0px' }}
						>
							&nbsp;{storage.star || '방문 전 약속 필수'}
						</Typography>
					</div>
				</CardContent>

				<Divider sx={{ margin: '0px 15px' }} />

				<CardContent>
					<Typography
						variant="h6"
						sx={{ paddingBottom: '10px', fontFamily: 'SpoqaHanSansNeo-Bold' }}
					>
						가격
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginX: '10px',
						}}
					>
						<Typography variant="body1" sx={{ fontFamily: 'SpoqaHanSansNeo-Regular' }}>
							단기 보관
						</Typography>
						<Typography variant="body1" sx={{ fontFamily: 'SpoqaHanSansNeo-Regular' }}>
							₩10,000/월
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginX: '10px',
						}}
					>
						<Typography variant="body1" sx={{ fontFamily: 'SpoqaHanSansNeo-Regular' }}>
							장기 보관
						</Typography>
						<Typography variant="body1" sx={{ fontFamily: 'SpoqaHanSansNeo-Regular' }}>
							₩25,000/월
						</Typography>
					</Box>
				</CardContent>

				<CardActions
					sx={{
						position: 'fixed',
						bottom: 0,
						left: 0,
						right: 0,
						height: '60px',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '12px',
						backgroundColor: 'white',
					}}
					elevation={0}
				>
					{isHost ? (
						<Button
							variant="contained" // "outlined"를 "contained"로 변경하여 버튼에 배경색을 추가합니다.
							fullWidth
							component="label"
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'white', //
								fontFamily: 'SpoqaHanSansNeo-Regular',
								fontSize: '20px',
								boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
								borderRadius: '10px',
								backgroundColor: 'primary.light', // 배경색을 primary로 설정
								'&:hover': {
									backgroundColor: 'primary.dark', // hover 시에는 어두운 primary 색상으로 변경
								},
							}}
						>
							정보 수정하기
						</Button>
					) : (
						<>
							<Typography
								variant="h6"
								sx={{ fontSize: '18px', marginBottom: '0', fontFamily: 'SpoqaHanSansNeo-Regular' }}
							>
								<b style={{ textDecoration: 'line-through', color: 'gray' }}>₩15,000</b>&nbsp;
								₩10,000
								<b style={{ color: 'gray' }}>&nbsp;/월(단기)</b>
							</Typography>

							<Button
								size="medium"
								variant="contained"
								onClick={handleButtonClick} // 버튼 클릭 시 handleButtonClick 함수 호출
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: 'white', // 텍스트 색상을 하얀색으로 설정
									fontFamily: 'SpoqaHanSansNeo-Bold',
									fontSize: '16px',
									padding: '10px 20px',
									boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
									borderRadius: '10px',
									backgroundColor: 'primary.light', // 배경색을 primary로 설정
									'&:hover': {
										backgroundColor: 'primary.dark', // hover 시에는 어두운 primary 색상으로 변경
									},
								}}
							>
								신청하기
							</Button>
						</>
					)}
				</CardActions>
			</Card>
		</Box>
	);
};

export default StorageDetail;
