/* eslint-disable no-nested-ternary */
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
import * as S from './styles';
import useHome from './useHome';

export default function Home() {
	const {
		contacts,
		orderBy,
		searchTerm,
		isLoading,
		hasError,
		isContactBeingDeleted,
		contactBeingDeleted,
		filteredContacts,
		handleToggleOrderBy,
		handleChangeSearchTerm,
		handleTryAgain,
		handleDeleteContact,
		handleCloseDeleteModal,
		handleConfirmDeleteContact,
	} = useHome();

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
