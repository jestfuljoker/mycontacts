import { toastEventManager } from '@utils/toast';
import { useState, useEffect, useCallback } from 'react';
import type { ToastEventWithId, ToastEvent } from '.';

export default function useToastContainer() {
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

	return {
		messages,
		handleRemoveMessage,
	};
}
