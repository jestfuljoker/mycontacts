import HttpClient from './utils/HttpClient';

export type OrderBy = 'asc' | 'desc';

class ContactsService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3001');
	}

	async listContacts(orderBy: OrderBy = 'asc') {
		return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
	}

	// async createContact(contact: {}) {
	//   return this.httpClient.post(`/contacts`, contact);
	// }
}

export default new ContactsService();
