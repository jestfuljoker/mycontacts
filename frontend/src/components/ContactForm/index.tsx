import type { ChangeEvent, FormEvent } from 'react';
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';

import useErrors from '@hooks/useErrors';
import formatPhone from '@utils/formatPhone';
import isEmailValid from '@utils/isEmailValid';

import Button from '@components/Button';
import FormGroup from '@components/FormGroup';
import Input from '@components/Input';
import Select from '@components/Select';

import CategoriesService from '@services/CategoriesService';
import type { Category, ContactFormData } from 'types/global';
import * as S from './styles';

interface ContactFormProps {
	buttonLabel: string;
	onSubmit: (data: ContactFormData) => Promise<void>;
}

export interface ContactFormRef {
	setFieldsValues: (data: ContactFormData) => void;
	resetFields: () => void;
}

const ContactForm = forwardRef<ContactFormRef, ContactFormProps>(
	({ buttonLabel, onSubmit }, ref) => {
		const [name, setName] = useState('');
		const [email, setEmail] = useState('');
		const [phone, setPhone] = useState('');
		const [categoryId, setCategoryId] = useState('');
		const [categoriesList, setCategoriesList] = useState<Category[]>([]);
		const [isLoadingCategories, setIsLoadingCategories] = useState(true);
		const [isSubmitting, setIsSubmitting] = useState(false);

		useImperativeHandle(
			ref,
			() => ({
				setFieldsValues: (data: ContactFormData) => {
					setName(data.name ?? '');
					setEmail(data.email ?? '');
					setPhone(formatPhone(data.phone) ?? '');
					setCategoryId(data.categoryId ?? '');
				},
				resetFields: () => {
					setName('');
					setEmail('');
					setPhone('');
					setCategoryId('');
				},
			}),
			[],
		);

		const { errors, setError, removeError, getErrorMessageByFieldName } =
			useErrors();

		const isFormValid = name && errors.length === 0;

		const loadCategories = useCallback(async () => {
			try {
				const categories = await CategoriesService.listCategories<Category[]>();

				setCategoriesList(categories);
			} catch {
			} finally {
				setIsLoadingCategories(false);
			}
		}, []);

		useEffect(() => {
			loadCategories();
		}, [loadCategories]);

		function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
			setEmail(event.target.value);

			if (event.target.value && !isEmailValid(event.target.value)) {
				setError({ field: 'email', message: 'E-mail inválido' });
			} else {
				removeError('email');
			}
		}

		function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
			setName(event.target.value);

			if (!event.target.value) {
				setError({ field: 'name', message: 'Nome é obrigatório' });
			} else {
				removeError('name');
			}
		}

		function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
			setPhone(formatPhone(event.target.value));
		}

		async function handleSubmit(event: FormEvent<HTMLFormElement>) {
			event.preventDefault();

			setIsSubmitting(true);

			await onSubmit({
				name,
				email,
				phone,
				categoryId,
			});

			setIsSubmitting(false);
		}

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
