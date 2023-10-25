import delay from '@utils/delay';

class HttpClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	async get(path: string) {
		const response = await fetch(`${this.baseURL}${path}`);

		await delay(500);

		return response.json();
	}
}

export default HttpClient;
