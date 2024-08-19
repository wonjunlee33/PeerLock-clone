import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	Radio,
	FormControlLabel,
	RadioGroup,
	FormLabel,
	FormHelperText,
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
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import TopNavigationComponent from '../common/TopNavigationComponent';

const StorageReservationUploadComponent = ({ storageId }) => {
	const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
	const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
	const [selectedPayment, setSelectedPayment] = useState(null);
	const [uploadedImages, setUploadedImages] = useState([]);
	const [size, setSize] = useState(''); // 선택된 값의 상태
	const [itemDescription, setItemDescription] = useState('');

	const location = useLocation();
	const storageDetails = location.state?.storageDetails;
	// console.log(storageDetails);

	const navigate = useNavigate(); // React Router v6의 useNavigate 훅을 사용

	const handleChange = event => {
		setSize(event.target.value);
	};

	const handleButtonClick = () => {
		const reservationData = generateReservationJSON();
		console.log('reservationData ', reservationData);
		axios
			.post(`/api/reservation`, reservationData)
			.then(response => {
				// 서버 응답 처리
				console.log('서버 응답:', response.data);

				console.log('등록 성공');
				const reservationId = response.data.reservationId;

				uploadToServer(uploadedFiles, reservationId);

				console.log('서버 이미지 등록 성공');
			})
			.catch(error => {
				// 에러 처리
				console.error('에러 발생:', error);
			});

		navigate(`/storage/reservation/confirm/${storageId}`, { state: { reservationData } });
	};

	const uploadToServer = async (files, reservationId) => {
		const formData = new FormData();

		formData.append('reservationId', reservationId);

		for (let file of files) {
			formData.append('images', file);
		}

		try {
			const response = await axios.post('/api/reservation/images', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			console.log('Upload successful:', response.data);
			// setUploadedImages(prevState => [...prevState, ...response.data]);
		} catch (error) {
			console.error('Error uploading:', error);
		}
	};

	const [uploadedFiles, setUploadedFiles] = useState([]);

	const handleImageChange = e => {
		const files = Array.from(e.target.files);
		setUploadedFiles(files); // 파일들을 상태에 저장합니다.

		const fileURLs = files.map(file => URL.createObjectURL(file));
		setUploadedImages(prevState => [...prevState, ...fileURLs]);
	};

	const getMonthsBetweenDates = (startDate, endDate) => {
		const start = new Date(startDate);
		const end = new Date(endDate);

		let months = (end.getFullYear() - start.getFullYear()) * 12;
		months -= start.getMonth();
		months += end.getMonth();

		return months <= 0 ? 0 : months;
	};

	// 보험 플랜에 따른 보험료 계산
	let insurancePrice = 0;
	if (selectedPayment === 'standard') {
		insurancePrice = 5000;
	} else if (selectedPayment === 'premium') {
		insurancePrice = 50000;
	}

	// 전체 요금 계산 (보관료 + 보험료)
	const totalMonths = getMonthsBetweenDates(startDate, endDate) + 1;
	const totalStoragePrice = storageDetails.storagePrice * totalMonths;
	const totalPayment = totalStoragePrice + insurancePrice;

	// console.log(totalMonths, totalStoragePrice);

	const generateReservationJSON = () => {
		const userId = localStorage.getItem('userId');
		const currStorageId = storageId;
		const jsonData = {
			userId: userId,
			storageId: currStorageId,
			startDate: startDate,
			endDate: endDate,
			itemSize: size,
			images: uploadedImages,
			insurancePlan: selectedPayment,
			insurancePrice: `${insurancePrice}`,
			totalPayment: `${totalPayment}`,
			totalStoragePrice: `${totalStoragePrice}`,
			totalMonths: `${totalMonths}`,
		};

		return jsonData; // JSON 데이터 반환
	};

	const handleBackBtn = event => {
		window.history.back();
	};

	return (
		<div>
			<div>
				<Box style={{ maxHeight: '100vh', overflowY: 'auto', paddingBottom: '70px' }}>
					<TopNavigationComponent centerText="예약" backClick onBackClick={handleBackBtn} />
					<Card elevation={0} sx={{ width: '100%', paddingTop: '30px' }}>
						{/* 기간 설정 -> 날짜 */}
						<CardContent>
							{/* 예약 날짜 선택 */}
							<Box mt={2}>
								<Typography variant="h5" sx={{ paddingBottom: '10px', fontWeight: 'bold' }}>
									예약 정보 입력
								</Typography>
								<Typography variant="h6" gutterBottom mb={2}>
									예약 기간 설정
								</Typography>
								<Grid container spacing={2}>
									{/* 시작일 */}
									<Grid item xs={6}>
										<TextField
											label="시작일"
											variant="outlined"
											type="date"
											fullWidth
											value={startDate}
											onChange={e => setStartDate(e.target.value)}
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
											value={endDate}
											onChange={e => setEndDate(e.target.value)}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</Grid>
								</Grid>
							</Box>
						</CardContent>
						<Divider sx={{ margin: '0px 15px' }} />
						{/* 보관 물품 정보 -> select Box 소형/중형/대형 */}
						<CardContent>
							<Typography variant="h6" gutterBottom mb={1}>
								보관 물품 정보
							</Typography>
							<FormControl fullWidth variant="outlined">
								<Select
									value={size}
									onChange={handleChange}
									displayEmpty
									placeholder="크기 선택"
									sx={{
										borderRadius: '10px',
										'& fieldset': {
											borderRadius: '10px',
										},
									}}
								>
									<MenuItem value="small">소형</MenuItem>
									<MenuItem value="medium">중형</MenuItem>
									<MenuItem value="large">대형</MenuItem>
								</Select>
							</FormControl>
						</CardContent>

						<Divider sx={{ margin: '0px 15px' }} />
						{/* 물품 사진 등록 -> 최대 4개의 사진 등록할 수 있게 */}
						<CardContent>
							<Box mt={2} mb={2}>
								<Box>
									<Typography variant="h6" gutterBottom>
										물품 사진 등록
									</Typography>
									<Typography variant="body1" gutterBottom mt={0} sx={{ color: '#5a5a5a' }}>
										최대 4개의 사진을 등록해주세요.
									</Typography>
									<Box mt={2} mb={2} pl={1}>
										<Box display="flex" alignItems="center" gap={1}>
											<Typography variant="body1" gutterBottom mt={0} sx={{ color: '#5a5a5a' }}>
												<WbSunnyOutlinedIcon
													color="primary"
													sx={{ verticalAlign: 'middle', marginRight: '8px' }}
												/>
												충분한 밝기를 유지해주세요.
											</Typography>
										</Box>
										<Box display="flex" alignItems="center" gap={1}>
											<Typography variant="body1" gutterBottom mt={0} sx={{ color: '#5a5a5a' }}>
												<CleaningServicesOutlinedIcon
													color="primary"
													sx={{ verticalAlign: 'middle', marginRight: '8px' }}
												/>
												주변 물건들을 정리해주세요.
											</Typography>
										</Box>
										<Box display="flex" alignItems="center" gap={1}>
											<Typography variant="body1" gutterBottom mt={0} sx={{ color: '#5a5a5a' }}>
												<Inventory2OutlinedIcon
													color="primary"
													sx={{ verticalAlign: 'middle', marginRight: '8px' }}
												/>
												실제로 물건을 보관할 장소를 찍으면 좋아요!
											</Typography>
										</Box>
									</Box>
									<Button
										variant="contained"
										fullWidth
										component="label"
										sx={{
											marginTop: '8px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: '18px',
											color: 'white',
											backgroundColor: 'primary.light', // 배경색을 primary로 설정
											borderColor: 'gray',
											boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
											borderRadius: '10px',
											'&:hover': {
												backgroundColor: '#1565c0',
											},
										}}
									>
										사진 등록하기
										<input type="file" hidden multiple onChange={handleImageChange} />
									</Button>
									{/* Uploaded images preview */}
									<Box
										mt={2}
										display="flex"
										flexDirection="row"
										gap={2}
										overflowx="auto" // 슬라이드를 위한 속성
										whiteSpace="nowrap" // 슬라이드를 위한 속성
									>
										{uploadedImages?.map((image, index) => (
											<img
												key={index}
												src={image}
												alt={`uploaded-img-${index}`}
												style={{
													width: '100px',
													height: '100px',
													objectFit: 'cover',
													boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
												}}
											/>
										))}
									</Box>
								</Box>
							</Box>
						</CardContent>

						<Divider sx={{ margin: '0px 15px' }} />
						{/* 물품 설명 */}
						<CardContent>
							<Box mt={2} mb={2}>
								<Typography variant="h6" gutterBottom mb={1}>
									보관 물품 설명
								</Typography>
								<Typography variant="body2" gutterBottom mt={0} mb={2} sx={{ color: '#5a5a5a' }}>
									공간 주인이 물품에 대해 알 수 있도록 간단하게 설명해주세요!
								</Typography>
								<TextField
									variant="outlined"
									fullWidth
									multiline
									rows={4}
									value={itemDescription}
									onChange={e => setItemDescription(e.target.value)}
									placeholder="보관 물품에 대한 설명을 여기에 입력하세요."
								/>
							</Box>
						</CardContent>

						<Divider sx={{ margin: '0px 15px' }} />
						<CardContent>
							<Typography variant="h6" gutterBottom mb={1}>
								보험 플랜 선택
							</Typography>
							<Box>
								<RadioGroup
									onChange={e => setSelectedPayment(e.target.value)} // onChange 핸들러 추가
								>
									<FormControl
										sx={{
											p: 2,
											flexDirection: 'row',
											gap: 2,
											border: '1px solid gray',
											borderRadius: '10px',
											marginBottom: '10px',
										}}
									>
										<Radio value="standard" />
										<div>
											<FormLabel>스탠다드</FormLabel>
											<Divider sx={{ margin: '0px 0px' }} />
											<FormHelperText>보험료 최대 5,000원/월</FormHelperText>
										</div>
									</FormControl>
									<FormControl
										sx={{
											p: 2,
											flexDirection: 'row',
											gap: 2,
											border: '1px solid gray',
											borderRadius: '10px',
											marginBottom: '10px',
										}}
									>
										<Radio value="premium" />
										<div>
											<FormLabel>프리미엄</FormLabel>
											<Divider sx={{ margin: '0px 0px' }} />
											<FormHelperText>보험료 최대 50,000원/월</FormHelperText>
										</div>
									</FormControl>
									<FormControl
										sx={{
											p: 2,
											flexDirection: 'row',
											gap: 2,
											border: '1px solid gray',
											borderRadius: '15px',
											marginBottom: '10px',
										}}
									>
										<Radio value="none" />
										<div>
											<FormLabel>미선택</FormLabel>
										</div>
									</FormControl>
								</RadioGroup>
							</Box>
						</CardContent>

						<Divider sx={{ margin: '0px 15px' }} />
						{/* 요금 세부정보 */}
						<CardContent>
							<Typography variant="h6" gutterBottom mb={1}>
								요금 세부정보
							</Typography>
							<Box display="flex" justifyContent="space-between" alignItems="center">
								<Typography variant="body1" style={{ color: 'gray' }}>
									{`₩${storageDetails.storagePrice.toLocaleString()} X ${totalMonths}달`}
								</Typography>
								<Typography variant="body1" style={{ color: 'gray' }}>
									{`₩${totalStoragePrice.toLocaleString()}`}
								</Typography>
							</Box>

							<Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
								<Typography variant="body1" style={{ color: 'gray' }}>
									보험 플랜
									<br />
									최대 20만원 보장
								</Typography>
								<Typography variant="body1" style={{ color: 'gray' }}>
									{`₩${insurancePrice.toLocaleString()}`}
								</Typography>
							</Box>
							<Divider sx={{ margin: '15px 0px' }} />
							<Box display="flex" justifyContent="space-between" alignItems="center">
								<Typography variant="h6">총 합계(KRW)</Typography>
								<Typography variant="h6" color="primary">
									{`₩${totalPayment.toLocaleString()}`}
								</Typography>
							</Box>
						</CardContent>

						<Box display="flex" justifyContent="flex-end" m={2}>
							{/* 다음 버튼 -> StorageResrvationPage.jsx로  */}
							<Button
								size="medium"
								variant="contained"
								onClick={handleButtonClick} // 버튼 클릭 시 handleButtonClick 함수 호출
								sx={{
									alignItems: 'center',
									justifyContent: 'center',
									color: 'white', // 텍스트 색상을 하얀색으로 설정
									fontSize: '20px',
									boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
									borderRadius: '10px',
									paddingLeft: '25px',
									paddingRight: '25px',
									backgroundColor: 'primary.light', // 배경색을 primary로 설정
									'&:hover': {
										backgroundColor: 'primary.dark', // hover 시에는 어두운 primary 색상으로 변경
									},
								}}
							>
								다음
							</Button>
						</Box>
					</Card>
				</Box>
			</div>
		</div>
	);
};

export default StorageReservationUploadComponent;
