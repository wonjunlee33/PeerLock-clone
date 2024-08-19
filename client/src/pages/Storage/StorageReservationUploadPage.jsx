import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getStorageDetail } from '../../api/getStorageDetail';
import FixedBottomNavigation from '../../components/FixBottomNavigation';
import StorageReservationUploadComponent from '../../components/storage/StorageReservationUploadComponent';

const StorageReservationUploadPage = () => {
	// const [storageDetail, setStorageDetail] = useState([]);
	const { storageId } = useParams();
	const [loading, setLoading] = useState(true);

	return (
		<div>
			<StorageReservationUploadComponent storageId={storageId} />
			<FixedBottomNavigation />
		</div>
	);
};

export default StorageReservationUploadPage;
