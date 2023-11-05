import type { ContactFormRef } from '@components/ContactForm';
import ContactForm from '@components/ContactForm';
import PageHeader from '@components/PageHeader';
import ContactsService from '@services/ContactsService';
import type { DomainContactData } from '@services/mappers/ContactMapper';
import { toast } from '@utils/toast';
import { useRef } from 'react';

export default function NewContact() {
	const contactFormRef = useRef<ContactFormRef | null>(null);

	async function handleSubmit(contact: DomainContactData) {
		try {
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
