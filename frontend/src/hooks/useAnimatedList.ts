import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';

type RenderItemContext = { isLeaving: boolean };

type RenderItemFn<T> = (item: T, context: RenderItemContext) => ReactElement;

export default function useAnimatedList<T extends { id: number }>(
	initialValue: T[] = [],
) {
	const [items, setItems] = useState<T[]>(initialValue);
	const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<
		number[]
	>([]);

	const handleRemoveItem = useCallback((id: number) => {
		setPendingRemovalItemsIds((prevState) => [...prevState, id]);
	}, []);

	const handleAnimationEnd = useCallback((id: number) => {
		setItems((prevState) => prevState.filter((item) => item.id !== id));

		setPendingRemovalItemsIds((prevState) =>
			prevState.filter((itemId) => itemId !== id),
		);
	}, []);

	const renderList = useCallback(
		(renderItem: RenderItemFn<T>) =>
			items.map((item) =>
				renderItem(item, {
					isLeaving: pendingRemovalItemsIds.includes(item.id),
				}),
			),
		[items, pendingRemovalItemsIds],
	);

	return {
		items,
		setItems,
		renderList,
		handleRemoveItem,
		handleAnimationEnd,
	};
}
