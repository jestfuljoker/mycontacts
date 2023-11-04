import type { SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import { useIsMounted } from './useIsMounted';

export function useSafeAsyncState<T>(initialState: T): [T, (value: T) => void] {
	const [state, setState] = useState<T>(initialState);
	const isMounted = useIsMounted();

	const setSafeAsyncState = useCallback(
		(value: SetStateAction<T>) => {
			if (isMounted()) {
				setState(value);
			}
		},
		[isMounted],
	);

	return [state, setSafeAsyncState];
}
