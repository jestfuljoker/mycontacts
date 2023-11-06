import type { ContactFormRef } from '@components/ContactForm/useContactForm';
import { useSafeAsyncAction } from '@hooks/useSafeAsyncAction';
import ContactsService from '@services/ContactsService';
import type { DomainContactData } from '@services/mappers/ContactMapper';
import { toast } from '@utils/toast';
import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export default function useEditContact() {
	const [isLoading, setIsLoading] = useState(true);
	const [contactName, setContactName] = useState('');

	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const contactFormRef = useRef<ContactFormRef | null>(null);

	const safeAsyncAction = useSafeAsyncAction();

	useEffect(() => {
		async function loadContact() {
			try {
				const contact = await ContactsService.getContactById(id);

				safeAsyncAction(() => {
					contactFormRef.current?.setFieldsValues(contact);

					setIsLoading(false);
					setContactName(contact.name);
				});
			} catch {
				safeAsyncAction(() => {
					toast({
						text: 'Contato não encontrado!',
						type: 'danger',
					});
					history.push('/');
				});
			}
		}

		loadContact();
	}, [history, id, safeAsyncAction]);

	async function handleSubmit(contact: DomainContactData) {
		try {
			const updatedContact = await ContactsService.updateContact(id, contact);

			setContactName(updatedContact.name);

			toast({
				text: `Contato "${contact.name}" atualizado com sucesso!`,
				type: 'success',
			});
		} catch {
			toast({
				text: `Ocorreu um error ao atualizar o contato "${contact.name}"!`,
				type: 'danger',
			});
		}
	}

	return {
		isLoading,
		contactName,
		contactFormRef,
		handleSubmit,
	};
}
