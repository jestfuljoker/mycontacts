import type { ReactNode } from 'react';
import * as S from './styles';

interface FormGroupProps {
	children: ReactNode;
	error?: string;
	isLoading?: boolean;
}

export default function FormGroup({
	children,
	error,
	isLoading = false,
}: FormGroupProps) {
	return (
		<S.Container>
			<div className="form-item">
				{children}

				{isLoading && <div className="loader" />}
			</div>

			{error && <small>{error}</small>}
		</S.Container>
	);
}
