import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import axios from 'axios';

// todo: js cors 에러 해결해야 함
const AddressInput = ({ lat, lng }) => {
	const { naver } = window;

	// 주소 검색 함수에 넘겨줄 address 상태 관리
	const [address, setAddress] = useState('');

	//주소 검색 시, 주소창의 change event를 감지한다.
	const handleChange = e => {
		const { address, value } = e.target;
		const newAddress = { address: value };
		setAddress(newAddress);
	};

	//주소 타이핑 후 검색 버튼을 누르면 동작하는 함수
	const searchAddressToCoordinate = async ({ address }) => {
		try {
			const response = await axios.get('/map-geocode/v2/geocode', {
				params: {
					query: address,
				},
				headers: {
					'X-Naver-Client-Id': process.env.REACT_APP_NAVER_MAP_CLIENT_ID,
					'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_API_KEY,
					Accept: 'application/json',
				},
			});
			// console.log(response);
			const result = response.v2,
				items = result.address;
			const x = parseFloat(items[0].x);
			const y = parseFloat(items[0].y);
		} catch (err) {
			throw err;
		}
	};
	return (
		<Paper
			component="form"
			sx={{
				p: '2px 4px',
				mx: '5px',
				display: 'flex',
				position: 'relative',
				width: '100%',
			}}
		>
			<InputBase
				sx={{ ml: 2, flex: 1 }}
				style={{
					fontFamily: 'SpoqaHanSansNeo-Medium',
				}}
				placeholder="주소를 입력해주세요"
				inputProps={{ style: { margin: '0', padding: '0', fontFamily: 'SpoqaHanSansNeo-Medium' } }}
				onChange={handleChange}
			/>
			<IconButton
				type="button"
				sx={{ p: '10px' }}
				aria-label="search"
				// onClick={() => searchAddressToCoordinate(address)}
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export default AddressInput;
