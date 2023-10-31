import type { Contact } from 'types/global';
import HttpClient from './utils/HttpClient';

export type OrderBy = 'asc' | 'desc';

export interface ContactRequest {
	name: string;
	email: string;
	phone: string;
	category_id: string;
}

class ContactsService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3001');
	}

	async listContacts<TReturn = unknown>(
		orderBy: OrderBy = 'asc',
	): Promise<TReturn> {
		return this.httpClient.get<TReturn>(`/contacts?orderBy=${orderBy}`);
	}

	async createContact(contact: ContactRequest): Promise<Contact> {
		return this.httpClient.post<Contact>(`/contacts`, {
			body: JSON.stringify(contact),
		});
	}
}

export default new ContactsService();
