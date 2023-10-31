import ContactForm from '@components/ContactForm';
import PageHeader from '@components/PageHeader';
import ContactsService from '@services/ContactsService';
import type { ContactFormData } from 'types/global';

export default function NewContact() {
	async function handleSubmit(data: ContactFormData) {
		try {
			const contact = {
				name: data.name,
				email: data.email,
				phone: data.phone,
				category_id: data.categoryId,
			};

			await ContactsService.createContact(contact);
		} catch (error) {
			alert('Erro ao cadastrar o contato');
		}
	}

	return (
		<>
			<PageHeader title="Novo contato" />
			<ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
		</>
	);
}
