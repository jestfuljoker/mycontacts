import type { ChangeEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import arrow from '@assets/images/icons/arrow.svg';
import edit from '@assets/images/icons/edit.svg';
import trash from '@assets/images/icons/trash.svg';
import sad from '@assets/images/sad.svg';

import Loader from '@components/Loader';
import type { OrderBy } from '@services/ContactsService';
import ContactsService from '@services/ContactsService';
import type { Contact } from 'types/contact';
import Button from '@components/Button';
import * as S from './styles';

export default function Home() {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [orderBy, setOrderBy] = useState<OrderBy>('asc');
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const filteredContacts = useMemo(
		() =>
			contacts.filter((contact) =>
				contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
			),
		[contacts, searchTerm],
	);

	useEffect(() => {
		async function loadContacts() {
			try {
				setIsLoading(true);
				setHasError(false);

				const contactsList =
					await ContactsService.listContacts<Contact[]>(orderBy);

				setContacts(contactsList);
			} catch {
				setHasError(true);
			} finally {
				setIsLoading(false);
			}
		}

		loadContacts();
	}, [orderBy]);

	function handleToggleOrderBy() {
		setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
	}

	function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
	}

	return (
		<S.Container>
			<Loader isLoading={isLoading} />

			<S.InputSearchContainer>
				<input
					value={searchTerm}
					onChange={handleChangeSearchTerm}
					type="text"
					placeholder="Pesquisar pelo nome"
				/>
			</S.InputSearchContainer>

			<S.Header hasError={hasError}>
				{!hasError && (
					<strong>
						{filteredContacts.length}
						{filteredContacts.length === 1 ? ' contato' : ' contatos'}
					</strong>
				)}

				<Link to="/new">Novo contato</Link>
			</S.Header>

			{hasError && (
				<S.ErrorContainer>
					<img src={sad} alt="Sad" />

					<div className="details">
						<strong>Ocorreu um error ao obter os seus contatos!</strong>
						<Button type="button">Tentar novamente</Button>
					</div>
				</S.ErrorContainer>
			)}

			{filteredContacts.length > 0 && (
				<S.ListHeader orderBy={orderBy}>
					<button type="button" onClick={handleToggleOrderBy}>
						<span>Nome</span>
						<img src={arrow} alt="Table sort by name" />
					</button>
				</S.ListHeader>
			)}

			{filteredContacts.map((contact) => (
				<S.Card key={contact.id}>
					<div className="info">
						<div className="contact-name">
							<strong>{contact.name}</strong>
							{contact.category_name && <small>{contact.category_name}</small>}
						</div>
						<span>{contact.email}</span>
						<span>{contact.phone}</span>
					</div>
					<div className="actions">
						<Link to={`edit/${contact.id}`}>
							<img src={edit} alt="Edit icon" />
						</Link>

						<button type="button">
							<img src={trash} alt="Delete icon" />
						</button>
					</div>
				</S.Card>
			))}
		</S.Container>
	);
}
