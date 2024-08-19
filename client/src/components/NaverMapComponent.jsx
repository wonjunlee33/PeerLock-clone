import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

const NaverMapComponent = ({ storageList }) => {
	const navermaps = useNavermaps();

	function priceToString(price) {
		return '₩ ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	const renderMarker = ({ storage }) => {
		const position = new navermaps.LatLng(storage.storageLatitude, storage.storageLongitude);

		const icon = {
			content: `<div style="padding:5px; background-color:white; border-radius:10px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); font-family: SpoqaHanSansNeo-Bold;">${priceToString(
				storage.storagePrice,
			)}</div>`,
			size: new navermaps.Size(200, 50),
			anchor: new navermaps.Point(25, 10),
		};

		return <Marker key={storage.storageId} icon={icon} position={position} />;
	};

	return (
		<MapDiv
			style={{
				width: '100%',
				height: '800px',
			}}
		>
			<NaverMap defaultCenter={new navermaps.LatLng(37.5234935, 126.9284844)} defaultZoom={15}>
				{storageList.map(storage => renderMarker((storage = { storage })))}
			</NaverMap>
		</MapDiv>
	);
};

export default NaverMapComponent;
