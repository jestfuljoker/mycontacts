import { useEffect } from 'react';
import type { ToastEventWithId } from '../ToastContainer/useToastContainer';

interface UseToastMessageProps {
	onRemoveMessage: (id: number) => void;
	message: ToastEventWithId;
}

export default function useToastMessage({
	onRemoveMessage,
	message,
}: UseToastMessageProps) {
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

	return {
		handleRemoveToast,
	};
}
