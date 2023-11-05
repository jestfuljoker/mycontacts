import type { Contact } from 'types/global';
import HttpClient from './utils/HttpClient';
import type { DomainContactData } from './mappers/ContactMapper';
import ContactMapper from './mappers/ContactMapper';

export type OrderBy = 'asc' | 'desc';

export interface ContactRequest {
	id: string;
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

	listContacts(orderBy: OrderBy = 'asc'): Promise<Contact[]> {
		return this.httpClient.get<Contact[]>(`/contacts?orderBy=${orderBy}`);
	}

	getContactById(id: string): Promise<ContactRequest> {
		return this.httpClient.get<ContactRequest>(`/contacts/${id}`);
	}

	createContact(contact: DomainContactData): Promise<ContactRequest> {
		const body = ContactMapper.toPersistence(contact);

		return this.httpClient.post<ContactRequest>(`/contacts`, {
			body: JSON.stringify(body),
		});
	}

	updateContact(id: string, contact: DomainContactData): Promise<Contact> {
		const body = ContactMapper.toPersistence(contact);

		return this.httpClient.put<Contact>(`/contacts/${id}`, {
			body: JSON.stringify(body),
		});
	}

	deleteContact(id: string): Promise<void> {
		return this.httpClient.delete<void>(`/contacts/${id}`);
	}
}

export default new ContactsService();
