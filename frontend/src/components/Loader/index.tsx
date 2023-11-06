import ReactPortal from '@components/ReactPortal';
import { Spinner } from '@components/Spinner';
import useAnimatedUnmount from '@hooks/useAnimatedUnmount';
import * as S from './styles';

interface LoaderProps {
	isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
	const { elementRef, shouldRender } = useAnimatedUnmount(isLoading);

	return shouldRender ? (
		<ReactPortal containerId="loader-root">
			<S.Overlay isLeaving={!isLoading} ref={elementRef}>
				<Spinner size={90} />
			</S.Overlay>
		</ReactPortal>
	) : null;
}
