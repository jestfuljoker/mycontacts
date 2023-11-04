import type { ContactFormRef } from '@components/ContactForm';
import ContactForm from '@components/ContactForm';
import Loader from '@components/Loader';
import PageHeader from '@components/PageHeader';
import { useSafeAsyncAction } from '@hooks/useSafeAsyncAction';
import ContactsService from '@services/ContactsService';
import { toast } from '@utils/toast';
import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import type { ContactFormData } from 'types/global';

export default function EditContact() {
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
					contactFormRef.current?.setFieldsValues({
						...contact,
						categoryId: contact.category_id,
					});

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

	async function handleSubmit(data: ContactFormData) {
		try {
			const contact = {
				name: data.name,
				email: data.email,
				phone: data.phone,
				category_id: data.categoryId,
			};

			const updatedContact = await ContactsService.updateContact(id, contact);

			setContactName(updatedContact.name);

			toast({
				text: `Contato "${data.name}" atualizado com sucesso!`,
				type: 'success',
			});
		} catch {
			toast({
				text: `Ocorreu um error ao atualizar o contato "${data.name}"!`,
				type: 'danger',
			});
		}
	}

	return (
		<>
			<Loader isLoading={isLoading} />

			<PageHeader
				title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
			/>

			<ContactForm
				ref={contactFormRef}
				buttonLabel="Salvar alterações"
				onSubmit={handleSubmit}
			/>
		</>
	);
}
