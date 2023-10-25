import type { ReactNode } from 'react';
import * as S from './styles';

interface FormGroupProps {
	children: ReactNode;
	error?: string;
}

export default function FormGroup({ children, error }: FormGroupProps) {
	return (
		<S.Container>
			{children}
			{error && <small>{error}</small>}
		</S.Container>
	);
}
