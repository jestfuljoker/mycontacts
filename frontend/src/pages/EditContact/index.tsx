import type { ContactFormRef } from '@components/ContactForm';
import ContactForm from '@components/ContactForm';
import Loader from '@components/Loader';
import PageHeader from '@components/PageHeader';
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

	useEffect(() => {
		async function loadContact() {
			try {
				const contact = await ContactsService.getContactById(id);

				contactFormRef.current?.setFieldsValues({
					...contact,
					categoryId: contact.category_id,
				});

				setIsLoading(false);
				setContactName(contact.name);
			} catch {
				toast({
					text: 'Contato não encontrado!',
					type: 'danger',
				});
				history.push('/');
			}
		}

		loadContact();
	}, [history, id]);

	async function handleSubmit(data: ContactFormData) {
		try {
			const contact = {
				name: data.name,
				email: data.email,
				phone: data.phone,
				category_id: data.categoryId,
			};

			// await ContactsService.createContact(contact);

			// toast({
			// 	text: `Contato "${data.name}" atualizado com sucesso!`,
			// 	type: 'success',
			// });
		} catch {
			// toast({
			// 	text: `Ocorreu um error ao atualizar o contato ${data.name}!`,
			// 	type: 'danger',
			// });
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
