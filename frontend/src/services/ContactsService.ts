import HttpClient from './utils/HttpClient';
import type {
	DomainContactData,
	PersistenceContactData,
} from './mappers/ContactMapper';
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

	async listContacts(
		orderBy: OrderBy = 'asc',
		options?: RequestInit,
	): Promise<DomainContactData[]> {
		const contacts = await this.httpClient.get<PersistenceContactData[]>(
			`/contacts?orderBy=${orderBy}`,
			options,
		);

		return contacts.map(ContactMapper.toDomain);
	}

	async getContactById(
		id: string,
		options?: RequestInit,
	): Promise<DomainContactData> {
		const contact = await this.httpClient.get<PersistenceContactData>(
			`/contacts/${id}`,
			options,
		);

		return ContactMapper.toDomain(contact);
	}

	async createContact(contact: DomainContactData): Promise<DomainContactData> {
		const body = ContactMapper.toPersistence(contact);

		const createdContact = await this.httpClient.post<PersistenceContactData>(
			`/contacts`,
			{
				body: JSON.stringify(body),
			},
		);

		return ContactMapper.toDomain(createdContact);
	}

	async updateContact(
		id: string,
		contact: DomainContactData,
	): Promise<DomainContactData> {
		const body = ContactMapper.toPersistence(contact);

		const updatedContact = await this.httpClient.put<PersistenceContactData>(
			`/contacts/${id}`,
			{
				body: JSON.stringify(body),
			},
		);

		return ContactMapper.toDomain(updatedContact);
	}

	deleteContact(id: string): Promise<void> {
		return this.httpClient.delete<void>(`/contacts/${id}`);
	}
}

export default new ContactsService();
