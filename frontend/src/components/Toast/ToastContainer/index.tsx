import { type ReactElement } from 'react';
import ToastMessage from '../ToastMessage';
import * as S from './styles';
import useToastContainer from './useToastContainer';

export default function ToastContainer(): ReactElement {
	const { renderList, handleRemoveItem } = useToastContainer();

	return (
		<S.Container>
			{renderList((message, { isLeaving, animatedRef }) => (
				<ToastMessage
					key={message.id}
					message={message}
					onRemoveMessage={handleRemoveItem}
					animatedRef={animatedRef}
					isLeaving={isLeaving}
				/>
			))}
		</S.Container>
	);
}
