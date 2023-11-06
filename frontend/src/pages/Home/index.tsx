import Loader from '@components/Loader';
import Modal from '@components/Modal';

import ContactsList from './components/ContactsList';
import EmptyList from './components/EmptyList';
import ErrorStatus from './components/ErrorStatus';
import Header from './components/Header';
import InputSearch from './components/InputSearch';
import SearchNotFound from './components/SearchNotFound';
import * as S from './styles';
import useHome from './useHome';

export default function Home() {
	const {
		orderBy,
		hasError,
		contacts,
		isLoading,
		searchTerm,
		filteredContacts,
		contactBeingDeleted,
		isContactBeingDeleted,
		handleToggleOrderBy,
		handleChangeSearchTerm,
		handleTryAgain,
		handleDeleteContact,
		handleCloseDeleteModal,
		handleConfirmDeleteContact,
	} = useHome();

	const hasContacts = contacts.length > 0;

	const isListEmpty = !hasError && !isLoading && !hasContacts;

	const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1;

	return (
		<S.Container>
			<Loader isLoading={isLoading} />

			{hasContacts && (
				<InputSearch onChange={handleChangeSearchTerm} value={searchTerm} />
			)}

			<Header
				hasError={hasError}
				qtyOfContacts={contacts.length}
				qtyOfFilteredContacts={filteredContacts.length}
			/>

			{hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

			{isListEmpty && <EmptyList />}

			{isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

			{hasContacts && (
				<>
					<ContactsList
						orderBy={orderBy}
						filteredContacts={filteredContacts}
						onDeleteContact={handleDeleteContact}
						onToggleOrderBy={handleToggleOrderBy}
					/>

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
				</>
			)}
		</S.Container>
	);
}
