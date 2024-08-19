import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	background-color: #f5faff;
	padding: 20px;
	font-size: 24px;
	font-weight: bold;
	text-align: center;
`;

const AppHeader = ({ title }) => {
	return <HeaderContainer>{title}</HeaderContainer>;
};

export default AppHeader;
