import GlobalStyles from '@assets/styles/global';
import defaultTheme from '@assets/styles/themes/default';
import Header from '@components/Header';
import ToastContainer from '@components/Toast/ToastContainer';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Routes from '../../Routes';
import * as S from './styles';

export default function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={defaultTheme}>
				<ToastContainer />

				<GlobalStyles />

				<S.Container>
					<Header />
					<Routes />
				</S.Container>
			</ThemeProvider>
		</BrowserRouter>
	);
}
