import delay from '@utils/delay';
import { ApiError } from '@errors/ApiError';

export default class HttpClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	async get<TReturn>(path: string): Promise<TReturn> {
		await delay(500);

		const response = await fetch(`${this.baseURL}${path}`);

		const contentType = response.headers.get('content-type');

		let body = null;

		if (contentType?.includes('application/json')) {
			body = await response.json();
		}

		if (response.ok) {
			return body as TReturn;
		}

		throw new ApiError(response, body);
	}

	async post<TData, TResponse>(path: string, data: TData): Promise<TResponse> {
		const response = await fetch(`${this.baseURL}${path}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});

		await delay(500);

		return response.json();
	}
}
