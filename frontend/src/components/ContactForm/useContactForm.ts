import useErrors from '@hooks/useErrors';
import { useSafeAsyncState } from '@hooks/useSafeAsyncState';
import CategoriesService from '@services/CategoriesService';
import type { DomainCategoryData } from '@services/mappers/CategoryMapper';
import type { DomainContactData } from '@services/mappers/ContactMapper';
import formatPhone from '@utils/formatPhone';
import isEmailValid from '@utils/isEmailValid';
import type { ChangeEvent, FormEvent, ForwardedRef } from 'react';
import { useEffect, useImperativeHandle, useState } from 'react';

export interface ContactFormRef {
	setFieldsValues: (data: DomainContactData) => void;
	resetFields: () => void;
}

interface UseContactFormProps {
	onSubmit(contact: DomainContactData): Promise<void>;
	ref: ForwardedRef<ContactFormRef>;
}

export default function useContactForm({ onSubmit, ref }: UseContactFormProps) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [categoriesList, setCategoriesList] = useSafeAsyncState<
		DomainCategoryData[]
	>([]);
	const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useImperativeHandle(
		ref,
		() => ({
			setFieldsValues: (contact: DomainContactData) => {
				setName(contact.name ?? '');
				setEmail(contact.email ?? '');
				setPhone(formatPhone(contact.phone) ?? '');
				setCategoryId(contact.category.id ?? '');
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

	useEffect(() => {
		const controller = new AbortController();

		async function loadCategories() {
			try {
				const categories = await CategoriesService.listCategories({
					signal: controller.signal,
				});

				setCategoriesList(categories);
			} catch {
			} finally {
				setIsLoadingCategories(false);
			}
		}

		loadCategories();

		return () => controller.abort();
	}, [setCategoriesList, setIsLoadingCategories]);

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
			category: {
				id: categoryId,
			},
		});

		setIsSubmitting(false);
	}

	return {
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
	};
}
