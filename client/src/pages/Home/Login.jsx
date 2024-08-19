import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Avatar, Paper } from '@mui/material';
import { login } from '../../api/login';

const Login = () => {
	const [username, setUsername] = useState('tt@test.com'); // 'yy@test.com' is a host user
	const [password, setPassword] = useState('1234');
	const [user, setUser] = useState('');

	const navigate = useNavigate();

	const handleLogin = (username, password) => {
		const fetch = async () => {
			try {
				const data = await login(username, password);
				setUser(data);
				console.log(data);
				localStorage.setItem('userId', data.userId);
				localStorage.setItem('userStatus', data.status);
				localStorage.setItem('userName', data.userName);
				if (data.status === 'HOST') {
					// navigate(`/homehost/${data.userId}`);
					navigate(`/homehost`);
				} else if (data.status === 'USER') {
					navigate(`/homeguest`);
					// navigate(`/homeuser/${data.userId}`);
				} else {
					navigate(`/`);
				}
			} catch (e) {
				alert('아이디 또는 비밀번호가 일치하지 않습니다.');
			}
		};
		fetch();
	};

	return (
		<div
			style={{
				minHeight: '100vh',
				maxHeight: '100vh',
				overflowX: 'hidden',
				overflowY: 'auto',
				background: 'linear-gradient(to bottom, #FFFFFF, #BDD7FE)', // Adjust gradient colors
			}}
		>
			<div
				sx={{
					display: 'flex',
					flexDirection: 'column', // To stack the elements vertically
					alignItems: 'center', // Center content horizontally
				}}
			>
				<Paper
					sx={{
						padding: 2,
						marginTop: 20,
						marginBottom: 0,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						boxShadow: 0,
						backgroundColor: 'transparent', // Override white background
					}}
				>
					<Typography
						variant="h3"
						fontWeight="bold"
						style={{
							fontFamily: 'SpoqaHanSansNeo-Bold',
						}}
					>
						<strong>PeerLock</strong>
					</Typography>
				</Paper>
				<Paper
					sx={{
						padding: 2,
						marginBottom: 0,
						paddingLeft: 3.5,
						paddingRight: 3.5,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						boxShadow: 0,
						backgroundColor: 'transparent', // Override white background
					}}
				>
					<TextField
						label="아이디"
						variant="outlined"
						margin="dense"
						fullWidth
						value={username}
						onChange={event => setUsername(event.target.value)}
					/>
					<TextField
						label="비밀번호"
						type="password"
						variant="outlined"
						margin="dense"
						fullWidth
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>

					{/* Login Button */}
					<Button
						variant="contained"
						sx={{
							marginTop: 2,
							borderRadius: 2,
							backgroundColor: '#000000',
							'&:hover': {
								backgroundColor: '#A9A9A9', // Set the same color as default
							},
						}}
						style={{
							fontFamily: 'SpoqaHanSansNeo-Medium',
						}}
						fullWidth
						onClick={() => handleLogin(username, password)}
						// onClick={() => navigate('/HomeHost')}
					>
						Login
					</Button>
				</Paper>
				<Paper
					sx={{
						padding: 2,
						display: 'flex',
						textDecoration: 'underline',
						boxShadow: 0,
						alignItems: 'center',
						backgroundColor: 'transparent', // Override white background
					}}
				>
					<Typography variant="body1" color={'black'} sx={{ marginLeft: 2 }}>
						<a
							href="#"
							style={{
								textDecoration: 'none',
								color: 'black',
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							회원가입
						</a>{' '}
						{/* Replace with real link */}
					</Typography>
					<Typography variant="body1" color={'black'} sx={{ marginLeft: 14 }}>
						<a
							href="#"
							style={{
								textDecoration: 'none',
								color: 'black',
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							아이디 / 비밀번호 찾기
						</a>{' '}
						{/* Replace with real link */}
					</Typography>
				</Paper>
				{/* Thin Line */}
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '16px',
					}}
				>
					<div
						style={{
							width: '85%',
							height: 1,
							backgroundColor: '#000000',
						}}
					/>
				</div>
				<div>
					<Paper
						sx={{
							padding: 1,
							boxShadow: 0,
							backgroundColor: 'transparent', // Override white background
						}}
					>
						<Typography
							variant="h6"
							fontSize={15}
							textAlign={'center'}
							style={{
								fontFamily: 'SpoqaHanSansNeo-Medium',
							}}
						>
							<strong>간편 로그인</strong>
						</Typography>
					</Paper>
					<span
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							alignItems: 'center',
							marginTop: 5,
						}}
					>
						<Avatar>
							<a href="#">
								<img
									src="/naver.png"
									alt="Naver"
									style={{ width: '100%', height: '100%', objectFit: 'contain' }}
								/>
							</a>
						</Avatar>
						<Avatar>
							<a href="#">
								<img
									src="/kakao.png"
									alt="Kakao"
									style={{ width: '100%', height: '100%', objectFit: 'contain' }}
								/>
							</a>
						</Avatar>
						<Avatar>
							<a href="#">
								<img
									src="/google1.png"
									alt="Google"
									style={{ width: '100%', height: '100%', objectFit: 'contain' }}
								/>
							</a>
						</Avatar>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Login;
