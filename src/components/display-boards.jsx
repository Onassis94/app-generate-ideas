import { useRecoilState } from 'recoil';
import { boardIdState } from '../state/state';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

const DisplayBoards = ({ id, name }) => {
	const [boardId, setBoardId] = useRecoilState(boardIdState);

	const navigate = useNavigate();
	const handleClick = (id) => {
		setBoardId(id);
		console.log(id);
		navigate(`/idea-generation-tool`);
	};
	return (
		<Box mt={1}>
			<Button size='large' onClick={() => handleClick(id)} variant='text'>
				{name}
			</Button>
		</Box>
	);
};

export default DisplayBoards;
