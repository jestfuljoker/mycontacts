import ContactForm from '@components/ContactForm';
import PageHeader from '@components/PageHeader';
import ContactsService from '@services/ContactsService';
import { toast } from '@utils/toast';
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
			<ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
		</>
	);
}
