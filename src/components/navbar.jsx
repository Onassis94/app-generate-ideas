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
				<Link to='/how-to-use'>How To Use</Link>
			</span>
			<span>
				<Link to='/gpt-auth'>AI API</Link>
			</span>
		</Box>
	);
};
export default NavBar;
