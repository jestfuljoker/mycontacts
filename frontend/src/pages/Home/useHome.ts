import type { OrderBy } from '@services/ContactsService';
import ContactsService from '@services/ContactsService';
import type { DomainContactData } from '@services/mappers/ContactMapper';
import { toast } from '@utils/toast';
import type { ChangeEvent } from 'react';
import {
	useCallback,
	useDeferredValue,
	useEffect,
	useMemo,
	useState,
} from 'react';

export default function useHome() {
	const [contacts, setContacts] = useState<DomainContactData[]>([]);
	const [orderBy, setOrderBy] = useState<OrderBy>('asc');
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [isContactBeingDeleted, setIsContactBeingDeleted] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [contactBeingDeleted, setContactBeingDeleted] =
		useState<DomainContactData | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const deferredSearchTerm = useDeferredValue(searchTerm);

	const filteredContacts = useMemo(
		() =>
			contacts.filter((contact) =>
				contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
			),
		[contacts, deferredSearchTerm],
	);

	const loadContacts = useCallback(async () => {
		try {
			setIsLoading(true);

			const contactsList = await ContactsService.listContacts(orderBy);

			setHasError(false);
			setContacts(contactsList);
		} catch {
			setHasError(true);
			setContacts([]);
		} finally {
			setIsLoading(false);
		}
	}, [orderBy]);

	useEffect(() => {
		loadContacts();
	}, [loadContacts]);

	const handleToggleOrderBy = useCallback(() => {
		setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
	}, []);

	const handleDeleteContact = useCallback((contact: DomainContactData) => {
		setContactBeingDeleted(contact);
		setIsDeleteModalOpen(true);
	}, []);

	function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
	}

	function handleTryAgain() {
		loadContacts();
	}

	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(false);
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
		orderBy,
		contacts,
		hasError,
		isLoading,
		searchTerm,
		filteredContacts,
		isDeleteModalOpen,
		contactBeingDeleted,
		isContactBeingDeleted,
		handleToggleOrderBy,
		handleChangeSearchTerm,
		handleTryAgain,
		handleDeleteContact,
		handleCloseDeleteModal,
		handleConfirmDeleteContact,
	};
}
