type OmitSelected<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type PartialBy<T, K extends keyof T> = OmitSelected<T, K> &
	Partial<Pick<T, K>>;
