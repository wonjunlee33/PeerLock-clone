import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const TopNavigationComponent = ({ centerText, backClick, onBackClick, rightMenu }) => {
	return (
		<AppBar position="fixed" elevation={0} sx={{ backgroundColor: 'white' }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{backClick ? (
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={onBackClick}
								color="black"
							>
								<ArrowBackIosNewIcon sx={{ color: 'black' }} />
							</IconButton>
						</Box>
					) : (
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<ArrowBackIosNewIcon sx={{ color: 'white' }} />
						</Box>
					)}
					{centerText && (
						<Typography
							variant="h6"
							noWrap
							sx={{
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'SpoqaHanSansNeo-Bold',
								fontWeight: 700,
								color: 'black',
								textDecoration: 'none',
							}}
						>
							{centerText}
						</Typography>
					)}
					<Box sx={{ flexGrow: 0 }}>
						{rightMenu ? (
							<Tooltip title="Open settings">
								<IconButton sx={{ p: 0 }}>
									<NotificationsNoneIcon fontSize="medium" sx={{ color: 'black' }} />
								</IconButton>
							</Tooltip>
						) : (
							<Box>
								<NotificationsNoneIcon fontSize="medium" sx={{ color: 'white' }} />
							</Box>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default TopNavigationComponent;
