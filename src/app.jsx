import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GenerateIdeasPage from './pages/generate-idea-page';
import Navbar from './pages/navbar';
import HomePage from './pages/home-page';
import { Box } from '@mui/system';
import HowToUsePage from './pages/how-to-use-page';
import GptPage from './pages/gpt-page';

const App = () => {
	return (
		<Box
			backgroundColor={'white'}
			fontWeight={600}
			fontFamily='monospace'
			height={'100vh'}>
			<RecoilRoot>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route
							path='idea-generation-tool'
							element={<GenerateIdeasPage />}
						/>
						<Route path='how-to-use' element={<HowToUsePage />} />
						<Route path='gpt-auth' element={<GptPage />} />
					</Routes>
				</BrowserRouter>
			</RecoilRoot>
		</Box>
	);
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
