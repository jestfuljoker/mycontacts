import { forwardRef } from 'react';

import Button from '@components/Button';
import FormGroup from '@components/FormGroup';
import Input from '@components/Input';
import Select from '@components/Select';

import type { DomainContactData } from '@services/mappers/ContactMapper';
import * as S from './styles';
import type { ContactFormRef } from './useContactForm';
import useContactForm from './useContactForm';

interface ContactFormProps {
	buttonLabel: string;
	onSubmit: (data: DomainContactData) => Promise<void>;
}

const ContactForm = forwardRef<ContactFormRef, ContactFormProps>(
	({ buttonLabel, onSubmit }, ref) => {
		const {
			name,
			email,
			phone,
			categoryId,
			isFormValid,
			isSubmitting,
			categoriesList,
			isLoadingCategories,
			handleSubmit,
			setCategoryId,
			handleNameChange,
			handleEmailChange,
			handlePhoneChange,
			getErrorMessageByFieldName,
		} = useContactForm({
			onSubmit,
			ref,
		});

		return (
			<S.Form onSubmit={handleSubmit} noValidate>
				<FormGroup error={getErrorMessageByFieldName('name')}>
					<Input
						disabled={isSubmitting}
						onChange={handleNameChange}
						value={name}
						placeholder="Nome *"
						error={getErrorMessageByFieldName('name')}
					/>
				</FormGroup>

				<FormGroup error={getErrorMessageByFieldName('email')}>
					<Input
						disabled={isSubmitting}
						type="email"
						onChange={handleEmailChange}
						value={email}
						placeholder="Email"
						error={getErrorMessageByFieldName('email')}
					/>
				</FormGroup>

				<FormGroup>
					<Input
						disabled={isSubmitting}
						maxLength={15}
						onChange={handlePhoneChange}
						value={phone}
						placeholder="Telefone"
					/>
				</FormGroup>

				<FormGroup isLoading={isLoadingCategories}>
					<Select
						onChange={(event) => setCategoryId(event.target.value)}
						value={categoryId}
						placeholder="Categoria"
						disabled={isLoadingCategories || isSubmitting}
					>
						<option value="">Sem categoria</option>

						{categoriesList.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</Select>
				</FormGroup>

				<S.ButtonContainer>
					<Button
						disabled={!isFormValid || isSubmitting}
						type="submit"
						isLoading={isSubmitting}
					>
						{buttonLabel}
					</Button>
				</S.ButtonContainer>
			</S.Form>
		);
	},
);

export default ContactForm;
