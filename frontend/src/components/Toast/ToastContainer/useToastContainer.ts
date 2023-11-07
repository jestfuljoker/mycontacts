import useAnimatedList from '@hooks/useAnimatedList';
import { toastEventManager } from '@utils/toast';
import { useEffect } from 'react';
import type { ToastEvent, ToastEventWithId } from '.';

export default function useToastContainer() {
	const {
		items: messages,
		pendingRemovalItemsIds,
		setItems: setMessages,
		handleRemoveItem,
		handleAnimationEnd,
	} = useAnimatedList<ToastEventWithId>();

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
	}, [setMessages]);

	return {
		messages,
		pendingRemovalItemsIds,
		handleAnimationEnd,
		handleRemoveItem,
	};
}
