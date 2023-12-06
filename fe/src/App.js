import { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';
import axios from 'axios';
import Title from './Components/Title';
import TeamList from './Components/TeamList';
import Board from './Components/Board';
import Notes from './Components/Notes';
import Footer from './Components/Footer';
import { useCustomContext } from './Context';

function App() {
    const { init } = useCustomContext();

    useEffect(() => {
		init();
    }, []);

	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Title />
				<TeamList />
				<Board />
				<Notes />
				<Footer />
			</Container>
		</ThemeProvider>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: #ecf5fd;
	align-items: center;
	padding: 0 4% 64px;
	& > * + * {
		margin-top: 32px;
		
		@media (max-width: 560px) {
            margin-top: 16px;
        }
	}
`;

export default App;
