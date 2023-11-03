import { useState, type ReactElement, useEffect, useCallback } from 'react';
import { toastEventManager } from '@utils/toast';
import ToastMessage from '../ToastMessage';
import * as S from './styles';

export type ToastType = 'default' | 'danger' | 'success';

export interface ToastEvent {
	text: string;
	type: ToastType;
	duration?: number;
}

export type ToastEventWithId = ToastEvent & {
	id: number;
};

export default function ToastContainer(): ReactElement {
	const [messages, setMessages] = useState<ToastEventWithId[]>([]);

	useEffect(() => {
		function handleAddToast({ text, type, duration }: ToastEvent) {
			setMessages((prevState) => [
				...prevState,
				{
					id: Math.random(),
					text,
					type,
					duration,
				},
			]);
		}

		toastEventManager.on('addtoast', handleAddToast);

		return () => toastEventManager.removeListener('addtoast', handleAddToast);
	}, []);

	const handleRemoveMessage = useCallback((id: number) => {
		setMessages((prevState) =>
			prevState.filter((message) => message.id !== id),
		);
	}, []);

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
