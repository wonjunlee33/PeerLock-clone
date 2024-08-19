import { Suspense } from 'react';
import './styles/app.scss';
import GlobalStyles from './GlobalStyles';
import { Routes } from './pages/Routes';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

function Layout({ children }) {
	return (
		<div
			css={css`
				width: 100%;
				max-width: 1200px;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: auto;
				overflow-y: auto;
				// display: flex;
				// flex-direction: column;
				// justify-content: flex-start;
				// align-items: flex-start;
			`}
		>
			{children}
		</div>
	);
}
function App() {
	return (
		<>
			<GlobalStyles />
			<Layout>
				<Suspense
					fallback={
						<Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
							<CircularProgress />
						</Box>
					}
				>
					<Routes />
				</Suspense>
			</Layout>
		</>
	);
}

export default App;
