import React, { useState } from 'react';
import Storage from '../Storage/Storage'; // Storage 컴포넌트의 경로를 정확히 지정해주세요.
import FixedBottomNavigation from '../../components/FixBottomNavigation';
import NaverMapComponent from '../../components/NaverMapComponent';
import { NavermapsProvider } from 'react-naver-maps';
import SearchComponent from '../../components/common/SearchComponent';

const MapScreen = () => {
	const [lat, setLat] = useState(37.5234935);
	const [lng, setLng] = useState(126.9284844);
	const [zoom, setZoom] = useState(12);
	const [roadAddress, setRoadAddress] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [storageList, setStorageList] = useState([]);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	return (
		<div>
			<NavermapsProvider
				ncpClientId={process.env.REACT_APP_NAVER_MAP_CLIENT_ID}
				submodules={['geocoder']}
			>
				<div style={{ position: 'relative', width: '100%', height: '100%' }}>
					<NaverMapComponent
						zoom={zoom}
						Latitude={lat}
						Longtitude={lng}
						roadAddress={roadAddress}
						storageList={storageList}
					/>
					<div style={{ position: 'absolute', top: '0', width: '100%' }}>
						<SearchComponent />
					</div>
				</div>
				<div>
					{openModal ? (
						<div
							style={{
								position: 'absolute',
								bottom: '0',
								width: '100%',
								maxWidth: '1200px',
								height: '100%',
								backgroundColor: 'white',
								marginTop: '10%',
							}}
						>
							<Storage
								modalOpen={openModal}
								handleOpenModal={() => handleOpenModal()}
								handleCloseModal={() => handleCloseModal()}
								storageList={storageList}
								setStorageList={setStorageList}
							/>
						</div>
					) : (
						<div
							style={{
								position: 'absolute',
								bottom: '0',
								width: '100%',
								height: '40%',
								backgroundColor: 'white',
							}}
						>
							<Storage
								modalOpen={openModal}
								handleOpenModal={handleOpenModal}
								handleCloseModal={handleCloseModal}
								storageList={storageList}
								setStorageList={setStorageList}
							/>
						</div>
					)}
				</div>

				<FixedBottomNavigation />
			</NavermapsProvider>
		</div>
	);
};

export default MapScreen;
