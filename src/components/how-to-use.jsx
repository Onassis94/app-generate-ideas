import { Container, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
const HowToUse = () => {
	return (
		<Container maxWidth='md'>
			<Box
				sx={{
					fontSize: 30,
					display: '',
					gap: 8,
					mt: 15,
				}}>
				<h2>Instructions on how to use this tool</h2>
				<ol>
					<li>
						Get GPT-3 API access token from openAI, navigate to /gpt auth or
						click the navigation link AI API and put in the token
					</li>
					<li>
						<p>Get access token from Miro</p>
						<ul>
							<li>Create a Miro account if you don't have one already</li>
							<li>Create a developer team if you don't have one already</li>
							<li>Create an in-app in the development team</li>
							<li>Set permissions for the in-app</li>
							<li>Grant appropriate permissions in the Miro account</li>
							<li>
								Generate an OAuth token to authenticate API calls to the Miro
								server.
							</li>
						</ul>
					</li>
					<li>
						Navigate to the /home Page of this tool, using the navigation and
						enter the generated token from Miro
					</li>
				</ol>
			</Box>
		</Container>
	);
};
export default HowToUse;
