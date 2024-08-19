import React, { useState, useEffect } from 'react';
import { getStorageList } from '../../api/getStorageList';
import StorageList from '../../components/storage/StorageList';
import {
	Grid,
	Typography,
	Box,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Divider,
	Button,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Storage = ({ modalOpen, handleOpenModal, handleCloseModal, storageList, setStorageList }) => {
	const [filter, setFilter] = useState('가격순');
	const [loading, setLoading] = useState(true);

	const handleFilterChange = event => {
		setFilter(event.target.value);
	};

	useEffect(() => {
		const fetch = async () => {
			const data = await getStorageList();
			setStorageList(data);
			setLoading(false);
		};
		fetch();
	}, []);

	return (
		<div>
			{loading ? (
				<div style={{ display: 'flex', marginTop: '100px', justifyContent: 'center' }}>
					<CircularProgress />
				</div>
			) : (
				<div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
					<div style={{ paddingBottom: '50px', fontFamily: 'SpoqaHanSansNeo-Medium' }}>
						<Box
							display="flex"
							alignItems="center"
							justifyContent="center"
							sx={{ paddingTop: '4px', paddingLeft: '20px', paddingRight: '20px' }}
						>
							{modalOpen ? (
								<KeyboardArrowDownIcon onClick={handleCloseModal} />
							) : (
								<KeyboardArrowUpIcon onClick={handleOpenModal} />
							)}
						</Box>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							sx={{ paddingTop: '2px', paddingLeft: '20px', paddingRight: '20px' }}
						>
							<Typography
								variant="h6"
								gutterBottom
								sx={{ fontSize: '17px', marginBottom: '0' }}
								style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}
							>
								<Box component="span" fontWeight="bold">
									{storageList?.length}
								</Box>
								개의 검색결과
							</Typography>

							<FormControl
								variant="outlined"
								size="small"
								sx={{ fontSize: '14px' }}
								style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
							>
								<InputLabel>필터</InputLabel>
								<Select
									value={filter}
									onChange={handleFilterChange}
									label="필터"
									sx={{ fontSize: 'inherit' }}
									style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
								>
									<MenuItem value="최신순" style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}>
										최신순
									</MenuItem>
									<MenuItem value="인기도순" style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}>
										인기도순
									</MenuItem>
									<MenuItem value="가격순" style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}>
										가격순
									</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Divider sx={{ margin: '10px 20px' }} />

						<Grid
							container
							spacing={3}
							sx={{ padding: '20px', paddingTop: '5px' }}
							style={{ fontFamily: 'SpoqaHanSansNeo-Medium' }}
						>
							{storageList.map(item => (
								<Grid item xs={12} key={item.storageId}>
									{' '}
									{/* xs={12}만 사용 */}
									<StorageList storage={item} />
								</Grid>
							))}
						</Grid>
					</div>
				</div>
			)}
		</div>
	);
};

export default Storage;
