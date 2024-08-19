import React, { useState, useEffect } from 'react';
import StorageList from '../../components/storage/StorageList';
import { Grid, Box, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import FixedBottomNavigationHost from '../../components/FixBottomNavigationHost';
import AddStorageCard from '../../components/my/AddStorageCard';
import { getMyStorage } from '../../api/getMyStorage';
import { useNavigate } from 'react-router-dom';
import TopNavigationComponent from '../../components/common/TopNavigationComponent';

const MyStoragePage = ({}) => {
	const [loading, setLoading] = useState(true);
	const [storageList, setStorageList] = useState([]);
	const navigate = useNavigate();

	const userId = localStorage.getItem('userId');

	// 나의 창고 목록을 가져오는 코드로 바꾸기
	useEffect(() => {
		const fetch = async () => {
			const data = await getMyStorage(userId);
			if (data.storages == null) {
				setStorageList([]);
			} else {
				setStorageList(data.storages);
			}

			setLoading(false);
		};
		fetch();
	}, []);

	const handleButtonClick = () => {
		navigate(`/mystorage/regist`);
	};

	return (
		<div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
			<TopNavigationComponent centerText="내 공간" />
			<div style={{ paddingBottom: '50px', paddingTop: '60px' }}>
				{loading ? (
					<Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
						<CircularProgress />
					</Box>
				) : (
					<>
						<div>
							<Grid container spacing={3} sx={{ padding: '20px', paddingTop: '5px' }}>
								{!storageList || storageList?.length === 0 ? (
									<Grid item xs={12}>
										<AddStorageCard />
									</Grid>
								) : (
									storageList?.map(item => (
										<Grid item xs={12} key={item.storageId}>
											<StorageList storage={item} />
										</Grid>
									))
								)}
							</Grid>
						</div>
						{storageList.length === 0 ? (
							<div />
						) : (
							<div>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'flex-end',
										position: 'fixed',
										bottom: 50,
										left: 0,
										right: 0,
									}}
									margin={2}
									mb={3}
									mt={0}
								>
									<IconButton
										onClick={handleButtonClick}
										sx={{
											backgroundColor: 'primary.light',
											boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
										}}
									>
										<AddCircleOutlineOutlinedIcon color="white" fontSize="large" />
									</IconButton>
								</Box>
							</div>
						)}
					</>
				)}
			</div>
			<div>
				<FixedBottomNavigationHost />
			</div>
		</div>
	);
};

export default MyStoragePage;
