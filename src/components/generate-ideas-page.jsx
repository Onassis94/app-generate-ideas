import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { LinearProgress, TextField } from '@mui/material';
import { Container, Box } from '@mui/system';
import { useRecoilValue } from 'recoil';
import { authState, boardIdState, gptAuth } from '../state/state';

const GenerateIdeaPage = () => {
	const [ideas, setIdeas] = React.useState([]);
	const [isActivated, setIsActivated] = React.useState(false);
	const [isIdeasAdded, setIsIdeasAdded] = React.useState(false);
	const [promptData, setPromptData] = React.useState('');
	const [linear, setLinear] = React.useState(false);
	const auth = useRecoilValue(authState);
	const aiAuth = useRecoilValue(gptAuth);
	const boardId = useRecoilValue(boardIdState);
	const [error, setError] = React.useState(false);

	const addStickyNote = () => {
		setIsActivated(false);
		ideas.forEach((idea, index) => {
			const position = { x: (index + 3) * 180, y: 150 };
			fetch(`https://api.miro.com/v2/boards/${boardId}/sticky_notes`, {
				method: 'POST',
				headers: {
					accept: 'application/json',
					'content-type': 'application/json',
					authorization: `Bearer ${auth}`,
				},
				body: JSON.stringify({
					data: { content: idea, shape: 'square' },
					position: position,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setIsIdeasAdded(true);
				})
				.catch((err) => {
					console.log(err);
					setError(true);
				});
		});
	};
	const generateIdeas = () => {
		setLinear(true);
		setIsIdeasAdded(false);
		axios
			.post(
				'https://api.openai.com/v1/engines/text-davinci-002/completions',
				{
					prompt: promptData,
					max_tokens: 1024,
					temperature: 0.7,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `${aiAuth}`,
					},
				}
			)
			.then((response) => {
				const data = checkNewLine(response.data.choices[0].text);
				setIdeas(data);
				setIsActivated(true);
				setLinear(false);
			})
			.catch((error) => {
				setIdeas(error.message);
			});
	};

	const checkNewLine = (ideas) => {
		let newLine = ideas.split('\n');
		newLine = newLine.filter((idea) => idea !== '');
		console.log(newLine);
		return newLine;
	};

	if (error) return <div>Something went wrong, try again</div>;

	return (
		<Box>
			<Container maxWidth='md'>
				<Box mt={15}>
					<Box mb={5} textAlign='center' fontSize={30}>
						Web Tool to add Computer-generated ideas to Miro Boards{' '}
					</Box>
					{linear ? (
						<LinearProgress />
					) : (
						<TextField
							placeholder='Please enter your theme here. Eg. Generate 5 ideas to make the world a better place'
							onChange={(e) => {
								setPromptData(e.target.value);
							}}
							multiline
							minRows={4}
							fullWidth
						/>
					)}
				</Box>
				<Box
					mt={10}
					display='flex'
					flexDirection={'column'}
					gap={6}
					justifyContent='center'>
					<Button
						variant='contained'
						disabled={!promptData}
						onClick={generateIdeas}>
						click to generate ideas
					</Button>
					<Box mt={5} fontSize={30} textAlign='center'>
						{isActivated
							? 'Nice, Your ideas have been generated. Click the button below to add them to your miro board'
							: ''}
					</Box>
					<Button
						disabled={linear || !promptData}
						variant='contained'
						onClick={addStickyNote}>
						click to add sticky notes to miro board
					</Button>
					<Box mt={5} fontSize={30} textAlign='center'>
						{isIdeasAdded & !linear
							? 'Nice, Your ideas have been added to your miro board. You can now close this tab'
							: ''}
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default GenerateIdeaPage;
