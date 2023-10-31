import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { Spinner } from '@components/Spinner';
import * as S from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	danger?: boolean;
	children: ReactNode;
}

export default function Button({
	isLoading,
	danger,
	children,
	disabled,
	...props
}: ButtonProps): ReactElement {
	return (
		<S.Button {...props} disabled={isLoading || disabled} danger={danger}>
			{!isLoading ? children : <Spinner size={16} />}
		</S.Button>
	);
}
