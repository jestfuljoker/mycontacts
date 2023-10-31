import type { ReactElement } from 'react';
import ToastMessage from '../ToastMessage';
import * as S from './styles';

export default function ToastContainer(): ReactElement {
	return (
		<S.Container>
			<ToastMessage text="Default toast" />
			<ToastMessage text="Error toast" type="danger" />
			<ToastMessage text="Success toast" type="success" />
		</S.Container>
	);
}
