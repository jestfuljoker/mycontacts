import ReactPortal from '@components/ReactPortal';
import { Spinner } from '@components/Spinner';
import * as S from './styles';

interface LoaderProps {
	isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
	if (!isLoading) {
		return null;
	}

	return (
		<ReactPortal containerId="loader-root">
			<S.Overlay>
				<Spinner size={90} />
			</S.Overlay>
		</ReactPortal>
	);
}
