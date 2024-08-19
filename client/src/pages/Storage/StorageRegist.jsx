import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Typography,
	Button,
	Box,
	TextField,
	FormControlLabel,
	FormGroup,
	Checkbox,
	Input,
	InputAdornment,
	RadioGroup,
	Radio,
	Divider,
	Grid,
	Paper,
	CardContent,
	Card,
} from '@mui/material';
import {
	ArrowBack as ArrowBackIcon,
	SmokeFree as SmokeFreeIcon,
	CameraIndoor as CameraIndoorIcon,
	FireExtinguisher as FireExtinguisherIcon,
	Search as SearchIcon,
	GpsFixed as GpsFixedIcon,
	LocalAtm as LocalAtmIcon,
} from '@mui/icons-material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import SelectComponent from '../../components/common/SelectComponent';
import { useNavigate } from 'react-router-dom';
import { registStorage } from '../../api/registStorage';
import TopNavigationComponent from '../../components/common/TopNavigationComponent';
import { grey } from '@mui/material/colors';

const StorageRegist = ({}) => {
	const [selectTypeValue, setSelectTypeValue] = useState('');
	const [selectSizeValue, setSelectSizeValue] = useState('');
	const [uploadedImages, setUploadedImages] = useState([]);
	const [price, setPrice] = useState('fixedPrice');
	const [fixedPrice, setFixedPrice] = useState(null);
	const [smartPrice, setSmartPrice] = useState(1000);
	const [selectPrice, setSelectPrice] = useState(null);
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState(false);
	const [storageName, setStorageName] = useState('');
	const [storageFeature, setStorageFeature] = useState({
		smokeFree: false,
		cameraIndoor: false,
		fireExtinguisher: false,
	});
	const [uploadedFiles, setUploadedFiles] = useState([]);

	const storageType = ['방', '창고', '상권', '기타'];
	const storageSize = ['소형', '중형', '대형'];

	const navigate = useNavigate();

	const handleBackBtn = event => {
		window.history.back();
	};

	useEffect(() => {
		if (price === 'fixedPrice') {
			setSelectPrice(fixedPrice);
		} else if (price === 'smartPrice') {
			setSelectPrice(smartPrice);
		}
	}, [price, fixedPrice, smartPrice]);

	const handlePriceChange = event => {
		setPrice(event.target.value);
	};
	const handleFixedPriceChange = event => {
		setFixedPrice(event.target.value);
	};
	const handleContentChange = event => {
		setDescription(event.target.value);
	};
	const handleNameChange = event => {
		setStorageName(event.target.value);
	};
	const handleFeatureClick = feature => {
		setStorageFeature(prevFeature => ({
			...prevFeature,
			[feature]: !prevFeature[feature],
		}));
	};

	const handleLocationClick = () => {
		setLocation(!location);
	};

	const handleImageChange = e => {
		const files = Array.from(e.target.files);
		setUploadedFiles(files); // 파일들을 상태에 저장합니다.

		const fileURLs = files.map(file => URL.createObjectURL(file));
		setUploadedImages(prevState => [...prevState, ...fileURLs]);
	};

	// const images = [
	// 	{
	// 		imageName: '효창동 용산구 창고 D03 2nd',
	// 		imagePath:
	// 			'https://peerlock-image-s3.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%AD%E1%84%8E%E1%85%A1%E1%86%BC%E1%84%83%E1%85%A9%E1%86%BC+%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%89%E1%85%A1%E1%86%AB%E1%84%80%E1%85%AE+%E1%84%8E%E1%85%A1%E1%86%BC%E1%84%80%E1%85%A9+D03+2nd.jpg',
	// 	},
	// 	{
	// 		imageName: '상수동마포',
	// 		imagePath:
	// 			'https://peerlock-image-s3.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%AE%E1%84%83%E1%85%A9%E1%86%BC+%E1%84%86%E1%85%A1%E1%84%91%E1%85%A9%E1%84%80%E1%85%AE+%E1%84%8B%E1%85%A9%E1%86%BA%E1%84%8C%E1%85%A1%E1%86%BC+D03.webp',
	// 	},
	// ];
	const onSubmitHandler = async () => {
		if (uploadedImages.length === 0) {
			alert('사진을 등록해주세요');
			return;
		}
		const body = {
			userId: localStorage.getItem('userId'),
			storageName: storageName,
			storageAddress: '123 Main St, City, Country',
			storageLatitude: '37.123456',
			storageLongitude: '127.123456',
			storageType: selectTypeValue,
			// storageFeature: storageFeature,
			storageFeature: '1',
			storageSize: selectSizeValue,
			storagePrice: selectPrice,
			serviceCommission: 10,
			storageDescription: description,
			// images: uploadedImages,
			returnPolicy: 'Items can be returned within 30 days of purchase.',
			images: [],
		};
		try {
			const res = await registStorage(body);
			if (res.status === 200) {
				console.log('등록 성공');
				const storageId = res.data.storageId;
				uploadToServer(uploadedFiles, storageId);
				console.log('서버 이미지 등록 성공');
				navigate(`/mystorage`, {
					state: { prevRouter: `/` },
				});
			}
		} catch (error) {
			alert('다시 시도하세요.');
		}
	};

	const uploadToServer = async (files, storageId) => {
		const formData = new FormData();

		formData.append('storageId', storageId);

		for (let file of files) {
			formData.append('images', file);
		}

		try {
			const response = await axios.post('/api/storage/images', formData, {
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

	return (
		<Box style={{ maxHeight: '100vh', overflowY: 'auto', paddingBottom: '60px' }}>
			<TopNavigationComponent
				backClick
				centerText="내 공간 등록"
				onBackClick={handleBackBtn}
				// rightMenu
			/>
			<Card
				style={{
					width: '100%',
					paddingTop: '60px',
				}}
				elevation={0}
			>
				<CardContent>
					<Box>
						<Typography variant="h6" gutterBottom style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}>
							공간 이름
						</Typography>
						<TextField fullWidth onChange={handleNameChange} />
					</Box>
				</CardContent>
				<CardContent>
					<Typography
						variant="h6"
						gutterBottom
						mb={1}
						style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
					>
						공간 타입
					</Typography>
					<SelectComponent
						selectValue={selectTypeValue}
						setSelectValue={setSelectTypeValue}
						names={storageType}
					/>
				</CardContent>
				<CardContent>
					<Typography
						variant="h6"
						gutterBottom
						mb={1}
						style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
					>
						공간 특징
					</Typography>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
							alignItems: 'center',
							width: '100%',
							marginTop: '10px',
						}}
					>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							border="2px solid"
							borderColor={storageFeature.smokeFree ? '#1976d2' : 'lightgray'}
							borderRadius="5px"
							width="80px"
							height="80px"
							margin="0 10px"
							onClick={() => handleFeatureClick('smokeFree')}
						>
							<SmokeFreeIcon sx={{ fontSize: 70 }} />
						</Box>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							border="2px solid"
							borderColor={storageFeature.cameraIndoor ? '#1976d2' : 'lightgray'}
							borderRadius="5px"
							width="80px"
							height="80px"
							margin="0 10px"
							onClick={() => handleFeatureClick('cameraIndoor')}
						>
							<CameraIndoorIcon sx={{ fontSize: 70 }} />
						</Box>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							border="2px solid"
							borderColor={storageFeature.fireExtinguisher ? '#1976d2' : 'lightgray'}
							borderRadius="5px"
							width="80px"
							height="80px"
							margin="0 10px"
							onClick={() => handleFeatureClick('fireExtinguisher')}
						>
							<FireExtinguisherIcon sx={{ fontSize: 70 }} />
						</Box>
					</div>
				</CardContent>
				<CardContent>
					<Typography
						variant="h6"
						gutterBottom
						mb={1}
						style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
					>
						공간 위치
					</Typography>
					<Button
						sx={{
							width: '100%',
							height: '50px',
							marginTop: '10px',
							borderColor: 'lightgray',
							color: 'gray',
						}}
						style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
						variant="outlined"
						startIcon={<SearchIcon />}
					>
						공간 위치를 검색하세요
					</Button>
					<Button
						sx={{ width: '100%', height: '50px', marginTop: '10px', backgroundColor: '#8DB4FF' }}
						style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
						variant="contained"
						startIcon={<GpsFixedIcon />}
						onClick={() => handleLocationClick()}
					>
						현재 위치 사용
					</Button>
					{location && (
						<div
							sx={{
								width: '100%',
								border: '5px solid lightgray',
							}}
						>
							<div>
								<Typography
									variant="h6"
									gutterBottom
									mb={1}
									style={{ fontFamily: 'SpoqaHanSansNeo-Bold', marginTop: '15px' }}
								>
									경기도 용인시 수지구 성복2로10
								</Typography>
								<Typography
									variant="h6"
									gutterBottom
									fontSize={14}
									mb={1}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium', marginTop: '-10px' }}
								>
									<span
										style={{
											backgroundColor: '#D9D9D9',
											padding: '2px 10px',
											marginRight: '8px',
											borderRadius: '10px',
											fontSize: '12px',
										}}
									>
										도로명
									</span>
									경기도 용인시 수지구 성복2로10
								</Typography>
							</div>

							<TextField
								style={{ width: '100%', marginTop: '10px' }}
								placeholder="상세 주소를 입력하세요"
							/>
						</div>
					)}
				</CardContent>
				<CardContent>
					<Typography
						variant="h6"
						gutterBottom
						mb={1}
						style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
					>
						공간 크기
					</Typography>
					<SelectComponent
						selectValue={selectSizeValue}
						setSelectValue={setSelectSizeValue}
						names={storageSize}
					/>
				</CardContent>
				<CardContent>
					<Typography
						variant="h6"
						gutterBottom
						mb={1}
						style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
					>
						가격 설정
					</Typography>
					<Box>
						<RadioGroup
							aria-label="options"
							name="controlled-radio-buttons-group"
							value={price}
							onChange={handlePriceChange}
						>
							<Box
								sx={{
									width: '100%',
									border: '1px solid',
									borderColor: '#8DB4FF',
									borderRadius: 2,
									padding: 1,
									marginBottom: 1,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										justifyContent: 'flex-start',
										marginLeft: 3,
									}}
								>
									<FormControlLabel
										value="fixedPrice"
										control={<Radio />}
										label={
											<Typography style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}>
												고정 가격 설정
											</Typography>
										}
									/>
								</Box>
								<Input
									id="standard-adornment-amount"
									endAdornment={<InputAdornment position="end">₩</InputAdornment>}
									sx={{
										width: '90%',
										marginTop: 1,
										marginBottom: 1,
									}}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
									onChange={handleFixedPriceChange}
								/>
							</Box>
							<Box
								sx={{
									width: '100%',
									border: '1px solid',
									// borderColor: '#8DB4FF',
									borderColor: 'lightgray',
									borderRadius: 2,
									padding: 1,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'flex-start',
										marginLeft: 3,
									}}
								>
									<FormControlLabel
										value="smartPrice"
										control={<Radio />}
										label={
											<Typography style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}>
												스마트 가격 추천
											</Typography>
										}
									/>

									<Box sx={{ width: '100%', paddingRight: '20px' }}>
										<Box sx={{ my: 1 }}>
											<Grid container alignItems="center">
												<Grid item xs>
													<Typography
														gutterBottom
														variant="h6"
														component="div"
														style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
													>
														단기 보관
													</Typography>
												</Grid>
												<Grid item>
													<Typography
														gutterBottom
														variant="subtitle1"
														component="div"
														style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
													>
														{smartPrice}/일
													</Typography>
												</Grid>
											</Grid>
											<Divider />
											<Grid sx={{ mt: 1 }} container alignItems="center">
												<Grid item xs>
													<Typography
														gutterBottom
														variant="h6"
														component="div"
														style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
													>
														장기 보관
													</Typography>
												</Grid>
												<Grid item>
													<Typography
														gutterBottom
														variant="subtitle1"
														component="div"
														style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
													>
														20,000원/월
													</Typography>
												</Grid>
											</Grid>
										</Box>
									</Box>
								</Box>
							</Box>
						</RadioGroup>
					</Box>
				</CardContent>
				<CardContent>
					<Box mt={2} mb={2}>
						<Typography variant="h6" gutterBottom style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}>
							공간 설명
						</Typography>
						<Typography
							variant="body1"
							gutterBottom
							mt={0}
							sx={{ color: '#5a5a5a' }}
							style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
						>
							대여자들이 공간에 대해 알기 쉽게 설명해주세요
						</Typography>
						<TextField
							multiline
							rows={5}
							variant="outlined"
							fullWidth
							sx={{ width: '100%', marginTop: '10px' }}
							onChange={handleContentChange}
							style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}
						/>
					</Box>
				</CardContent>

				<CardContent>
					<Box mt={2} mb={2}>
						<Box>
							<Typography
								variant="h6"
								gutterBottom
								style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
							>
								공간 사진 등록
							</Typography>
							<Typography
								variant="body1"
								gutterBottom
								mt={0}
								sx={{ color: '#5a5a5a' }}
								style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
							>
								최대 4개의 사진을 등록해주세요.
							</Typography>
							<Box mt={2} mb={2} pl={1}>
								<Box display="flex" alignItems="center" gap={1}>
									<Typography variant="body1" gutterBottom mt={0} sx={{ color: '#5a5a5a' }}>
										<WbSunnyOutlinedIcon
											color="primary"
											sx={{ verticalAlign: 'middle', marginRight: '8px' }}
											style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
										/>
										충분한 밝기를 유지해주세요.
									</Typography>
								</Box>
								<Box display="flex" alignItems="center" gap={1}>
									<Typography variant="body1" gutterBottom mt={0} sx={{ color: '#5a5a5a' }}>
										<CleaningServicesOutlinedIcon
											color="primary"
											sx={{ verticalAlign: 'middle', marginRight: '8px' }}
											style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
										/>
										주변 물건들을 정리해주세요.
									</Typography>
								</Box>
								<Box display="flex" alignItems="center" gap={1}>
									<Typography variant="body1" gutterBottom mt={0} sx={{ color: '#5a5a5a' }}>
										<Inventory2OutlinedIcon
											color="primary"
											sx={{ verticalAlign: 'middle', marginRight: '8px' }}
											style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
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
								style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
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
								{uploadedImages.map((image, index) => (
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
			</Card>

			<Paper
				sx={{
					display: 'flex',
					justifyContent: 'center',
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
				}}
				elevation={3}
			>
				<Button
					sx={{ width: '90%', height: '50px', margin: '10px', backgroundColor: '#8DB4FF' }}
					style={{ fontFamily: 'SpoqaHanSansNeo-Bold', fontSize: '20px' }}
					variant="contained"
					onClick={onSubmitHandler}
				>
					완료
				</Button>
			</Paper>
		</Box>
	);
};

export default StorageRegist;
