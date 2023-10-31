/* eslint-disable no-nested-ternary */
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import arrow from '@assets/images/icons/arrow.svg';
import edit from '@assets/images/icons/edit.svg';
import trash from '@assets/images/icons/trash.svg';
import sad from '@assets/images/sad.svg';
import emptyBox from '@assets/images/empty-box.svg';
import magnifierQuestion from '@assets/images/magnifier-question.svg';

import Loader from '@components/Loader';
import type { OrderBy } from '@services/ContactsService';
import ContactsService from '@services/ContactsService';
import type { Contact } from 'types/global';
import Button from '@components/Button/styles';
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

	const loadContacts = useCallback(async () => {
		try {
			setIsLoading(true);

			const contactsList =
				await ContactsService.listContacts<Contact[]>(orderBy);

			setHasError(false);
			setContacts(contactsList);
		} catch {
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	}, [orderBy]);

	useEffect(() => {
		loadContacts();
	}, [loadContacts]);

	function handleToggleOrderBy() {
		setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
	}

	function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
	}

	function handleTryAgain() {
		loadContacts();
	}

	return (
		<S.Container>
			<Loader isLoading={isLoading} />

			{contacts.length !== 0 && (
				<S.InputSearchContainer>
					<input
						value={searchTerm}
						onChange={handleChangeSearchTerm}
						type="text"
						placeholder="Pesquisar pelo nome"
					/>
				</S.InputSearchContainer>
			)}

			<S.Header
				justifyContent={
					hasError
						? 'flex-end'
						: contacts.length > 0
						? 'space-between'
						: 'center'
				}
			>
				{!hasError && contacts.length > 0 && (
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
						<Button type="button" onClick={handleTryAgain}>
							Tentar novamente
						</Button>
					</div>
				</S.ErrorContainer>
			)}

			{!hasError && (
				<>
					{!isLoading && contacts.length < 1 && (
						<S.EmptyListContainer>
							<img src={emptyBox} alt="Empty box" />

							<p>
								Você ainda não tem nenhum contato cadastrado! Clique no botão
								<strong>”Novo contato”</strong> acima para cadastrar o seu
								primeiro!
							</p>
						</S.EmptyListContainer>
					)}

					{!isLoading && contacts.length > 0 && filteredContacts.length < 1 && (
						<S.MagnifierContainer>
							<img src={magnifierQuestion} alt="Magnifier question" />

							<span>
								Nenhum resultado foi entrado para{' '}
								<strong>”{searchTerm}”</strong>.
							</span>
						</S.MagnifierContainer>
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
									{contact.category_name && (
										<small>{contact.category_name}</small>
									)}
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
				</>
			)}
		</S.Container>
	);
}
