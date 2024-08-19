import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const SquareImage = ({ src, alt }) => {
	return (
		<div style={{ width: '50px', height: '50px', overflow: 'hidden' }}>
			<img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
		</div>
	);
};

const ChatList = ({ chats }) => {
	return (
		<List>
			<Box style={{ paddingBottom: '50px', paddingTop: '60px' }}>
				{chats.map((chat, index) => (
					<React.Fragment key={index}>
						<div style={{ width: '100%', boxSizing: 'border-box' }}>
							<ListItemButton component={Link} to={`${chat.path}`}>
								<ListItemAvatar>
									<Avatar>
										<img src={chat.profileImage} alt="Profile" width="40" height="40" />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={chat.username} secondary={chat.lastMessage} />
								<div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
									<SquareImage src={chat.chatImage} alt="Chat" />
								</div>
							</ListItemButton>
							{index !== chats.length && <Divider />}
						</div>
					</React.Fragment>
				))}
			</Box>
		</List>
	);
};

export default ChatList;
