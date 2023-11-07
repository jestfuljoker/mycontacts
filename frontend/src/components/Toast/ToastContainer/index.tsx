import { type ReactElement } from 'react';
import ToastMessage from '../ToastMessage';
import * as S from './styles';
import useToastContainer from './useToastContainer';

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
	const {
		messages,
		pendingRemovalItemsIds,
		handleRemoveItem,
		handleAnimationEnd,
	} = useToastContainer();

	function renderList() {
		return messages.map((message) => (
			<ToastMessage
				key={message.id}
				message={message}
				onRemoveMessage={handleRemoveItem}
				onAnimationEnd={handleAnimationEnd}
				isLeaving={pendingRemovalItemsIds.includes(message.id)}
			/>
		));
	}

	return <S.Container>{renderList()}</S.Container>;
}
