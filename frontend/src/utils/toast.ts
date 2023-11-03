import type { ToastEvent } from '@components/Toast/ToastContainer';
import EventManager from '@lib/EventManager';

export const toastEventManager = new EventManager();

export function toast({ text, type, duration }: ToastEvent) {
	toastEventManager.emit('addtoast', { text, type, duration });
}
