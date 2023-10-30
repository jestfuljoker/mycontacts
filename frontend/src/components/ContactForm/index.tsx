import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

import useErrors from '@hooks/useErrors';
import formatPhone from '@utils/formatPhone';
import isEmailValid from '@utils/isEmailValid';

import Button from '@components/Button';
import FormGroup from '@components/FormGroup';
import Input from '@components/Input';
import Select from '@components/Select';

import ContactsService from '@services/ContactsService';
import CategoriesService from '@services/CategoriesService';
import * as S from './styles';

interface Category {
	name: string;
	id: string;
}

interface ContactFormProps {
	buttonLabel: string;
}

export default function ContactForm({ buttonLabel }: ContactFormProps) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [categoriesList, setCategoriesList] = useState<Category[]>([]);

	const { errors, setError, removeError, getErrorMessageByFieldName } =
		useErrors();

	const isFormValid = name && errors.length === 0;

	const loadCategories = useCallback(async () => {
		try {
			const categories = await CategoriesService.listCategories<Category[]>();
			setCategoriesList(categories);
		} catch (error) {
			console.log(error);
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
		const a = await ContactsService.createContact({
			name,
			email,
			phone,
			category_name: categoryId,
		});

		console.log(a);
	}

	return (
		<S.Form onSubmit={handleSubmit} noValidate>
			<FormGroup error={getErrorMessageByFieldName('name')}>
				<Input
					onChange={handleNameChange}
					value={name}
					placeholder="Nome *"
					error={getErrorMessageByFieldName('name')}
				/>
			</FormGroup>

			<FormGroup error={getErrorMessageByFieldName('email')}>
				<Input
					type="email"
					onChange={handleEmailChange}
					value={email}
					placeholder="Email"
					error={getErrorMessageByFieldName('email')}
				/>
			</FormGroup>

			<FormGroup>
				<Input
					maxLength={15}
					onChange={handlePhoneChange}
					value={phone}
					placeholder="Telefone"
				/>
			</FormGroup>

			<FormGroup>
				<Select
					onChange={(event) => setCategoryId(event.target.value)}
					value={categoryId}
					placeholder="Categoria"
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
				<Button disabled={!isFormValid} type="submit">
					{buttonLabel}
				</Button>
			</S.ButtonContainer>
		</S.Form>
	);
}
