export interface Contact {
	id?: string;
	name: string;
	email: string;
	phone: string;
	category_name: string;
}

export interface Category {
	name: string;
	id: string;
}

export interface ContactFormData {
	name: string;
	email: string;
	phone: string;
	categoryId: string;
}
