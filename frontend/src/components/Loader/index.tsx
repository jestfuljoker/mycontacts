import ReactDOM from 'react-dom';

import { Spinner } from '@components/Spinner';
import * as S from './styles';

interface LoaderProps {
	isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
	if (!isLoading) {
		return null;
	}

	return ReactDOM.createPortal(
		<S.Overlay>
			<Spinner size={90} />
		</S.Overlay>,
		document.getElementById('loader-root')!,
	);
}
