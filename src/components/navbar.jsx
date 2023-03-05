import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
	return (
		<Box
			sx={{
				fontSize: 30,
				display: 'flex',
				gap: 8,
			}}>
			<span color={'white !important'}>
				<Link to='/'>Home</Link>
			</span>
			<span>
				<Link to='/idea-generation-tool'>Idea Generation Tool</Link>
			</span>
			<span>
				<Link to='/todo'>How To Use</Link>
			</span>
		</Box>
	);
};
export default NavBar;
