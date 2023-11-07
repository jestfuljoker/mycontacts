import useAnimatedList from '@hooks/useAnimatedList';
import { toastEventManager } from '@utils/toast';
import { useEffect } from 'react';

export type ToastType = 'default' | 'danger' | 'success';

export interface ToastEvent {
	text: string;
	type: ToastType;
	duration?: number;
}

export type ToastEventWithId = ToastEvent & {
	id: number;
};

export default function useToastContainer() {
	const {
		setItems: setMessages,
		renderList,
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
		renderList,
		handleRemoveItem,
		handleAnimationEnd,
	};
}
