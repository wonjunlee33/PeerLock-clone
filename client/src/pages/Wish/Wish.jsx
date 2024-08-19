import React, { useState, useEffect } from 'react';
import FixedBottomNavigation from '../../components/FixBottomNavigation';
import { getWishList } from '../../api/getWishList';
import { CircularProgress, Grid } from '@mui/material';
import WishList from '../../components/wish/WishList';
import TopNavigationComponent from '../../components/common/TopNavigationComponent';
const Wish = () => {
	const [loading, setLoading] = useState(true);
	const [wishList, setWishList] = useState(true);

	useEffect(() => {
		const fetch = async () => {
			const data = await getWishList();
			setWishList(data);
			setLoading(false);
		};
		fetch();
	}, []);

	return (
		<div>
			<TopNavigationComponent centerText="찜" />
			{loading ? (
				<div
					style={{
						display: 'flex',
						marginTop: '100px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<CircularProgress />
				</div>
			) : (
				<div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
					<div style={{ paddingBottom: '50px', paddingTop: '50px' }}>
						<Grid container spacing={3} style={{ padding: '20px' }}>
							{wishList.map(item => (
								<Grid item xs={12} key={item.storageId}>
									<WishList storage={item} />
								</Grid>
							))}
						</Grid>
					</div>
					<div>
						<FixedBottomNavigation />
					</div>
				</div>
			)}
			<FixedBottomNavigation />
		</div>
	);
};

export default Wish;
