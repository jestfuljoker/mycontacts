import type { ContactFormRef } from '@components/ContactForm';
import ContactForm from '@components/ContactForm';
import PageHeader from '@components/PageHeader';
import ContactsService from '@services/ContactsService';
import { toast } from '@utils/toast';
import { useRef } from 'react';
import type { ContactFormData } from 'types/global';

export default function NewContact() {
	const contactFormRef = useRef<ContactFormRef | null>(null);

	async function handleSubmit(data: ContactFormData) {
		try {
			const contact = {
				name: data.name,
				email: data.email,
				phone: data.phone,
				category_id: data.categoryId,
			};

			await ContactsService.createContact(contact);

			contactFormRef.current?.resetFields();

			toast({
				text: 'Contato cadastrado com sucesso!',
				type: 'success',
			});
		} catch (error) {
			toast({
				text: 'Ocorreu um error ao cadastrar o contato!',
				type: 'danger',
			});
		}
	}

	return (
		<>
			<PageHeader title="Novo contato" />

			<ContactForm
				ref={contactFormRef}
				buttonLabel="Cadastrar"
				onSubmit={handleSubmit}
			/>
		</>
	);
}
