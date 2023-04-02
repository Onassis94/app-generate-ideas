import * as React from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { authState, gptAuth } from '../state/state';

const Gpt = () => {
	const [auth, setAuth] = useRecoilState(gptAuth);
	return (
		<Container maxWidth='md'>
			<Box mt={15}>
				<Box mb={5} textAlign='center' fontSize={30}>
					Web Tool to add Computer-generated ideas to Miro Boards{' '}
				</Box>
				<TextField
					placeholder='Enter your gpt authentification token here'
					id='outline-basic'
					onChange={(e) => {
						setAuth(e.target.value);
					}}
					minRows={1}
					multiline
					fullWidth
				/>
			</Box>
		</Container>
	);
};

export default Gpt;
