import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { getStorageDetail } from '../../api/getStorageDetail';
import StorageList from '../storage/StorageList';

const AddStorageCard = () => {
	const storageId = 1;
	const [storage, setStorage] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetch = async () => {
			const data = await getStorageDetail(storageId);
			setStorage(data);
			setLoading(false);
		};
		fetch();
	}, []);

	const tempStorageHandler = () => {
		// try {
		// 	axios.post()
		// }
	};

	return (
		<div>
			<Card
				sx={{
					borderColor: 'lightgray',
					borderWidth: 1,
					borderStyle: 'solid',
					borderRadius: '15px',
					paddingLeft: '15px',
					paddingRight: '15px',
				}}
			>
				<CardContent>
					<Box display="flex" justifyContent="center" alignItems="center" mb={1}>
						<HomeOutlinedIcon color="primary" sx={{ fontSize: '50px' }} />
					</Box>
					<Typography variant="body1" fontWeight={'bold'} align="center">
						등록된 공간이 아직 없어요...!
					</Typography>
					<Typography variant="body2" align="center" mb={1}>
						내가 사용하지 않는 공간에 짐을 보관하고 <br />
						추가 수입을 얻어보세요!
					</Typography>

					<Link to={`/mystorage/regist`}>
						<Button
							variant="contained" // "outlined"를 "contained"로 변경하여 버튼에 배경색을 추가합니다.
							fullWidth
							component="label"
							onClick={tempStorageHandler}
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'white', // 텍스트 색상을 하얀색으로 설정
								fontSize: '20px',
								boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
								borderRadius: '10px',
								backgroundColor: 'primary.light', // 배경색을 primary로 설정
								'&:hover': {
									backgroundColor: 'primary.dark', // hover 시에는 어두운 primary 색상으로 변경
								},
							}}
						>
							공간 등록하기
						</Button>
					</Link>
				</CardContent>
			</Card>
			<Box mt={3} mb={1}>
				<Typography variant="h5" mb={2} mt={5}>
					다른 공간 둘러보기
				</Typography>
			</Box>
			{/* 공간 하나 랜덤으로 받아와서 출력하기 */}
			{loading ? <p>Loading...</p> : <StorageList storage={storage} />}
		</div>
	);
};
export default AddStorageCard;
