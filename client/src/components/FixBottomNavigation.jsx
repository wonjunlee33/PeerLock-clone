import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Paper from '@mui/material/Paper';
import { Link, useLocation } from 'react-router-dom';

export default function FixedBottomNavigation() {
	const location = useLocation();
	const initialValue = getInitialValue(location.pathname);
	const [value, setValue] = React.useState(initialValue);
	const ref = React.useRef(null);

	function getInitialValue(path) {
		switch (path) {
			case '/HomeGuest':
				return 0;
			case '/wish':
				return 1;
			case '/map':
				return 2;
			case '/chat':
				return 3;
			case '/MyGuest':
				return 4;
			default:
				return 0; // 기본값
		}
	}

	return (
		<Box ref={ref}>
			<CssBaseline />
			<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
				<BottomNavigation
					showLabels
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
				>
					<BottomNavigationAction
						component={Link}
						to="/HomeGuest"
						label={<span style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}>홈</span>}
						icon={<HomeOutlinedIcon />}
						sx={{
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					/>
					<BottomNavigationAction component={Link} label="찜" to="/wish" icon={<FavoriteIcon />} />
					<BottomNavigationAction
						component={Link}
						to="/map"
						label={<span style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}>지도</span>}
						icon={<MapOutlinedIcon />}
						sx={{
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					/>
					<BottomNavigationAction
						component={Link}
						to="/chat"
						label={<span style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}>채팅</span>}
						icon={<ChatBubbleOutlineOutlinedIcon />}
						sx={{
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					/>
					<BottomNavigationAction
						component={Link}
						to="/MyGuest"
						label={<span style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}>프로필</span>}
						icon={<PersonOutlineOutlinedIcon />}
						sx={{
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					/>
				</BottomNavigation>
			</Paper>
		</Box>
	);
}
