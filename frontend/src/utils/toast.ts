import type { ToastType } from '@components/Toast/ToastContainer';

interface ToastProps {
	text: string;
	type: ToastType;
}

export function toast({ text, type }: ToastProps) {
	const event = new CustomEvent('addtoast', {
		detail: { text, type },
	});

	document.dispatchEvent(event);
}
