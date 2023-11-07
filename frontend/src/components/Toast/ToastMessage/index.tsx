import checkCircleIcon from '@assets/images/icons/check-circle.svg';
import xCircleIcon from '@assets/images/icons/x-circle.svg';
import type { ToastEventWithId } from '@components/Toast/ToastContainer/useToastContainer';
import type { RefObject } from 'react';
import * as S from './styles';
import useToastMessage from './useToastMessage';

export interface ToastMessageProps {
	message: ToastEventWithId;
	isLeaving: boolean;
	onRemoveMessage: (id: number) => void;
	animatedRef: RefObject<HTMLDivElement>;
}

export default function ToastMessage({
	message,
	isLeaving,
	onRemoveMessage,
	animatedRef,
}: ToastMessageProps) {
	const { handleRemoveToast } = useToastMessage({
		onRemoveMessage,
		message,
	});

	return (
		<S.Container
			ref={animatedRef}
			tabIndex={0}
			role="button"
			type={message.type}
			onClick={handleRemoveToast}
			isLeaving={isLeaving}
		>
			{message.type === 'success' && (
				<img src={checkCircleIcon} alt="Check icon" />
			)}
			{message.type === 'danger' && <img src={xCircleIcon} alt="X icon" />}

			<strong>{message.text}</strong>
		</S.Container>
	);
}
