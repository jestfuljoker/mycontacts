import { useState, type ReactElement, useEffect } from 'react';
import { toastEventManager } from '@utils/toast';
import ToastMessage from '../ToastMessage';
import * as S from './styles';

export type ToastType = 'default' | 'danger' | 'success';

export interface MessageTypes {
	id: number;
	text: string;
	type: ToastType;
}

export interface ToastEvent {
	text: string;
	type: ToastType;
}

export default function ToastContainer(): ReactElement {
	const [messages, setMessages] = useState<MessageTypes[]>([]);

	useEffect(() => {
		function handleAddToast({ text, type }: ToastEvent) {
			setMessages((prevState) => [
				...prevState,
				{
					id: Math.random(),
					text,
					type,
				},
			]);
		}

		toastEventManager.on('addtoast', handleAddToast);

		return () => toastEventManager.removeListener('addtoast', handleAddToast);
	}, []);

	function handleRemoveMessage(id: number) {
		setMessages((prevState) =>
			prevState.filter((message) => message.id !== id),
		);
	}

	return (
		<S.Container>
			{messages.map((message) => (
				<ToastMessage
					key={message.id}
					message={message}
					onRemoveMessage={handleRemoveMessage}
				/>
			))}
		</S.Container>
	);
}
