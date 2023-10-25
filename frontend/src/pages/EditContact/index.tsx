import ContactForm from '@components/ContactForm';
import PageHeader from '@components/PageHeader';

// import { Container } from './styles';

export default function EditContact() {
	return (
		<>
			<PageHeader title="Editar Christofer Assis" />
			<ContactForm buttonLabel="Salvar alterações" />
		</>
	);
}
