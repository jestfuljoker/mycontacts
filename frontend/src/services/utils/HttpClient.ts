import delay from '@utils/delay';
import { ApiError } from '@errors/ApiError';

export default class HttpClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	get<TReturn>(path: string, options: RequestInit = {}): Promise<TReturn> {
		return this.makeRequest(path, { ...options, method: 'GET' });
	}

	post<TReturn>(path: string, options: RequestInit = {}): Promise<TReturn> {
		return this.makeRequest(path, {
			...options,
			method: 'POST',
		});
	}

	private async makeRequest<TReturn>(
		path: string,
		options: RequestInit = {},
	): Promise<TReturn> {
		await delay(500);

		const headers = new Headers();

		if (options.body) {
			headers.append('Content-Type', 'application/json');
		}

		if (options.headers) {
			Object.entries(options.headers).forEach(([key, value]) => {
				headers.append(key, value);
			});
		}

		const response = await fetch(`${this.baseURL}${path}`, {
			...options,
			headers,
		});

		const contentType = response.headers.get('content-type');

		let responseBody = null;

		if (contentType?.includes('application/json')) {
			responseBody = await response.json();
		}

		if (response.ok) {
			return responseBody as TReturn;
		}

		throw new ApiError(response, responseBody);
	}
}
