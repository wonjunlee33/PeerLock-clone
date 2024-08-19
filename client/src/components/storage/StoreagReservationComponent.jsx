import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
	Typography,
	Button,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Box,
	Divider,
	TextField,
	Grid,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Star as StarIcon } from '@mui/icons-material';

const StorageReservationComponent = ({ storage }) => {
	const location = useLocation();
	const reservationData = location.state?.reservationData;
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // 현재 날짜로 초기화
	const [selectedPayment, setSelectedPayment] = useState(null);
	const [uploadedImages, setUploadedImages] = useState(reservationData?.images || []);
	const navigate = useNavigate();

	// console.log(reservationData); // 전달된 예약 정보 출력

	const handleImageChange = e => {
		const files = Array.from(e.target.files);
		const fileURLs = files.map(file => URL.createObjectURL(file));
		setUploadedImages(prevState => [...prevState, ...fileURLs]);
	};

	const generateReservationJSON = () => {
		const jsonData = {
			reservationData: reservationData,
			paymentMethod: selectedPayment,
		};
		// console.log(jsonData);
		return jsonData; // JSON 데이터 반환
	};

	const handleButtonClick = () => {
		// const reservationData = generateReservationJSON();
		// axios
		// 	.post(`/api/reservation?${reservationData.storageId}`, reservationData)
		// 	.then(response => {
		// 		// 서버 응답 처리
		// 		console.log('서버 응답:', response.data);
		// 		// 여기에 필요한 추가 작업을 수행할 수 있습니다.
		// 	})
		// 	.catch(error => {
		// 		// 에러 처리
		// 		console.error('에러 발생:', error);
		// 	});
		navigate(`/homeguest`);
	};

	return (
		<Box style={{ maxHeight: '100vh', overflowY: 'auto', paddingBottom: '60px' }}>
			<Box display="flex" alignItems="center" p={1}>
				<Button
					startIcon={<ArrowBackIcon />}
					onClick={() => {
						window.history.back();
					}}
				>
					뒤로가기
				</Button>
			</Box>
			<Divider sx={{ margin: '0px 0px', borderTop: '3px solid lightgray' }} />
			<Card sx={{ width: '100%' }}>
				<Box display="flex">
					<Box width="40%" display="flex" alignItems="stretch" padding="15px" paddingRight="0px">
						{storage && storage.images && storage.images[0] && (
							<CardMedia
								component="img"
								height="100%"
								image={storage.images[0].imagePath || 'https://via.placeholder.com/150'}
								alt="Placeholder Image"
								sx={{
									boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
									borderRadius: '10%',
									objectFit: 'cover',
								}}
							/>
						)}
					</Box>

					<Box width="60%">
						<CardContent>
							<Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 'bold' }}>
								{storage.storageName || 'Item Title'}
							</Typography>
							<Typography variant="body2" sx={{ marginTop: '8px' }}>
								{storage.storageDescription || '설명 쏼랄쏼라라라'}
							</Typography>
							<Typography variant="body2" sx={{ marginTop: '8px' }}>
								{storage.storageLocation || '위치'}
							</Typography>
							<Box display="flex" alignItems="center" mt={0}>
								<StarIcon sx={{ color: '#FFDC3C' }} />
								<Typography variant="h6" sx={{ fontSize: '14px', marginTop: '8px' }}>
									{storage.star || '4.54(15)'}
								</Typography>
							</Box>
						</CardContent>
					</Box>
				</Box>

				<Divider sx={{ margin: '0px 0px', borderTop: '3px solid lightgray' }} />

				<CardContent>
					{/* 예약 날짜 선택 */}
					<Box mt={2}>
						<Typography variant="h5" sx={{ paddingBottom: '10px', fontWeight: 'bold' }}>
							{'예약 정보'}
						</Typography>
						<Typography variant="h6" gutterBottom mb={2}>
							예약 날짜
						</Typography>
						<Grid container spacing={2}>
							{/* 시작일 */}
							<Grid item xs={6}>
								<TextField
									label="시작일"
									variant="outlined"
									type="date"
									fullWidth
									value={reservationData?.startDate || selectedDate}
									onChange={e => setSelectedDate(e.target.value)}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Grid>

							{/* 종료일 */}
							<Grid item xs={6}>
								<TextField
									label="종료일"
									variant="outlined"
									type="date"
									fullWidth
									value={reservationData?.endDate || selectedDate}
									onChange={e => setSelectedDate(e.target.value)}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Grid>
						</Grid>
					</Box>
					{/* 보관 물품 사진 */}
					<Box mt={2} mb={2}>
						<Typography variant="h6" gutterBottom>
							물품 사진
						</Typography>
						<Box mt={2} display="flex" flexDirection="row" gap={2} overflowx="auto">
							{uploadedImages?.length === 0
								? reservationData?.images.map((image, index) => (
										<img
											key={index}
											src={image}
											alt={`uploaded-img-${index}`}
											style={{
												width: '80px',
												height: '80px',
												objectFit: 'cover',
												boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
											}}
										/>
								  ))
								: uploadedImages.map((image, index) => (
										<img
											key={index}
											src={image}
											alt={`uploaded-img-${index}`}
											style={{
												width: '80px',
												height: '80px',
												objectFit: 'cover',
												boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
											}}
										/>
								  ))}
						</Box>
					</Box>
				</CardContent>

				<Divider sx={{ margin: '0px 0px', borderTop: '3px solid lightgray' }} />

				{/* 요금 세부정보 */}
				<CardContent>
					<Typography variant="h5" gutterBottom mb={1} fontWeight={'bold'}>
						요금 세부정보
					</Typography>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Typography variant="body1" style={{ color: 'gray' }}>
							{`₩${storage?.storagePrice?.toLocaleString() || 0} X ${
								reservationData?.totalMonths || 0
							}달`}
						</Typography>
						<Typography variant="body1" style={{ color: 'gray' }}>
							{`₩${reservationData?.totalStoragePrice?.toLocaleString() || 0}`}
						</Typography>
					</Box>

					<Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
						<Typography variant="body1" style={{ color: 'gray' }}>
							{'보험 플랜'}
							<br />
							{'최대 20만원 보장'}
						</Typography>
						<Typography variant="body1" style={{ color: 'gray' }}>
							{`₩${reservationData?.insurancePrice?.toLocaleString() || 0}`}
						</Typography>
					</Box>
					<Divider sx={{ margin: '15px 0px' }} />
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Typography variant="h6">{'총 합계(KRW)'}</Typography>
						<Typography variant="h6" color={'primary'}>
							{`₩${reservationData?.totalPayment?.toLocaleString() || 0}`}
						</Typography>
					</Box>
				</CardContent>
				<Divider sx={{ margin: '0px 0px', borderTop: '3px solid lightgray' }} />

				<CardContent>
					{/* 결제 수단 선택 */}
					<Box mt={0}>
						<Typography variant="h5" sx={{ paddingBottom: '10px', fontWeight: 'bold' }}>
							{'결제 수단 선택'}
						</Typography>
						<Grid container spacing={2}>
							{['카카오페이', '네이버페이', '삼성페이', '신용카드', '계좌이체', '기타 결제'].map(
								(paymentMethod, index) => (
									<Grid item xs={4} key={index}>
										<Button
											fullWidth
											variant="outlined"
											sx={{
												flexBasis: '33.33%',
												textAlign: 'center',
												borderColor:
													paymentMethod === selectedPayment ? 'primary.main' : 'grey.500',
												color: paymentMethod === selectedPayment ? 'primary.main' : 'black',
												backgroundColor:
													paymentMethod === selectedPayment ? '#E0F2F1' : 'transparent',
											}}
											onClick={() => setSelectedPayment(paymentMethod)}
										>
											{paymentMethod}
										</Button>
									</Grid>
								),
							)}
						</Grid>
					</Box>
				</CardContent>

				<Divider sx={{ margin: '0px 0px', borderTop: '3px solid lightgray' }} />

				<CardActions
					style={{
						display: 'flex',
						flexDirection: 'column', // 버튼과 텍스트를 수직으로 배치하기 위해 추가
						justifyContent: 'center',
						alignItems: 'center',
						padding: '20px 12px',
					}}
				>
					<Box display="flex" justifyContent="center" alignItems="center" mb={2}>
						{' '}
						{/* marginBottom 추가 */}
						<Typography variant="body2">
							{
								'아래 버튼을 선택하면 호스트가 설정한 공간 이용규칙, 사용자에게 적용되는 기본 규칙, 환불 정책에 동의하며, 피해에 대한 책임이 본인에게 있을 경우 피어락이 결제수단으로 청구의 조치를 취할 수 있다는 사실에 동의하는 것입니다'
							}
						</Typography>
					</Box>
					<Button
						variant="contained"
						fullWidth
						component="label"
						onClick={handleButtonClick}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'white',
							fontSize: '20px',
							boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
							borderRadius: '10px',
							backgroundColor: 'primary.light',
							'&:hover': {
								backgroundColor: 'primary.dark',
							},
						}}
					>
						확인 및 결제
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default StorageReservationComponent;
