import { useCallback, useState } from 'react';

interface FormFieldError {
	field: string;
	message: string;
}

export default function useErrors() {
	const [errors, setErrors] = useState<FormFieldError[]>([]);

	const setError = useCallback(
		({ field, message }: FormFieldError) => {
			const errorAlreadyExists = errors.find((error) => error.field === field);

			if (errorAlreadyExists) {
				return;
			}

			setErrors((prevState) => [
				...prevState,
				{
					field,
					message,
				},
			]);
		},
		[errors],
	);

	const removeError = useCallback((fieldName: string) => {
		setErrors((prevState) =>
			prevState.filter((error) => error.field !== fieldName),
		);
	}, []);

	const getErrorMessageByFieldName = useCallback(
		(fieldName: string) =>
			errors.find((error) => error.field === fieldName)?.message,
		[errors],
	);

	return {
		setError,
		removeError,
		getErrorMessageByFieldName,
		errors,
	};
}
