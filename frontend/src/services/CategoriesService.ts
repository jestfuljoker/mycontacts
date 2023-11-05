import HttpClient from './utils/HttpClient';

export interface Category {
	name: string;
	id: string;
}

class CategoriesService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3001');
	}

	async listCategories(): Promise<Category[]> {
		return this.httpClient.get<Category[]>('/categories');
	}
}

export default new CategoriesService();
