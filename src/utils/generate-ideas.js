import axios from 'axios';

function checkNewLine(ideas) {
	let newLine = ideas.split('\n');
	newLine = newLine.filter((idea) => idea !== '');
	console.log(newLine);
	return newLine;
}
export const generateIdeas = (setLinear, setIdeas, setIsActivated) => {
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
			console.log(error.message);
			setIdeas(error.message);
		});
};
