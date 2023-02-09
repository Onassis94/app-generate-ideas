import * as React from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import Button from '@mui/material/Button';
import { LinearProgress, TextField } from '@mui/material';
import { Container, Box } from '@mui/system';

// use user input and concantenate user input
const prompt = 'generate 3 ideas for a YouTube video';

// Make the API call

const App = () => {
	// React.useEffect(() => {
	// 	generateIdeas();
	// }, []);
	const [ideas, setIdeas] = React.useState([]);
	const [isActivated, setIsActivated] = React.useState(false);
	const [promptData, setPromptData] = React.useState('');
	const [linear, setLinear] = React.useState(false);
	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			authorization:
				'Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_P49rjoPPIDRzD4edjuDzrDTaGOs',
		},
		body: JSON.stringify({
			data: { content: ideas, shape: 'square' },
			position: { x: 100, y: 100 },
		}),
	};
	function addStickyNote() {
		ideas.forEach((idea) => {
			fetch('https://api.miro.com/v2/boards/uXjVPv6nqgY%3D/sticky_notes', {
				method: 'POST',
				headers: {
					accept: 'application/json',
					'content-type': 'application/json',
					authorization:
						'Bearer eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_P49rjoPPIDRzD4edjuDzrDTaGOs',
				},
				body: JSON.stringify({
					data: { content: idea, shape: 'square' },
					position: { x: 100, y: 100 },
				}),
			})
				.then((response) => response.json())
				.then((data) => console.log(data));
		});
	}
	function generateIdeas() {
		setLinear(true);
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
						Authorization: `Bearer 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`,
					},
				}
			)
			.then((response) => {
				const data = checkNewLine(response.data.choices[0].text);
				console.log(data);
				// Print the generated ideas
				setIdeas(data);
				setIsActivated(true);
				setLinear(false);
			})
			.catch((error) => {
				setIdeas(error);
			});
	}

	function checkNewLine(ideas) {
		let newLine = ideas.split('\n');
		newLine = newLine.filter((idea) => idea !== '');
		console.log(newLine);
		return newLine;
	}

	return (
		<Box>
			<Container maxWidth='md'>
				<Box mt={20}>
					<Box mb={5} textAlign='center' fontSize={30}>
						Web Tool to add Computer-generated ideas to Miro Boards{' '}
					</Box>
					<TextField
						onChange={(e) => {
							setPromptData(e.target.value);
						}}
						multiline
						minRows={4}
						fullWidth
					/>
				</Box>
				<Box mt={10} display='flex' gap={6} justifyContent='center'>
					<Button variant='contained' onClick={addStickyNote}>
						click me to add sticky notes
					</Button>
					<Button variant='contained' onClick={generateIdeas}>
						click me to generate ideas
					</Button>
				</Box>
				<Box mt={5}>
					{isActivated ? 'your ideas have been generated' : <LinearProgress />}
				</Box>
			</Container>
		</Box>
	);
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
