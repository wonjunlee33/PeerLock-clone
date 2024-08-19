import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = () => {
	return (
		<div>
			<Box sx={{ padding: '10px 20px' }}>
				<TextField
					fullWidth
					variant="outlined"
					placeholder="주소를 입력해주세요"
					sx={{
						backgroundColor: 'white',
						'& .MuiOutlinedInput-root': {
							'& > fieldset': {
								border: 'none',
							},
						},
						borderRadius: '5px',
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</Box>
		</div>
	);
};

export default SearchComponent;
