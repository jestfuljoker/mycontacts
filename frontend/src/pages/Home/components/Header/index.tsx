/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import * as S from './styles';

interface HeaderProps {
	hasError: boolean;
	qtyOfContacts: number;
	qtyOfFilteredContacts: number;
}

export default function Header({
	hasError,
	qtyOfContacts,
	qtyOfFilteredContacts,
}: HeaderProps) {
	const alignment = hasError
		? 'flex-end'
		: qtyOfContacts > 0
		? 'space-between'
		: 'center';

	return (
		<S.Container justifyContent={alignment}>
			{!hasError && qtyOfContacts > 0 && (
				<strong>
					{qtyOfFilteredContacts}
					{qtyOfFilteredContacts === 1 ? ' contato' : ' contatos'}
				</strong>
			)}

			<Link to="/new">Novo contato</Link>
		</S.Container>
	);
}
