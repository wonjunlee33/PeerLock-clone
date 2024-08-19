import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from 'react-router-dom';

const StorageList = ({ storage }) => {
	const [price, setPrice] = useState(10000);
	const [dummyPrice, setDummyPrice] = useState(10000);

	useEffect(() => {
		if (storage?.storagePrice) {
			const calculatedDummyPrice = (storage.storagePrice * 1.5).toLocaleString();
			const calculatedPrice = storage.storagePrice.toLocaleString();
			setPrice(calculatedPrice);
			setDummyPrice(calculatedDummyPrice);
		}
	}, [storage]);

	// const dummyPrice = (storage?.storagePrice * 1.5).toLocaleString();
	// const price = storage?.storagePrice.toLocaleString();

	return (
		<div>
			<Link to={`/storage/detail/${storage.storageId}`} style={{ textDecoration: 'none' }}>
				<Card
					sx={{
						borderRadius: '20px',
						boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
						overflow: 'hidden',
					}}
				>
					<input type="hidden" value={storage.storageId} />
					<CardMedia
						component="img"
						height="280"
						image={storage.images[0]?.imagePath || 'https://via.placeholder.com/150'}
						alt="Placeholder Image"
					/>
					<CardContent sx={{ padding: '15px' }}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 'bold' }}>
								{storage?.storageName || 'Item Title'}
							</Typography>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<StarIcon color="primary" />
								<Typography
									variant="h6"
									sx={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '0px' }}
								>
									{storage?.star || '4.54(15)'}
								</Typography>
							</div>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Typography variant="h6" sx={{ fontSize: '14px', marginBottom: '0' }}>
								<b style={{ textDecoration: 'line-through', color: 'gray' }}>₩{dummyPrice}</b>
								&nbsp;
								{'₩' + price || '₩ 10,000'}
								<b style={{ color: 'gray' }}>&nbsp;/월(단기)</b>
							</Typography>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<LocationOnOutlinedIcon sx={{ color: 'gray' }} />
								<Typography
									variant="h6"
									sx={{ marginLeft: '0px', color: 'gray', fontSize: '14px' }}
								>
									{storage.star || '1.2km'}
								</Typography>
							</div>
						</div>
					</CardContent>
				</Card>
			</Link>
		</div>
	);
};

export default StorageList;
