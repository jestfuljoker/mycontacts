import { type ReactElement } from 'react';
import ToastMessage from '../ToastMessage';
import * as S from './styles';
import useToastContainer from './useToastContainer';

export default function ToastContainer(): ReactElement {
	const { renderList, handleRemoveItem, handleAnimationEnd } =
		useToastContainer();

	return (
		<S.Container>
			{renderList((message, { isLeaving }) => (
				<ToastMessage
					key={message.id}
					message={message}
					onRemoveMessage={handleRemoveItem}
					onAnimationEnd={handleAnimationEnd}
					isLeaving={isLeaving}
				/>
			))}
		</S.Container>
	);
}
