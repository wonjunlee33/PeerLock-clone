import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppHeader from '../../components/common/AppHeader';
import StorageDetail from '../../components/storage/StorageDetail';
import { getStorageDetail } from '../../api/getStorageDetail';
import FixedBottomNavigation from '../../components/FixBottomNavigation';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import FixedBottomNavigationHost from '../../components/FixBottomNavigationHost';

const StorageDetailPage = () => {
	const [storageDetail, setStorageDetail] = useState([]);
	const { storageId } = useParams();
	const [loading, setLoading] = useState(true);
	const status = localStorage.getItem('userStatus');

	useEffect(() => {
		const fetch = async () => {
			const data = await getStorageDetail(storageId);
			setStorageDetail(data);
			setLoading(false);
		};
		fetch();
	}, []);

	return (
		<div>
			<div>
				{loading ? (
					<Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
						<CircularProgress />
					</Box>
				) : (
					<StorageDetail storage={storageDetail} />
				)}
			</div>
			{/* {status === 'USER' ? <FixedBottomNavigation /> : <FixedBottomNavigationHost />} */}
		</div>
	);
};

export default StorageDetailPage;
