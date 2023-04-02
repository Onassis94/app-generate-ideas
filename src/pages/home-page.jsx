import * as React from 'react';
import { Button, Container } from '@mui/material';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { authState } from '../state/state';
import DisplayBoards from '../components/display-boards';

const HomePage = () => {
	const [boards, setBoards] = React.useState();
	const [auth, setAuth] = useRecoilState(authState);
	const [error, setError] = React.useState(false);
	const getBoards = () => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				authorization: `Bearer ${auth}`,
			},
		};
		fetch('https://api.miro.com/v2/boards?sort=default', options)
			.then((response) => response.json())
			.then((response) => {
				setBoards(response);
			})
			.catch((err) => {
				setError(true);
			});
	};

	if (error) {
		return <div>There was an error please try again</div>;
	}

	return (
		<Container maxWidth='md'>
			<Box mt={15}>
				<Box mb={5} textAlign='center' fontSize={30}>
					Web Tool to add Computer-generated ideas to Miro Boards{' '}
				</Box>
				<TextField
					placeholder='Enter your Miro authentification token here'
					id='outline-basic'
					onChange={(e) => {
						setAuth(e.target.value);
					}}
					minRows={1}
					multiline
					fullWidth
				/>
				<Box mt={8} display='flex' flexDirection={'column'}>
					<Button
						size='large'
						disabled={!auth}
						variant='contained'
						onClick={getBoards}>
						Click to get boards from Miro
					</Button>
				</Box>
				{boards && (
					<Box mt={5} textAlign='center' fontSize={18}>
						You have currently {boards.size} boards . Please select one to use{' '}
					</Box>
				)}
				<Box
					mt={8}
					display={'flex'}
					flexDirection={'column'}
					textAlign='center'>
					{boards &&
						boards.data.map((board) => (
							<DisplayBoards id={board.id} name={board.name} />
						))}
				</Box>
			</Box>
		</Container>
	);
};

export default HomePage;
