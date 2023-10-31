import type { ReactElement } from 'react';
import xCircleIcon from '@assets/images/icons/x-circle.svg';
import checkCircleIcon from '@assets/images/icons/check-circle.svg';
import * as S from './styles';

export interface ToastMessageProps {
	text: string;
	type?: 'success' | 'danger' | 'default';
}

export default function ToastMessage({
	text,
	type = 'default',
}: ToastMessageProps): ReactElement {
	return (
		<S.Container>
			{type === 'success' && <img src={checkCircleIcon} alt="Check icon" />}
			{type === 'danger' && <img src={xCircleIcon} alt="X icon" />}

			<strong>{text}</strong>
		</S.Container>
	);
}
