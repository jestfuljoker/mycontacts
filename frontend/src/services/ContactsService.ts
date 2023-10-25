import type { Contact } from 'types/contact';
import HttpClient from './utils/HttpClient';

export type OrderBy = 'asc' | 'desc';

class ContactsService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3001');
	}

	async listContacts<TReturn = unknown>(
		orderBy: OrderBy = 'asc',
	): Promise<TReturn> {
		return this.httpClient.get<TReturn>(`/contactss?orderBy=${orderBy}`);
	}

	async createContact(contact: Omit<Contact, 'id'>) {
		return this.httpClient.post(`/contacts`, contact);
	}
}

export default new ContactsService();
