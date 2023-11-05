/* eslint-disable no-nested-ternary */
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import emptyBox from '@assets/images/empty-box.svg';
import arrow from '@assets/images/icons/arrow.svg';
import edit from '@assets/images/icons/edit.svg';
import trash from '@assets/images/icons/trash.svg';
import magnifierQuestion from '@assets/images/magnifier-question.svg';
import sad from '@assets/images/sad.svg';

import Button from '@components/Button';
import Loader from '@components/Loader';
import Modal from '@components/Modal';
import type { OrderBy } from '@services/ContactsService';
import ContactsService from '@services/ContactsService';
import type { DomainContactData } from '@services/mappers/ContactMapper';
import { toast } from '@utils/toast';
import * as S from './styles';

export default function Home() {
	const [contacts, setContacts] = useState<DomainContactData[]>([]);
	const [orderBy, setOrderBy] = useState<OrderBy>('asc');
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [isContactBeingDeleted, setIsContactBeingDeleted] = useState(false);
	const [contactBeingDeleted, setContactBeingDeleted] =
		useState<DomainContactData | null>(null);

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

			const contactsList = await ContactsService.listContacts(orderBy);

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

	function handleDeleteContact(contact: DomainContactData) {
		setContactBeingDeleted(contact);
	}

	function handleCloseDeleteModal() {
		setContactBeingDeleted(null);
	}

	async function handleConfirmDeleteContact() {
		try {
			setIsContactBeingDeleted(true);

			await ContactsService.deleteContact(contactBeingDeleted?.id as string);

			setContacts((prev) =>
				prev.filter((contact) => contact.id !== contactBeingDeleted?.id),
			);

			handleCloseDeleteModal();

			toast({
				text: `Contato "${contactBeingDeleted?.name}" deletado com sucesso!`,
				type: 'success',
			});
		} catch {
			toast({
				text: `Ocorreu um error ao deletar o contato "${contactBeingDeleted?.name}"!`,
				type: 'success',
			});
		} finally {
			setIsContactBeingDeleted(false);
		}
	}

	return (
		<S.Container>
			<Modal
				danger
				open={!!contactBeingDeleted}
				isLoading={isContactBeingDeleted}
				title={`Tem certeza que deseja deletar o contato ”${contactBeingDeleted?.name}”?`}
				confirmLabel="Deletar"
				onCancel={handleCloseDeleteModal}
				onConfirm={handleConfirmDeleteContact}
			>
				<p>Esta ação não poderá ser desfeita!</p>
			</Modal>

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
									{contact.category.name && (
										<small>{contact.category.name}</small>
									)}
								</div>
								<span>{contact.email}</span>
								<span>{contact.phone}</span>
							</div>
							<div className="actions">
								<Link to={`edit/${contact.id}`}>
									<img src={edit} alt="Edit icon" />
								</Link>

								<button
									type="button"
									onClick={() => handleDeleteContact(contact)}
								>
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
