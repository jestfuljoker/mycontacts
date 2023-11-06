import type { OrderBy } from '@services/ContactsService';
import ContactsService from '@services/ContactsService';
import type { DomainContactData } from '@services/mappers/ContactMapper';
import { toast } from '@utils/toast';
import type { ChangeEvent } from 'react';
import { useState, useMemo, useCallback, useEffect } from 'react';

export default function useHome() {
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

	return {
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
	};
}
