import type { ToastEvent } from '@components/Toast/ToastContainer/useToastContainer';

type ListenerFn<T = unknown> = (payload: T) => void;

type Listeners = {
	addtoast: ListenerFn<ToastEvent>[];
};

export default class EventManager {
	private listeners = new Map<keyof Listeners, ListenerFn[]>();

	/**
	 * Adds a listener to the specified event.
	 *
	 * @param event - The event to listen to.
	 * @param listener - The listener function to be called when the event is triggered.
	 */
	on<K extends keyof Listeners, T = Parameters<Listeners[K][0]>[0]>(
		event: K,
		listener: ListenerFn<T>,
	) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, []);
		}

		this.listeners.get(event)?.push(listener as ListenerFn);
	}

	/**
	 * Emits an event with a payload to all registered listeners.
	 *
	 * @param event - The name of the event to emit.
	 * @param payload - The payload to pass to the listeners.
	 */
	emit<K extends keyof Listeners>(
		event: K,
		payload: Parameters<Listeners[K][0]>[0],
	) {
		if (!this.listeners.has(event)) {
			return;
		}

		this.listeners.get(event)?.forEach((listener) => {
			listener(payload);
		});
	}

	/**
	 * Removes a listener for a specific event.
	 *
	 * @param event - The event to remove the listener from.
	 * @param listenerToRemove - The listener function to remove.
	 */
	removeListener<K extends keyof Listeners, T = Parameters<Listeners[K][0]>[0]>(
		event: K,
		listenerToRemove: ListenerFn<T>,
	) {
		const listeners = this.listeners.get(event);

		if (!listeners) {
			return;
		}

		const filteredListeners = listeners.filter(
			(listener) => listener !== listenerToRemove,
		);

		this.listeners.set(event, filteredListeners);
	}
}
