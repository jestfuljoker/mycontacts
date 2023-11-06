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

	return (
		<S.Container>
			<Loader isLoading={isLoading} />

			{contacts.length !== 0 && (
				<InputSearch onChange={handleChangeSearchTerm} value={searchTerm} />
			)}

			<Header
				hasError={hasError}
				qtyOfContacts={contacts.length}
				qtyOfFilteredContacts={filteredContacts.length}
			/>

			{hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

			{!hasError && (
				<>
					{!isLoading && contacts.length < 1 && <EmptyList />}

					{!isLoading && contacts.length > 0 && filteredContacts.length < 1 && (
						<SearchNotFound searchTerm={searchTerm} />
					)}

					<ContactsList
						orderBy={orderBy}
						filteredContacts={filteredContacts}
						onDeleteContact={handleDeleteContact}
						onToggleOrderBy={handleToggleOrderBy}
					/>
				</>
			)}

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
		</S.Container>
	);
}
