import type { ToastType } from '@components/Toast/ToastContainer';
import EventManager from '@lib/EventManager';

interface ToastProps {
	text: string;
	type: ToastType;
}

export const toastEventManager = new EventManager();

export function toast({ text, type }: ToastProps) {
	toastEventManager.emit('addtoast', { text, type });
}
