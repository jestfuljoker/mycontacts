import ReactDOM from 'react-dom';

import { Overlay } from './styles';

interface LoaderProps {
	isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
	if (!isLoading) {
		return null;
	}

	return ReactDOM.createPortal(
		<Overlay>
			<div className="loader" />
		</Overlay>,
		document.getElementById('loader-root')!,
	);
}
