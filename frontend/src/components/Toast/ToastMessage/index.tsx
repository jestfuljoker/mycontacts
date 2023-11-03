import checkCircleIcon from '@assets/images/icons/check-circle.svg';
import xCircleIcon from '@assets/images/icons/x-circle.svg';
import type { ReactElement } from 'react';
import type { MessageTypes } from '../ToastContainer';
import * as S from './styles';

export interface ToastMessageProps {
	message: MessageTypes;
	onRemoveMessage: (id: number) => void;
}

export default function ToastMessage({
	message,
	onRemoveMessage,
}: ToastMessageProps): ReactElement {
	function handleRemoveToast() {
		onRemoveMessage(message.id);
	}

	return (
		<S.Container type={message.type} onClick={handleRemoveToast}>
			{message.type === 'success' && (
				<img src={checkCircleIcon} alt="Check icon" />
			)}
			{message.type === 'danger' && <img src={xCircleIcon} alt="X icon" />}

			<strong>{message.text}</strong>
		</S.Container>
	);
}
