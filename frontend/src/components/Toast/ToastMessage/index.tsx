import checkCircleIcon from '@assets/images/icons/check-circle.svg';
import xCircleIcon from '@assets/images/icons/x-circle.svg';
import { useEffect, useRef } from 'react';
import type { ToastEventWithId } from '../ToastContainer';
import * as S from './styles';
import useToastMessage from './useToastMessage';

export interface ToastMessageProps {
	message: ToastEventWithId;
	isLeaving: boolean;
	onRemoveMessage: (id: number) => void;
	onAnimationEnd: (id: number) => void;
}

export default function ToastMessage({
	message,
	isLeaving,
	onRemoveMessage,
	onAnimationEnd,
}: ToastMessageProps) {
	const { handleRemoveToast } = useToastMessage({
		onRemoveMessage,
		message,
	});
	const animatedElementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const elementRef = animatedElementRef.current;

		function handleAnimationEnd() {
			onAnimationEnd(message.id);
		}

		if (isLeaving) {
			elementRef?.addEventListener('animationend', handleAnimationEnd);
		}

		return () =>
			elementRef?.removeEventListener('animationend', handleAnimationEnd);
	}, [isLeaving, message.id, onAnimationEnd]);

	return (
		<S.Container
			ref={animatedElementRef}
			tabIndex={0}
			role="button"
			type={message.type}
			onClick={handleRemoveToast}
			isLeaving={isLeaving}
		>
			{message.type === 'success' && (
				<img src={checkCircleIcon} alt="Check icon" />
			)}
			{message.type === 'danger' && <img src={xCircleIcon} alt="X icon" />}

			<strong>{message.text}</strong>
		</S.Container>
	);
}
