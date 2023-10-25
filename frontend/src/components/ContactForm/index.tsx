import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

import useErrors from '@hooks/useErrors';
import formatPhone from '@utils/formatPhone';
import isEmailValid from '@utils/isEmailValid';

import Button from '@components/Button';
import FormGroup from '@components/FormGroup';
import Input from '@components/Input';
import Select from '@components/Select';

import ContactsService from '@services/ContactsService';
import * as S from './styles';

interface ContactFormProps {
	buttonLabel: string;
}

export default function ContactForm({ buttonLabel }: ContactFormProps) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [category, setCategory] = useState('');

	const { errors, setError, removeError, getErrorMessageByFieldName } =
		useErrors();

	const isFormValid = name && errors.length === 0;

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
			category_name: category,
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
					onChange={(event) => setCategory(event.target.value)}
					value={category}
					placeholder="Categoria"
				>
					<option value="">Categoria</option>
					<option value="instagram">Instagram</option>
					<option value="discord">Discord</option>
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
