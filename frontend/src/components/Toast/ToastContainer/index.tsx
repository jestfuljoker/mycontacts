import { useState, type ReactElement, useEffect } from 'react';
import ToastMessage from '../ToastMessage';
import * as S from './styles';

export type ToastType = 'default' | 'danger' | 'success';

interface MessageTypes {
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
		function handleAddToast(event: Event) {
			const { text, type } = (event as CustomEvent<ToastEvent>).detail;

			setMessages((prevState) => [
				...prevState,
				{
					id: Math.random(),
					text,
					type,
				},
			]);
		}

		document.addEventListener('addtoast', handleAddToast);

		return () => document.removeEventListener('addtoast', handleAddToast);
	}, []);

	return (
		<S.Container>
			{messages.map((message) => (
				<ToastMessage
					key={message.id}
					text={message.text}
					type={message.type}
				/>
			))}
		</S.Container>
	);
}
