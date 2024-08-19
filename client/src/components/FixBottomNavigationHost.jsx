import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Paper from '@mui/material/Paper';
import { Link, useLocation } from 'react-router-dom';

export default function FixedBottomNavigationHost() {
	const location = useLocation();
	const initialValue = getInitialValue(location.pathname);
	const [value, setValue] = React.useState(initialValue);
	const ref = React.useRef(null);

	function getInitialValue(path) {
		switch (path) {
			case '/HomeHost':
				return 0;
			case '/mystorage':
				return 1;
			case '/finance':
				return 2;
			case '/ChatHost':
				return 3;
			case '/MyHost':
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
						to="/HomeHost"
						label={<span style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}>홈</span>}
						icon={<HomeOutlinedIcon />}
					/>
					<BottomNavigationAction
						component={Link}
						label={<span style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}>창고</span>}
						to="/mystorage"
						icon={<WidgetsIcon />}
					/>
					<BottomNavigationAction
						component={Link}
						to="/finance"
						label={<span style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}>통계</span>}
						icon={<LeaderboardIcon />}
						sx={{
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					/>
					<BottomNavigationAction
						component={Link}
						to="/ChatHost"
						label={<span style={{ fontFamily: 'SpoqaHanSansNeo-Bold' }}>채팅</span>}
						icon={<ChatBubbleOutlineOutlinedIcon />}
					/>
					<BottomNavigationAction
						component={Link}
						to="/MyHost"
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
