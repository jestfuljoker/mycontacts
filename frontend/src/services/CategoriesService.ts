import HttpClient from './utils/HttpClient';

class CategoriesService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3001');
	}

	async listCategories<TReturn = unknown>(): Promise<TReturn> {
		return this.httpClient.get<TReturn>('/categories');
	}
}

export default new CategoriesService();
