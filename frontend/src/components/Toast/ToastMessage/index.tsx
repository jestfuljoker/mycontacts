import checkCircleIcon from '@assets/images/icons/check-circle.svg';
import xCircleIcon from '@assets/images/icons/x-circle.svg';
import { useEffect, type ReactElement } from 'react';
import type { ToastEventWithId } from '../ToastContainer';
import * as S from './styles';

export interface ToastMessageProps {
	message: ToastEventWithId;
	onRemoveMessage: (id: number) => void;
}

export default function ToastMessage({
	message,
	onRemoveMessage,
}: ToastMessageProps): ReactElement {
	useEffect(() => {
		const timeoutId = setTimeout(
			() => onRemoveMessage(message.id),
			message.duration || 7000,
		);

		return () => clearTimeout(timeoutId);
	}, [message, onRemoveMessage]);

	function handleRemoveToast() {
		onRemoveMessage(message.id);
	}

	return (
		<S.Container
			tabIndex={0}
			role="button"
			type={message.type}
			onClick={handleRemoveToast}
		>
			{message.type === 'success' && (
				<img src={checkCircleIcon} alt="Check icon" />
			)}
			{message.type === 'danger' && <img src={xCircleIcon} alt="X icon" />}

			<strong>{message.text}</strong>
		</S.Container>
	);
}
