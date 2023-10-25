import type { ChangeEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import arrow from '@assets/images/icons/arrow.svg';
import edit from '@assets/images/icons/edit.svg';
import trash from '@assets/images/icons/trash.svg';

import Loader from '@components/Loader';
import type { OrderBy } from '@services/ContactsService';
import ContactsService from '@services/ContactsService';
import * as S from './styles';

interface Contact {
	id: string;
	name: string;
	email: string;
	phone: string;
	category_name: string;
}

export default function Home() {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [orderBy, setOrderBy] = useState<OrderBy>('asc');
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);

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

				const contactsList = await ContactsService.listContacts(orderBy);

				setContacts(contactsList);
			} catch (error) {
				console.log(error);
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

			<S.Header>
				<strong>
					{filteredContacts.length}
					{filteredContacts.length === 1 ? ' contato' : ' contatos'}
				</strong>
				<Link to="/new">Novo contato</Link>
			</S.Header>

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
