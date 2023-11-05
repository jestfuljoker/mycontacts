import type { ContactFormRef } from '@components/ContactForm';
import ContactForm from '@components/ContactForm';
import Loader from '@components/Loader';
import PageHeader from '@components/PageHeader';
import type { DomainContactData } from '@services/mappers/ContactMapper';
import type { RefObject } from 'react';

interface PresentationProps {
	contactName: string;
	isLoading: boolean;
	contactFormRef: RefObject<ContactFormRef>;
	onSubmit: (contact: DomainContactData) => Promise<void>;
}

export default function Presentation({
	contactFormRef,
	contactName,
	isLoading,
	onSubmit,
}: PresentationProps) {
	return (
		<>
			<Loader isLoading={isLoading} />

			<PageHeader
				title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
			/>

			<ContactForm
				ref={contactFormRef}
				buttonLabel="Salvar alterações"
				onSubmit={onSubmit}
			/>
		</>
	);
}
