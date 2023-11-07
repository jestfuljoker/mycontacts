import type { ReactElement, RefObject } from 'react';
import { createRef, useCallback, useEffect, useRef, useState } from 'react';

type RenderItemContext = {
	isLeaving: boolean;
	animatedRef: RefObject<HTMLDivElement>;
};

type RenderItemFn<T> = (item: T, context: RenderItemContext) => ReactElement;

export default function useAnimatedList<T extends { id: number }>(
	initialValue: T[] = [],
) {
	const [items, setItems] = useState<T[]>(initialValue);
	const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<
		number[]
	>([]);

	const animatedRefs = useRef(new Map<number, RefObject<HTMLDivElement>>());
	const animationEndListeners = useRef(new Map<number, () => void>());

	const handleAnimationEnd = useCallback((itemId: number) => {
		const removeListener = animationEndListeners.current.get(itemId);
		removeListener?.();

		animationEndListeners.current.delete(itemId);
		animatedRefs.current.delete(itemId);

		setItems((prevState) => prevState.filter((item) => item.id !== itemId));

		setPendingRemovalItemsIds((prevState) =>
			prevState.filter((id) => id !== itemId),
		);
	}, []);

	useEffect(() => {
		pendingRemovalItemsIds.forEach((itemId) => {
			const animatedRef = animatedRefs.current.get(itemId);
			const animatedElement = animatedRef?.current;
			const alreadyHasListener = animationEndListeners.current.has(itemId);

			if (animatedElement && !alreadyHasListener) {
				const onAnimationEnd = () => handleAnimationEnd(itemId);
				const removeListener = () =>
					animatedElement.removeEventListener('animationend', onAnimationEnd);

				animatedElement.addEventListener('animationend', onAnimationEnd);
				animationEndListeners.current.set(itemId, removeListener);
			}
		});
	}, [handleAnimationEnd, pendingRemovalItemsIds]);

	useEffect(() => {
		const removeListeners = animationEndListeners.current;

		return () => {
			removeListeners.forEach((removeListener) => {
				removeListener();
			});
		};
	}, []);

	const handleRemoveItem = useCallback((itemId: number) => {
		setPendingRemovalItemsIds((prevState) => [...prevState, itemId]);
	}, []);

	const getAnimatedRef = useCallback((itemId: number) => {
		let animatedRef = animatedRefs.current.get(itemId);

		if (!animatedRef) {
			animatedRef = createRef<HTMLDivElement>();
			animatedRefs.current.set(itemId, animatedRef);
		}

		return animatedRef;
	}, []);

	const renderList = useCallback(
		(renderItem: RenderItemFn<T>) =>
			items.map((item) => {
				const animatedRef = getAnimatedRef(item.id);

				return renderItem(item, {
					isLeaving: pendingRemovalItemsIds.includes(item.id),
					animatedRef,
				});
			}),
		[getAnimatedRef, items, pendingRemovalItemsIds],
	);

	return {
		items,
		setItems,
		renderList,
		handleRemoveItem,
	};
}
