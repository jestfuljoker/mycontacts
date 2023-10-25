import ContactForm from '@components/ContactForm';
import PageHeader from '@components/PageHeader';

// import { Container } from './styles';

function NewContact() {
	return (
		<>
			<PageHeader title="Novo contato" />
			<ContactForm buttonLabel="Cadastrar" />
		</>
	);
}

export default NewContact;
